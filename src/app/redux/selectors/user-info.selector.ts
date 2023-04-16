import { createSelector } from "@ngrx/store";
import { AppState } from "../index.reducers";

const userInfoState = (state: AppState) => state.userInfo;

export const selectKeycloakProfile = createSelector(
    userInfoState,
    state => state.keycloakProfile
);

export const selectIsLoadingKeycloakProfile = createSelector(
    userInfoState,
    state => state.loadingKeycloakProfile
);

export const selectPatientProfile = createSelector(
    userInfoState,
    state => state.patientProfile
);

export const selectDoctorProfile = createSelector(
    userInfoState,
    state => state.doctorProfile
);

export const selectIsLoadingUserProfile = createSelector(
    userInfoState,
    state => state.loadingUserProfile
);
