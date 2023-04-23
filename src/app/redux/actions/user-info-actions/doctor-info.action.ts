import { createAction, props } from "@ngrx/store";
import { DepartmentRS } from "src/app/data/model/dto/rs/DepartmentRS";
import { DoctorRS } from "src/app/data/model/dto/rs/employeeRS/DoctorRS";
import { SchedulesAppointmentsRS } from "src/app/data/model/dto/rs/schedules/SchedulesAppointmentsRS";

export enum DoctorInfoActionType {
    LOAD_DOCTOR_INFO_REQUEST = '[Doctor Info] Load Doctor Info Request',
    // LOAD_DOCTOR_INFO_SUCCESS = '[Doctor Info] Load Doctor Info Success',
    LOAD_DOCTOR_INFO_FAILED = '[Doctor Info] Load Doctor Info Failed',
    LOAD_DOCTOR_DEPARTMENT_DATA_REQUEST = '[Doctor Info] Load Doctor Department Data Request',
    LOAD_DOCTOR_DEPARTMENT_DATA_SUCCESS = '[Doctor Info] Load Doctor Department Data Success',
    LOAD_DOCTOR_PERSONAL_DATA_REQUEST = '[Doctor Info] Load Doctor Personal Data Request',
    LOAD_DOCTOR_PERSONAL_DATA_SUCCESS = '[Doctor Info] Load Doctor Personal Data Success',
    LOAD_DOCTOR_APPOINTMENTS_SCHEDULES_REQUEST = '[Doctor Info] Load Doctor Appointments Schedules Request',
    LOAD_DOCTOR_APPOINTMENTS_SCHEDULES_SUCCESS = '[Doctor Info] Load Doctor Appointments Schedules Success',
}

const ActionType = DoctorInfoActionType;

export const loadDoctorInfoRequest = createAction(
    ActionType.LOAD_DOCTOR_INFO_REQUEST,
    props<{ uuid: string }>()
);

// export const loadDoctorInfoSuccess = createAction(
//     ActionType.LOAD_DOCTOR_INFO_SUCCESS
// );

export const loadDoctorInfoFailed = createAction(
    ActionType.LOAD_DOCTOR_INFO_FAILED,
    props<{ errorMessage: string }>()
);

export const loadDoctorDepartmentDataRequest = createAction(
    ActionType.LOAD_DOCTOR_DEPARTMENT_DATA_REQUEST,
    props<{ id: number }>()
);

export const loadDoctorDepartmentDataSuccess = createAction(
    ActionType.LOAD_DOCTOR_DEPARTMENT_DATA_SUCCESS,
    props<{ departmentData: DepartmentRS }>()
);

export const loadDoctorPersonalDataRequest = createAction(
    ActionType.LOAD_DOCTOR_PERSONAL_DATA_REQUEST,
    props<{ uuid: string }>()
);

export const loadDoctorPersonalDataSuccess = createAction(
    ActionType.LOAD_DOCTOR_PERSONAL_DATA_SUCCESS,
    props<{ doctorData: DoctorRS }>()
);

export const loadDoctorAppointmentsSchedulesRequest = createAction(
    ActionType.LOAD_DOCTOR_APPOINTMENTS_SCHEDULES_REQUEST,
    props<{ uuid: string }>()
);

export const loadDoctorAppointmentsSchedulesSuccess = createAction(
    ActionType.LOAD_DOCTOR_APPOINTMENTS_SCHEDULES_SUCCESS,
    props<{ schedulesAppointments: SchedulesAppointmentsRS }>()
);