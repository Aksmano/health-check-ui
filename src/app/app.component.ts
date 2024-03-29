import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PrimeNGConfig } from 'primeng/api';
import { fetchCitiesRequest } from './redux/actions/medical-offer.actions';
import { AppState } from './redux/index.reducers';
import { loadKeycloakInfoRequest } from './redux/actions/user-info-actions/keylcloak-info.actions';
import { KeycloakService } from 'keycloak-angular';
import { UserInfo } from './core/user-info';
import { DoctorServiceImpl } from './data/services/doctor/doctor.service';
import { AdministrationServiceImpl } from './data/services/administration/administration.service';
import { PatientService } from './data/services/patient/patient.service';
import { ReceptionistService } from './data/services/receptionist/receptionist.service';
import { DepartmentServiceImpl } from './data/services/department/department.service';
import { NavigationStart, Router } from '@angular/router';
import { RoleService } from './core/services/roles/role.service';
import { NavigationService } from './core/services/navigation/navigation.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public userInfo?: UserInfo;
  public title: string = 'health-check-ui';

  constructor(
    private readonly primengConfig: PrimeNGConfig,
    private readonly store: Store<AppState>,
    private readonly doctorService: DoctorServiceImpl,
    private readonly adminService: AdministrationServiceImpl,
    private readonly patientService: PatientService,
    private readonly receptionistService: ReceptionistService,
    private readonly departmentService: DepartmentServiceImpl,
    private readonly keycloak: KeycloakService
  ) {
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.userInfo = new UserInfo(this.doctorService, this.adminService, this.patientService, this.receptionistService, this.departmentService, this.keycloak);


    // this.store.dispatch(fetchCitiesRequest());
    // this.store.dispatch(loadKeycloakInfoRequest());
  }
}
