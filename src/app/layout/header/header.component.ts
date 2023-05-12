import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {KeycloakService} from 'keycloak-angular';
import {MenuItem} from 'primeng/api/menuitem';
import {Subject} from 'rxjs';
import {NavigationService} from 'src/app/core/services/navigation/navigation.service';
import {RoleService} from 'src/app/core/services/roles/role.service';
import {AppState} from 'src/app/redux/index.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public sidebar = false;
  public avatarMenuItems: MenuItem[] = [];
  public avatarName: string = 'Sign in';

  private readonly ngUnsubscribe = new Subject();

  constructor(
    public readonly navigationService: NavigationService,
    private readonly store: Store<AppState>,
    private readonly keycloak: KeycloakService,
    private readonly roleService: RoleService
  ) {
  }

  public async ngOnInit() {
    this.initAvatarMenuItems();

    this.keycloak.loadUserProfile()
      .then(profile => this.avatarName = !!profile?.firstName
        ? `Welcome, ${profile?.firstName}`
        : 'Sign in'
      );
  }

  private async initAvatarMenuItems() {
    const loggedIn = await this.keycloak.isLoggedIn();
    let avatarMenuItems = []
    if (loggedIn) {
      avatarMenuItems.push(this.logout);
    } else {
      avatarMenuItems.push(this.login);
      avatarMenuItems.push(this.register);
    }
    console.log('before role')
    if (this.roleService.hasRolePatient()) {
      console.log('role')
      avatarMenuItems.push(this.patientTests)
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
    con: 'pi pi-sign-in',
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

  private patientTests = {
    label: 'My tests',
    icon: 'pi pi-bookmark-fill',
    command: () => {
      this.navigationService.toMedicalTestByPatient('tests')
    }
  }
}
