import {Injectable} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private keycloakService: KeycloakService) {
  }

  public hasRolePatient(): boolean {
    let userRoles = new Set(this.keycloakService.getUserRoles());
    console.log(userRoles)
    return userRoles.has('ROLE_PATIENT')
      && !userRoles.has('ROLE_RECEPTIONIST')
      && !userRoles.has('ROLE_DOCTOR')
      && !userRoles.has('ROLE_ADMIN')
      && !userRoles.has('ROLE_SUPERADMIN')
  }

  public hasRoleReceptionist(): boolean {
    let userRoles = new Set(this.keycloakService.getUserRoles());
    return userRoles.has('ROLE_RECEPTIONIST')
  }

  public hasRoleDoctor(): boolean {
    let userRoles = new Set(this.keycloakService.getUserRoles());
    return userRoles.has('ROLE_DOCTOR')
  }

  public hasRoleAdmin(): boolean {
    let userRoles = new Set(this.keycloakService.getUserRoles());
    return userRoles.has('ROLE_ADMIN')
  }

  public hasRoleSuperAdmin(): boolean {
    let userRoles = new Set(this.keycloakService.getUserRoles());
    return userRoles.has('ROLE_SUPERADMIN')
  }
}
