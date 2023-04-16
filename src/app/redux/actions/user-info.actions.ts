import { createAction, props } from "@ngrx/store";
import { KeycloakProfile } from "keycloak-js";
import { PatientDataDTO } from "src/app/data/model/dto/rq/PatientDataDTO";
import { Doctor } from "src/app/data/model/entities/Doctor";
import { Patient } from "src/app/data/model/entities/Patient";
import { Nullable } from "src/app/utils";

export enum UserInfoActionTypes {
    LOAD_KEYCLOAK_PROFILE_INFO_REQUEST = '[User Info] Load Keycloak Profile Info Request',
    LOAD_KEYCLOAK_PROFILE_INFO_SUCCESS = '[User Info] Load Keycloak Profile Info Success',
    LOAD_PATIENT_PROFILE_INFO_REQUEST = '[User Info] Load Patient Profile Info Request',
    LOAD_PATIENT_PROFILE_INFO_SUCCESS = '[User Info] Load Patient Profile Info Success',
    POST_PATIENT_PROFILE_INFO_REQUEST = '[User Info] Post Patient Profile Info Request',
    POST_PATIENT_PROFILE_INFO_SUCCESS = '[User Info] Post Patient Profile Info Success',
    LOAD_DOCTOR_PROFILE_INFO_REQUEST = '[User Info] Load Doctor Profile Info Request',
    LOAD_DOCTOR_PROFILE_INFO_SUCCESS = '[User Info] Load Doctor Profile Info Success',
}

const ActionTypes = UserInfoActionTypes;

export const loadKeycloakProfileInfoRequest = createAction(
    ActionTypes.LOAD_KEYCLOAK_PROFILE_INFO_REQUEST
);

export const loadKeycloakProfileInfoSuccess = createAction(
    ActionTypes.LOAD_KEYCLOAK_PROFILE_INFO_SUCCESS,
    props<{ keycloakProfile: KeycloakProfile }>()
);

export const loadPatientProfileInfoRequest = createAction(
    ActionTypes.LOAD_PATIENT_PROFILE_INFO_REQUEST
);

export const loadPatientProfileInfoSuccess = createAction(
    ActionTypes.LOAD_PATIENT_PROFILE_INFO_SUCCESS,
    props<{ patientProfile?: Patient }>()
);

export const loadDoctorProfileInfoRequest = createAction(
    ActionTypes.LOAD_DOCTOR_PROFILE_INFO_REQUEST
);

export const loadDoctorProfileInfoSuccess = createAction(
    ActionTypes.LOAD_DOCTOR_PROFILE_INFO_SUCCESS,
    props<{ doctorProfile?: Doctor }>()
);

export const postPatientProfileInfoRequest = createAction(
    ActionTypes.POST_PATIENT_PROFILE_INFO_REQUEST,
    props<{ patientDataDto: PatientDataDTO }>()
)

export const postPatientProfileInfoSuccess = createAction(
    ActionTypes.POST_PATIENT_PROFILE_INFO_SUCCESS,
    props<{ patientProfile?: Patient }>()
)