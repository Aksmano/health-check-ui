import { createAction, props } from "@ngrx/store";
import { KeycloakProfile } from "keycloak-js";

export enum UserInfoActionTypes {
    LOAD_USER_PROFILE_INFO_REQUEST = '[User Info] Load User Profile Info Request',
    LOAD_USER_PROFILE_INFO_SUCCESS = '[User Info] Load User Profile Info Success',
}

const ActionTypes = UserInfoActionTypes;

export const loadUserProfileInfoRequest = createAction(
    ActionTypes.LOAD_USER_PROFILE_INFO_REQUEST
);

export const loadUserProfileInfoSuccess = createAction(
    ActionTypes.LOAD_USER_PROFILE_INFO_SUCCESS,
    props<{userProfile: KeycloakProfile}>()
)