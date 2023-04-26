import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../index.reducers";
import { KeycloakService } from "keycloak-angular";
import { loadKeycloakInfoRequest, loadKeycloakInfoSuccess, setUserType } from "../../actions/user-info-actions/keylcloak-info.actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, tap, withLatestFrom } from "rxjs";
import { effectErrorHandler } from "../../actions/error-action";
import { UserInfoService } from "src/app/data/services/user-info/user-info.service";
import { selectKeycloakProfile } from "../../selectors/user-info-selectors/keycloak-info.selector";
import { UserType } from "src/app/data/model/common/UserType";
import { loadDoctorInfoRequest } from "../../actions/user-info-actions/doctor-info.action";

@Injectable()
export class UserInfoEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<AppState>,
        private readonly keycloakService: KeycloakService,
        private readonly userInfo: UserInfoService
    ) { }

    loadKeycloakProfileInfo$ = createEffect(() => this.actions$.pipe(
        ofType(loadKeycloakInfoRequest),
        switchMap(() => this.keycloakService.loadUserProfile()),
        map((profile) => {
            const roles = this.keycloakService.getUserRoles();
            const userType = this.resolveUserType(roles, profile.id!);

            return loadKeycloakInfoSuccess({
                keycloakInfo: {
                    profile,
                    roles,
                    userType
                }
            });
        }),
        catchError((err, caught) => {
            const errorAction = effectErrorHandler('loadKeycloakProfileInfo', err);
            this.store.dispatch(errorAction);

            return caught;
        })
    ));

    private resolveUserType(userRoles: string[], uuid: string, setUser: boolean = false) {
        if (userRoles.includes(UserType.Doctor)) {
            setUser && this.store.dispatch(setUserType({ userType: UserType.Doctor }));
            this.store.dispatch(loadDoctorInfoRequest({ uuid }));
            return UserType.Doctor;
        } else if (userRoles.includes(UserType.Receptionist)) {
            setUser && this.store.dispatch(setUserType({ userType: UserType.Receptionist }));
            // this.store.dispatch(loadReceptionistInfoRequest({ uuid }));
            return UserType.Receptionist;
        } else if (userRoles.includes(UserType.Admin)) {
            setUser && this.store.dispatch(setUserType({ userType: UserType.Admin }));
            // this.store.dispatch(loadAdminInfoRequest({ uuid }));
            return UserType.Admin;
        } else if (userRoles.includes(UserType.Superadmin)) {
            setUser && this.store.dispatch(setUserType({ userType: UserType.Superadmin }));
            // this.store.dispatch(loadSuperadminInfoRequest({ uuid }));
            return UserType.Superadmin;
        } else if (userRoles.includes(UserType.Patient)) {
            setUser && this.store.dispatch(setUserType({ userType: UserType.Patient }));
            // this.store.dispatch(loadPatientInfoRequest({ uuid }));
            return UserType.Patient;
        } else {
            setUser && this.store.dispatch(setUserType({ userType: UserType.Guest }));
            return UserType.Patient;
        }
    }
}