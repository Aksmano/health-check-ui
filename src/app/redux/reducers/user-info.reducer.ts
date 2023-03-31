import { createReducer, on } from "@ngrx/store";
import { KeycloakProfile } from "keycloak-js";
import * as UserInfoActions from "../actions/user-info.actions";

export interface UserInfoState {
    userProfile: KeycloakProfile | undefined;
    loadingUserProfile: boolean;
};

const initialState: UserInfoState = {
    userProfile: undefined,
    loadingUserProfile: false
};

export const userInfoReducer = createReducer(
    initialState,
    on(UserInfoActions.loadUserProfileInfoRequest,
        state => ({
            ...state,
            loadingUserProfile: true
        })),
    on(UserInfoActions.loadUserProfileInfoSuccess,
        (state, { userProfile }) => ({
            ...state,
            userProfile: userProfile,
            loadingUserProfile: false
        }))
);