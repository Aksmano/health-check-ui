import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { KeycloakProfile } from 'keycloak-js';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { UserInfo } from 'src/app/core/user-info';
import { Gender } from 'src/app/data/model/common/Gender';
import { UserType } from 'src/app/data/model/common/UserType';
import { Address } from 'src/app/data/model/dto/common/Address';
import { PatientDataRQ } from 'src/app/data/model/dto/rq/PatientDataRQ';
import { Patient } from 'src/app/data/model/entities/Patient';
import { PatientService } from 'src/app/data/services/patient/patient.service';
import { AppState } from 'src/app/redux/index.reducers';
// import { selectKeycloakProfile, selectPatientProfile } from 'src/app/redux/selectors/user-info-selectors/keycloak-info.selector';
import { getPathnamesList, mapEnum } from 'src/app/utils';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  public loadingIndicator = true;

  public patientData: PatientDataRQ = {
    addressRQ: {} as Address
  } as PatientDataRQ;
  public genders: string[] = [];
  public profile?: KeycloakProfile = UserInfo.profile;

  public userGender: Gender = Gender.FEMALE;

  public readonly postalCodeRegex: RegExp = /^[0-9]{2}-[0-9]{3}/;

  constructor(
    private readonly navigation: NavigationService,
    private readonly toastService: ToastService,
    private readonly patientService: PatientService,
    private readonly route: ActivatedRoute
  ) {
    this.genders = [Gender.MALE, Gender.FEMALE];
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.patientService.getPatientData()
          .subscribe({
            next: (res) => {
              if (params.get('mode') == 'register-data') {
                if (!!res) {
                  if (this.navigation.previousUrl.split('/').pop() === 'register-data')
                    this.navigation.toRegisterData('update-data')
                  else
                    this.navigation.toLocation(this.navigation.previousUrl.split('/').filter((v, i) => i !== 0))
                }
              } else if (params.get('mode') == 'update-data' && !!res) {
                console.log(res);
                const apartmentNumber = (!res.addressRS.apartmentNumber || res.addressRS.apartmentNumber !== '-1')
                  ? res.addressRS.apartmentNumber
                  : '';

                this.patientData = {
                  ...res,
                  addressRQ: {
                    ...res.addressRS,
                    apartmentNumber: apartmentNumber
                  },
                  pesel: '',
                };
                this.loadingIndicator = false;
              }
            },
            error: () => this.loadingIndicator = false
          });
      }
    })
  }

  set setPatientGender(genderName: Gender) {
    this.patientData.gender = genderName;
  }

  public getGenders() {
    return mapEnum(Gender);
  }

  submitData() {
    if (this.validateData()) {
      this.patientData.firstName = this.profile!.firstName!;
      this.patientData.lastName = this.profile!.lastName!;
      this.patientData.addressRQ.apartmentNumber = this.patientData.addressRQ.apartmentNumber ?? '-1';
      this.patientService.updatePatientData(this.patientData)
        .subscribe({
          next: res => {
            if (!!res) {
              UserInfo.patientData = res;
              this.navigation.toMainPage();
            } else {
              this.toastService.showError("Something went wrong while sending the data, try later");
            }
          },
          error: error => {
            this.toastService.showError("Something went wrong while sending the data, try later");
          }
        })
    } else {
      this.toastService.showWarn("Not all required data has been provided");
    }
  }

  private validateData() {
    console.log(this.patientData)
    if (!!this.patientData) {
      const { pesel, gender, phoneNumber, addressRQ: address } = this.patientData;
      return !!this.profile
        && !!pesel
        && !!gender
        && !!phoneNumber
        && !!address
        && !!address.city
        && !!address.country
        && !!address.county
        && !!address.houseNumber
        && !!address.post
        && !!address.postalCode
        && !!address.province
        && !!address.street
    }
    return false;
  }
}
