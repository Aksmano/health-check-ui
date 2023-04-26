import { createSelector } from "@ngrx/store";
import { AppState } from "../../index.reducers";

const userInfoState = (state: AppState) => state.userInfo;

export const selectKeycloakProfile = createSelector(
    userInfoState,
    state => state.keycloakInfo.data?.profile
);

export const selectKeycloakRoles = createSelector(
    userInfoState,
    state => state.keycloakInfo.data?.roles
);

export const selectUserType = createSelector(
    userInfoState,
    state => state.keycloakInfo.data?.userType
);

export const selectIsKeycloakInfoLoading = createSelector(
    userInfoState,
    state => state.keycloakInfo.isProcessOngoing
);