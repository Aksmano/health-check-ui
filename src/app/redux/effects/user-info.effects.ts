import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../index.reducers";
import { KeycloakService } from "keycloak-angular";
import { loadUserProfileInfoRequest, loadUserProfileInfoSuccess } from "../actions/user-info.actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs";
import { effectErrorHandler } from "../actions/error-action";

@Injectable()
export class UserInfoEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<AppState>,
        private readonly keycloakService: KeycloakService
    ) { }

    loadUserProfileInfo$ = createEffect(() => this.actions$.pipe(
        ofType(loadUserProfileInfoRequest),
        switchMap(() => this.keycloakService.loadUserProfile()),
        map((userProfile) => loadUserProfileInfoSuccess({ userProfile })),
        catchError((err, caught) => {
            const errorAction = effectErrorHandler('loadUserProfileInfo', err);
            this.store.dispatch(errorAction);

            return caught;
        })
    ))
}