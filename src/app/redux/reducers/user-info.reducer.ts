import { createReducer, on } from "@ngrx/store";
import { KeycloakProfile } from "keycloak-js";
import * as UserInfoActions from "../actions/user-info.actions";
import { Patient } from "src/app/data/model/entities/Patient";
import { Doctor } from "src/app/data/model/entities/Doctor";

export interface UserInfoState {
    keycloakProfile?: KeycloakProfile;
    loadingKeycloakProfile: boolean;
    patientProfile?: Patient;
    doctorProfile?: Doctor;
    loadingUserProfile: boolean;
};

const initialState: UserInfoState = {
    keycloakProfile: undefined,
    loadingKeycloakProfile: false,
    patientProfile: undefined,
    doctorProfile: undefined,
    loadingUserProfile: false
};

export const userInfoReducer = createReducer(
    initialState,
    on(UserInfoActions.loadKeycloakProfileInfoRequest,
        state => ({
            ...state,
            loadingKeycloakProfile: true
        })),
    on(UserInfoActions.loadKeycloakProfileInfoSuccess,
        (state, { keycloakProfile }) => ({
            ...state,
            keycloakProfile: keycloakProfile,
            loadingKeycloakProfile: false
        })),
    on(UserInfoActions.loadPatientProfileInfoRequest,
        state => ({
            ...state,
            doctorProfile: undefined,
            loadingUserProfile: true
        })),
    on(UserInfoActions.loadPatientProfileInfoSuccess,
        (state, { patientProfile }) => ({
            ...state,
            patientProfile: !!patientProfile ? {
                ...patientProfile,
                firstName: state.keycloakProfile?.firstName!,
                lastName: state.keycloakProfile?.lastName!
            } : undefined,
            loadingUserProfile: false
        })),
    on(UserInfoActions.loadDoctorProfileInfoRequest,
        state => ({
            ...state,
            patientProfile: undefined,
            loadingUserProfile: true
        })),
    on(UserInfoActions.loadDoctorProfileInfoSuccess,
        (state, { doctorProfile }) => ({
            ...state,
            doctorProfile: !!doctorProfile ? {
                ...doctorProfile,
                firstName: state.keycloakProfile?.firstName!,
                lastName: state.keycloakProfile?.lastName!
            } : undefined,
            loadingUserProfile: false
        })),
    on(UserInfoActions.postPatientProfileInfoRequest,
        state => ({
            ...state,
            doctorProfile: undefined,
            patientProfile: undefined,
            loadingUserProfile: true
        })),
    on(UserInfoActions.postPatientProfileInfoSuccess,
        (state, { patientProfile }) => ({
            ...state,
            patientProfile: patientProfile,
            loadingUserProfile: false
        }))
);