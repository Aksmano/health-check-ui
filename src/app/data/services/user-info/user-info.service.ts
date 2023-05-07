import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mockResponse } from 'src/app/utils';
import { Observable } from 'rxjs';
import { PatientDataRQ } from '../../model/dto/rq/PatientDataRQ';
import { PatientRS } from '../../model/dto/rs/PatientRS';
import { DoctorServiceImpl } from '../doctor/doctor.service';
import { UserType } from '../../model/common/UserType';
import { AdministrationServiceImpl } from '../administration/administration.service';
import { PatientService } from '../patient/patient.service';
import { ReceptionistService } from '../receptionist/receptionist.service';
import { KeycloakService } from 'keycloak-angular';

export class UserInfo {

  public static role: UserType = UserType.Guest;
  public static id?: string | number;
  public static deptId?: number;

  constructor(
    private readonly doctorService: DoctorServiceImpl,
    private readonly adminService: AdministrationServiceImpl,
    private readonly patientService: PatientService,
    private readonly receptionistService: ReceptionistService,
    private readonly keycloak: KeycloakService
  ) {}

  public setUserInfo() {
    if (this.keycloak.isUserInRole(UserType.Admin)) {
      this.setUserData(UserType.Admin)
    } else if (this.keycloak.isUserInRole(UserType.Superadmin)) {
      this.setUserData(UserType.Superadmin)
    } else if (this.keycloak.isUserInRole(UserType.Doctor)) {
      this.setUserData(UserType.Doctor)
    } else if (this.keycloak.isUserInRole(UserType.Receptionist)) {
      this.setUserData(UserType.Receptionist)
    } else if (this.keycloak.isUserInRole(UserType.Patient)) {
      this.setUserData(UserType.Patient)
    }
  }

  private setUserData(userType: UserType) {
    this.keycloak.loadUserProfile()
    .then(profile => {
      
    })
  }
}
