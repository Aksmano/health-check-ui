import { Component } from '@angular/core';
import { Params } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { UserType } from 'src/app/data/model/common/UserType';

@Component({
  selector: 'app-admin-panel-layout',
  templateUrl: './admin-panel-layout.component.html',
  styleUrls: ['./admin-panel-layout.component.scss']
})
export class AdminPanelLayoutComponent {

  constructor(
    private readonly navigationService: NavigationService,
    private readonly keycloak: KeycloakService
  ) { }

  navigateInSuperpanel(path: string[], params: Params) {
    this.navigationService.navigateInSuperadminPanel(path, params);
  }

  isSuperadmin() {
    return this.keycloak.isUserInRole(UserType.Superadmin);
  }
}
