import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public async loginUser() {
    await this.keycloakService.login();

    console.log('logged');    
  }

  constructor(
    private readonly keycloakService: KeycloakService
  ) { }
}
