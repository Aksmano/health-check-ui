import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { KeycloakService } from 'keycloak-angular';
import { MenuItem } from 'primeng/api/menuitem';
import { Subject, takeUntil } from 'rxjs';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { loadKeycloakInfoRequest } from 'src/app/redux/actions/user-info-actions/keylcloak-info.actions';
import { AppState } from 'src/app/redux/index.reducers';
import { selectKeycloakProfile } from 'src/app/redux/selectors/user-info-selectors/keycloak-info.selector';

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
    private readonly keycloak: KeycloakService
  ) { }

  public ngOnInit() {
    this.initAvatarMenuItems();

    // this.store.dispatch(loadKeycloakProfileInfoRequest());

    this.store.select(selectKeycloakProfile)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(userProfile =>{
        console.log(this.keycloak.getUserRoles());
        
        
        this.avatarName = !!userProfile?.username
          ? `Welcome, ${userProfile?.username}`
          : 'Sign in'
      }
      );
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
