import { createAction, props } from "@ngrx/store";
import { KeycloakProfile } from "keycloak-js";
import { UserType } from "src/app/data/model/common/UserType";
import { PatientDataRQ } from "src/app/data/model/dto/rq/PatientDataRQ";
import { PatientRS } from "src/app/data/model/dto/rs/PatientRS";
import { DoctorRS } from "src/app/data/model/dto/rs/employeeRS/DoctorRS";
import { KeycloakInfoState } from "../../reducers/user-info-reducers/keycloak-info.reducer";

export enum KeycloakInfoActionType {
    LOAD_KEYCLOAK_INFO_REQUEST = '[Keycloak Info] Load Keycloak Info Request',
    LOAD_KEYCLOAK_INFO_SUCCESS = '[Keycloak Info] Load Keycloak Info Success',
    SET_KEYCLOAK_PROFILE = '[Keycloak Info] Set Keycloak Profile',
    SET_USER_ROLES = '[Keycloak Info] Set Keycloak Profile',
    SET_USER_TYPE = '[Keycloak Info] Set User Type'
    // LOAD_KEYCLOAK_PROFILE_INFO_REQUEST = '[Keycloak Info] Load Keycloak Profile Info Request',
    // LOAD_KEYCLOAK_PROFILE_INFO_SUCCESS = '[Keycloak Info] Load Keycloak Profile Info Success',
    // LOAD_PATIENT_PROFILE_INFO_REQUEST = '[User Info] Load Patient Profile Info Request',
    // LOAD_PATIENT_PROFILE_INFO_SUCCESS = '[User Info] Load Patient Profile Info Success',
    // POST_PATIENT_PROFILE_INFO_REQUEST = '[User Info] Post Patient Profile Info Request',
    // POST_PATIENT_PROFILE_INFO_SUCCESS = '[User Info] Post Patient Profile Info Success',
    // LOAD_DOCTOR_PROFILE_INFO_REQUEST = '[User Info] Load Doctor Profile Info Request',
    // LOAD_DOCTOR_PROFILE_INFO_SUCCESS = '[User Info] Load Doctor Profile Info Success',
}

const ActionTypes = KeycloakInfoActionType;

export const loadKeycloakInfoRequest = createAction(
    ActionTypes.LOAD_KEYCLOAK_INFO_REQUEST
);

export const loadKeycloakInfoSuccess = createAction(
    ActionTypes.LOAD_KEYCLOAK_INFO_SUCCESS,
    props<{
        keycloakInfo?: {
            profile?: KeycloakProfile,
            roles?: string[];
            userType: UserType;
        }
    }>()
);

export const setKeycloakProfile = createAction(
    ActionTypes.SET_KEYCLOAK_PROFILE,
    props<{ keycloakProfile: KeycloakProfile }>()
);

export const setUserRoles = createAction(
    ActionTypes.SET_USER_ROLES,
    props<{ userRoles: string[] }>()
);

export const setUserType = createAction(
    ActionTypes.SET_USER_TYPE,
    props<{ userType: UserType }>()
);

// export const loadPatientProfileInfoRequest = createAction(
//     ActionTypes.LOAD_PATIENT_PROFILE_INFO_REQUEST
// );

// export const loadPatientProfileInfoSuccess = createAction(
//     ActionTypes.LOAD_PATIENT_PROFILE_INFO_SUCCESS,
//     props<{ patientData?: PatientRS }>()
// );

// export const loadDoctorProfileInfoRequest = createAction(
//     ActionTypes.LOAD_DOCTOR_PROFILE_INFO_REQUEST
// );

// export const loadDoctorProfileInfoSuccess = createAction(
//     ActionTypes.LOAD_DOCTOR_PROFILE_INFO_SUCCESS,
//     props<{ doctorData?: DoctorRS }>()
// );

// export const postPatientProfileInfoRequest = createAction(
//     ActionTypes.POST_PATIENT_PROFILE_INFO_REQUEST,
//     props<{ patientDataDto: PatientDataRQ }>()
// )

// export const postPatientProfileInfoSuccess = createAction(
//     ActionTypes.POST_PATIENT_PROFILE_INFO_SUCCESS,
//     props<{ patientData?: PatientRS }>()
// )