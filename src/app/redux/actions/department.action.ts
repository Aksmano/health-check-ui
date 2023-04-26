import { createAction } from "@ngrx/store";

export enum DepartmentActionType {
    LOAD_DEPARTMENTS_INFO_REQUEST = '[Load Department] Load Departments Info Request',
    LOAD_DEPARTMENTS_INFO_SUCCESS = '[Load Department] Load Departments Info Success',
    LOAD_DEPARTMENT_ALL_DOCTORS_REQUEST = '[Load Department] Load Department All Doctors Request',
    LOAD_DEPARTMENT_ALL_DOCTORS_SUCCESS = '[Load Department] Load Department All Doctors Success',
    LOAD_DOCTOR_SCHEDULES_REQUEST = '[Load Department] Load Doctor Schedules Request',
    LOAD_DOCTOR_SCHEDULES_SUCCESS = '[Load Department] Load Doctor Schedules Success',
}

const ActionType = DepartmentActionType;

export const loadDepartmentsInfoRequest = createAction(
    ActionType.LOAD_DEPARTMENTS_INFO_REQUEST
)