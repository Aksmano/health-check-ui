import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { Gender } from 'src/app/data/model/common/Gender';
import { AddressRS } from 'src/app/data/model/dto/rs/AddressRS';
import { PatientRS } from 'src/app/data/model/dto/rs/PatientRS';
import { Patient } from 'src/app/data/model/entities/Patient';
import { postPatientProfileInfoRequest } from 'src/app/redux/actions/user-info.actions';
import { AppState } from 'src/app/redux/index.reducers';
import { selectIsLoadingKeycloakProfile, selectIsLoadingUserProfile, selectKeycloakProfile, selectPatientProfile } from 'src/app/redux/selectors/user-info.selector';
import { mapEnum } from 'src/app/utils';

@Component({
  selector: 'app-register-patient-form',
  templateUrl: './register-patient-form.component.html',
  styleUrls: ['./register-patient-form.component.scss']
})
export class RegisterPatientFormComponent {
  // public keycloakProfile: KeycloakProfile = {};
  // public isLoadingKeycloakProfile: boolean = false;

  // public patientProfile: Patient = ({
  //   patientData: {
  //     address: {} as AddressRS
  //   } as PatientRS,
  // } as Patient);
  // public isLoadingUserProfile: boolean = false;

  // public readonly genders: string[] = mapEnum(Gender);
  // public readonly postalCodeRegex: RegExp = /^[0-9]{2}-[0-9]{3}/;

  // constructor(
  //   private readonly store: Store<AppState>,
  //   private readonly navigation: NavigationService,
  //   private readonly keycloak: KeycloakService
  // ) {
  //   this.store.select(selectIsLoadingUserProfile)
  //     .subscribe(isLoading => this.isLoadingUserProfile = isLoading);
  //   this.store.select(selectIsLoadingKeycloakProfile)
  //     .subscribe(isLoading => this.isLoadingKeycloakProfile = isLoading);

  //   this.store.select(selectKeycloakProfile)
  //     .subscribe(profile => {
  //       if (!profile && !this.isLoadingKeycloakProfile) {
  //         this.keycloak.login();
  //       } else if (!!profile) {
  //         this.keycloakProfile = profile
  //         this.patientProfile = {
  //           ...this.patientProfile,
  //           firstname: profile.firstName!,
  //           lastname: profile.lastName!
  //         }
  //       }
  //     });

  //   this.store.select(selectPatientProfile)
  //     .subscribe(profile => {
  //       if (!!profile && !this.isLoadingUserProfile) {
  //         this.navigation.toLocation(this.navigation.previousUrl.split('/').slice(1));
  //       }
  //     });
  // }

  // public getGenders() {
  //   return mapEnum(Gender);
  // }

  // // public submitData() {
  // //   this.store.dispatch(postPatientProfileInfoRequest({
  // //     patientDataDto: {
  // //       address: thi
  // //       // patient: this.patientProfile,
  // //       // keycloakId: this.keycloakProfile.id!
  // //     }
  // //   }));
  // // }

  // public set setPatientGender(gender: string) {
  //   if (gender.toLowerCase() == 'female')
  //     this.patientProfile.patientData.gender = Gender.FEMALE;
  //   else
  //     this.patientProfile.patientData.gender = Gender.MALE;
  // }
}
