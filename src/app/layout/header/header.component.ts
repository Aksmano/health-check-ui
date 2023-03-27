import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { MenuItem } from 'primeng/api/menuitem';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { NavigationService } from 'src/app/core/services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public sidebar = false;
  public avatarMenuItems: MenuItem[] = [];

  constructor(
    public readonly navigationService: NavigationService,
    private readonly authService: AuthService,
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
            this.authService.loginUser()
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
