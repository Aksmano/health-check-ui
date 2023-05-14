import { Component } from '@angular/core';
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
export class PatientComponent {
  // public 
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
    private readonly patientService: PatientService
  ) {
    this.genders = [Gender.MALE, Gender.FEMALE];
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
      this.patientData.addressRQ.apartmentNumber = this.patientData.addressRQ.apartmentNumber ?? null;
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
