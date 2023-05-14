import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { RoleService } from 'src/app/core/services/roles/role.service';
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

  private userId: string | undefined;
  private readonly ngUnsubscribe = new Subject();

  constructor(
    public readonly navigationService: NavigationService,
    private readonly store: Store<AppState>,
    private readonly keycloak: KeycloakService,
    private readonly roleService: RoleService
  ) {
  }

  public async ngOnInit() {

    this.keycloak.loadUserProfile()
      .then(profile => {
        this.avatarName = !!profile?.firstName
          ? `Welcome, ${profile?.firstName}`
          : 'Sign in'
        this.userId = profile.id;
      })
    this.initAvatarMenuItems();
  }

  private async initAvatarMenuItems() {
    const loggedIn = await this.keycloak.isLoggedIn();
    let avatarMenuItems = [];
    if (loggedIn) {
      if (this.keycloak.isUserInRole(UserType.Admin)
        || this.keycloak.isUserInRole(UserType.Superadmin)
      ) this.avatarMenuItems.push(this.adminPanel)

      if (this.roleService.hasRolePatient()) {
        avatarMenuItems.push(this.patientTests)
      }

      avatarMenuItems.push(this.logout);
    } else {
      avatarMenuItems.push(this.login);
      avatarMenuItems.push(this.register);
    }
    this.avatarMenuItems = avatarMenuItems;
  }

  private logout = {
    label: 'Sign out',
    icon: 'pi pi-sign-out',
    command: () => {
      this.keycloak.logout()
    },
  }
  private login = {
    label: 'Sign in',
    icon: 'pi pi-sign-in',
    command: () => {
      this.keycloak.login()
    }
  }
  private register = {
    label: 'Sign up',
    icon: 'pi pi-user-plus',
    command: () => {
      this.keycloak.register()
    }
  }
  private adminPanel = {
    label: "Admin panel",
    icon: "pi pi-book",
    command: () => {
      this.navigationService.toSuperadminPanel();
    }
  }
  private patientTests = {
    label: 'My tests',
    icon: 'pi pi-bookmark-fill',
    command: () => {
      this.navigationService.toMedicalTestByPatient(this.userId!)
    }
  }


}
