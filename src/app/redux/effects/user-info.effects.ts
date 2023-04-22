import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../index.reducers";
import { KeycloakService } from "keycloak-angular";
import { loadKeycloakProfileInfoRequest, loadKeycloakProfileInfoSuccess, loadPatientProfileInfoRequest, loadPatientProfileInfoSuccess, postPatientProfileInfoRequest, postPatientProfileInfoSuccess } from "../actions/user-info.actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, tap, withLatestFrom } from "rxjs";
import { effectErrorHandler } from "../actions/error-action";
import { UserInfoService } from "src/app/data/services/user-info/user-info.service";
import { selectKeycloakProfile } from "../selectors/user-info.selector";

@Injectable()
export class UserInfoEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<AppState>,
        private readonly keycloakService: KeycloakService,
        private readonly userInfo: UserInfoService
    ) { }

    loadKeycloakProfileInfo$ = createEffect(() => this.actions$.pipe(
        ofType(loadKeycloakProfileInfoRequest),
        switchMap(() => this.keycloakService.loadUserProfile()),
        map((keycloakProfile) => loadKeycloakProfileInfoSuccess({ keycloakProfile: keycloakProfile })),
        catchError((err, caught) => {
            const errorAction = effectErrorHandler('loadKeycloakProfileInfo', err);
            this.store.dispatch(errorAction);

            return caught;
        })
    ));

    loadPatientProfileInfo$ = createEffect(() => this.actions$.pipe(
        ofType(loadPatientProfileInfoRequest),
        withLatestFrom(this.store.select(selectKeycloakProfile)),
        switchMap(([_, profile]) => this.userInfo.getPatientInfo(profile?.id!,)),
        map((profile) => loadPatientProfileInfoSuccess({ patientData: profile ?? undefined })),
        catchError((err, caught) => {
            const errorAction = effectErrorHandler('loadPatientProfileInfo', err);
            this.store.dispatch(errorAction);

            return caught;
        })
    ))

    postPatientProfileInfo$ = createEffect(() => this.actions$.pipe(
        ofType(postPatientProfileInfoRequest),
        // withLatestFrom(this.store.select(selectKeycloakProfile)),
        switchMap((action) => this.userInfo.postPatientInfo(action.patientDataDto)),
        map((profile) => postPatientProfileInfoSuccess({ patientData: profile ?? undefined })),
        catchError((err, caught) => {
            const errorAction = effectErrorHandler('postPatientProfileInfo', err);
            this.store.dispatch(errorAction);

            return caught;
        })
    ));
}