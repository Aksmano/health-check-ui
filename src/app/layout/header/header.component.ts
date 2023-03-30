import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { MenuItem } from 'primeng/api/menuitem';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public sidebar = false;
  public avatarMenuItems: MenuItem[] = [];
  public avatarName: string = '';

  constructor(
    public readonly navigationService: NavigationService,
    private readonly keycloak: KeycloakService
  ) { }

  public ngOnInit() {
    this.initAvatarMenuItems();
  }

  private async initAvatarMenuItems() {
    const loggedIn = await this.keycloak.isLoggedIn();
    if (loggedIn) {
      this.avatarName = 'Sign out';
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
      this.avatarName = 'Sign in';
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
