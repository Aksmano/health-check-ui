import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { UserType } from 'src/app/data/model/common/UserType';
import { AppState } from 'src/app/redux/index.reducers';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  public avatarMenuItems: MenuItem[] = [];
  public avatarName: string = 'Sign in';

  private readonly ngUnsubscribe = new Subject();

  constructor(
    public readonly navigationService: NavigationService,
    private readonly store: Store<AppState>,
    private readonly keycloak: KeycloakService
  ) { }

  public async ngOnInit() {
    this.initAvatarMenuItems();

    this.keycloak.loadUserProfile()
      .then(profile =>
        this.avatarName = !!profile?.firstName
          ? `Welcome, ${profile?.firstName}`
          : 'Sign in'
      );
  }

  private async initAvatarMenuItems() {
    const loggedIn = await this.keycloak.isLoggedIn();
    if (loggedIn) {
      this.avatarMenuItems = [];

      if (this.keycloak.isUserInRole(UserType.Admin)
        || this.keycloak.isUserInRole(UserType.Superadmin)
      ) this.avatarMenuItems.push({
        label: "Admin panel",
        icon: "pi pi-book",
        command: () => {
          this.navigationService.toSuperadminPanel();
        }
      })

      this.avatarMenuItems.push({
        label: 'Sign out',
        icon: 'pi pi-sign-out',
        command: () => {
          this.keycloak.logout()
        },
      })
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
