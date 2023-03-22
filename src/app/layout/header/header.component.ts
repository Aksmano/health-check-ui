import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public sidebar = false;
  public avatarMenuItems: MenuItem[] = [];

  constructor(
    private readonly keycloak: KeycloakService
  ) { }

  public ngOnInit() {
    this.initAvatarMenuItems();
  }

  private async initAvatarMenuItems() {
    const loggedIn = await this.keycloak.isLoggedIn();
    if (loggedIn) {
      this.avatarMenuItems = [
        {
          label: 'Sign out',
          icon: 'pi pi-sign-out',
          command: () => {
            this.keycloak.logout()
          },
        }
      ]
    } else {
      this.avatarMenuItems = [
        {
          label: 'Sign in',
          icon: 'pi pi-sign-in',
          command: () => {
            this.keycloak.login()
          },
        },
        {
          label: 'Sign up',
          icon: 'pi pi-user-plus',
          command: () => {
            this.keycloak.register()
          },
        }
      ]
    }
  }
}
