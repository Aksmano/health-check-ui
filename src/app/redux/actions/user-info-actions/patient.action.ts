import { createAction } from "@ngrx/store";

export enum PatientActionType {
    LOAD_PATIENT_DATA_REQUEST = '[Patient] Load Patient Data Request',
    LOAD_PATIENT_DATA_SUCCESS = '[Patient] Load Patient Data Success',
    LOAD_PATIENT_APPOINTMENTS_REQUEST = '[Patient] Load Patient Appointment Request',
    LOAD_PATIENT_APPOINTMENTS_SUCCESS = '[Patient] Load Patient Appointment Success',
    LOAD_PATIENT_RATINGS_REQUEST = '[Patient] Load Patient Ratings Request',
    LOAD_PATIENT_RATINGS_SUCCESS = '[Patient] Load Patient Ratings Success',
    LOAD_PATIENT_TESTS_REQUEST = '[Patient] Load Patient Tests Request',
    LOAD_PATIENT_TESTS_SUCCESS = '[Patient] Load Patient Tests Success',
}

const ActionType = PatientActionType;

export const loadPatientDataRequest = createAction(
    ActionType.LOAD_PATIENT_DATA_REQUEST
);

export const loadPatientDataSuccess = createAction(
    ActionType.LOAD_PATIENT_DATA_SUCCESS
);

export const loadPatientAppointmentRequest = createAction(
    ActionType.LOAD_PATIENT_APPOINTMENTS_REQUEST
);

export const loadPatientAppointmentSuccess = createAction(
    ActionType.LOAD_PATIENT_APPOINTMENTS_SUCCESS
);

export const loadPatientRatingsRequest = createAction(
    ActionType.LOAD_PATIENT_RATINGS_REQUEST
);

export const loadPatientRatingsSuccess = createAction(
    ActionType.LOAD_PATIENT_RATINGS_SUCCESS
);

export const loadPatientTestsRequest = createAction(
    ActionType.LOAD_PATIENT_TESTS_REQUEST
);

export const loadPatientTestsSuccess = createAction(
    ActionType.LOAD_PATIENT_TESTS_SUCCESS
);