import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { KeycloakProfile } from 'keycloak-js';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { Gender } from 'src/app/data/model/common/Gender';
import { Patient } from 'src/app/data/model/entities/Patient';
import { AppState } from 'src/app/redux/index.reducers';
import { selectKeycloakProfile, selectPatientProfile } from 'src/app/redux/selectors/user-info.selector';
import { getPathnamesList, mapEnum } from 'src/app/utils';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent {
  // public 
  public patientProfile: Patient = {} as Patient;
  public genders: string[] = [];

  public userGender: string = '';

  public readonly postalCodeRegex: RegExp = /^[0-9]{2}-[0-9]{3}/;

  constructor(
    private readonly store: Store<AppState>,
    private readonly navigation: NavigationService
  ) {

    this.store.select(selectPatientProfile)
      .subscribe(userProfile => {
        if(!userProfile) {          
          console.log(`/${getPathnamesList().join('/')}`);
          
          this.navigation.currentUrl = `/${getPathnamesList().join('/')}`;
          this.navigation.toPatientsPortal(['complete-user-data']);
        }
        this.patientProfile = userProfile!
      })

    this.genders = mapEnum(Gender);
  }

  public getGenders() {
    return mapEnum(Gender);
  }
}
