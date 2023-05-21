import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { NavigationService } from '../../services/navigation/navigation.service';
import { UserType } from 'src/app/data/model/common/UserType';
import { RoleService } from '../../services/roles/role.service';

@Injectable({
  providedIn: 'root'
})
export class ReceptionistGuard extends KeycloakAuthGuard {
  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService,
    private readonly navigationService: NavigationService,
    private readonly roleService: RoleService
  ) {
    super(router, keycloak);
  }

  async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {

    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    }

    if (!this.roleService.hasRoleReceptionist()) {
      this.navigationService.toMainPage();
    }

    return this.authenticated;
  }
}
