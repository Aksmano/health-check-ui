import { Component } from '@angular/core';
import { Params } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { UserInfo } from 'src/app/core/user-info';
import { UserType } from 'src/app/data/model/common/UserType';
import { DepartmentServiceImpl } from 'src/app/data/services/department/department.service';

@Component({
  selector: 'app-admin-panel-layout',
  templateUrl: './admin-panel-layout.component.html',
  styleUrls: ['./admin-panel-layout.component.scss']
})
export class AdminPanelLayoutComponent {
  public loadingDeptDetails = false;

  constructor(
    private readonly navigationService: NavigationService,
    private readonly departmentService: DepartmentServiceImpl
  ) { }

  navigateInSuperpanel(path: string[], params: Params) {
    this.navigationService.navigateInSuperadminPanel(path, params);
  }

  isSuperadmin() {
    return UserInfo.role === UserType.Superadmin;
  }
}
