import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UserInfo } from 'src/app/core/user-info';
import { UserType } from 'src/app/data/model/common/UserType';
import { RoleService } from '../../core/services/roles/role.service'
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { PatientService } from 'src/app/data/services/patient/patient.service';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent {
  private readonly patientRegisterUrl = '/app/update-user-data/patient/register-data'

  constructor(
    private readonly router: Router,
    private readonly roleService: RoleService,
    private readonly navigation: NavigationService,
    private readonly patientService: PatientService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart || event instanceof NavigationEnd) {
        if (event.url !== this.patientRegisterUrl && this.roleService.hasRolePatient() && !UserInfo.patientData) {
          this.navigation.toRegisterData('register-data');
        }
      }
    })
  }
}
