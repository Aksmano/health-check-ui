import { createReducer, on } from "@ngrx/store";
import { DepartmentRS } from "src/app/data/model/dto/rs/DepartmentRS";
import { DoctorRS } from "src/app/data/model/dto/rs/employeeRS/DoctorRS";
import { SchedulesAppointmentsRS } from "src/app/data/model/dto/rs/schedules/SchedulesAppointmentsRS";
import { WithProcessIndicator, newWPI } from "src/app/data/model/utils/WithProcessIndicator";
import * as DoctorInfoActions from "../../actions/user-info-actions/doctor-info.action"
import { } from "src/app/utils";

export interface DoctorInfoState {
    personalData: WithProcessIndicator<DoctorRS>;
    departmentData: WithProcessIndicator<DepartmentRS>;
    schedulesAppointments: WithProcessIndicator<SchedulesAppointmentsRS>;
    isSuccess?: boolean;
    errorMessage?: string;
}

const initialState: DoctorInfoState = {
    departmentData: newWPI(),
    personalData: newWPI(),
    schedulesAppointments: newWPI(),
    isSuccess: undefined,
    errorMessage: undefined
}

export const doctorInfoReducer = createReducer(
    initialState,
    on(DoctorInfoActions.loadDoctorInfoRequest,
        () => (
            initialState
        )),
    on(DoctorInfoActions.loadDoctorInfoFailed,
        state => ({
            ...state,
            isSuccess: false
        })),
    on(DoctorInfoActions.loadDoctorPersonalDataRequest,
        state => ({
            ...state,
            personalData: {
                data: undefined,
                isProcessOngoing: true
            },
        })),
    on(DoctorInfoActions.loadDoctorPersonalDataSuccess,
        (state, { doctorData }) => ({
            ...state,
            personalData: {
                data: doctorData,
                isProcessOngoing: false
            },
        })),
    on(DoctorInfoActions.loadDoctorAppointmentsSchedulesRequest,
        state => ({
            ...state,
            schedulesAppointments: {
                data: undefined,
                isProcessOngoing: true
            },
        })),
    on(DoctorInfoActions.loadDoctorAppointmentsSchedulesSuccess,
        (state, { schedulesAppointments }) => ({
            ...state,
            schedulesAppointments: {
                data: schedulesAppointments,
                isProcessOngoing: false
            },
        })),
    on(DoctorInfoActions.loadDoctorAppointmentsSchedulesRequest,
        state => ({
            ...state,
            schedulesAppointments: {
                data: undefined,
                isProcessOngoing: true
            },
        })),
    on(DoctorInfoActions.loadDoctorAppointmentsSchedulesSuccess,
        (state, { schedulesAppointments }) => ({
            ...state,
            schedulesAppointments: {
                data: schedulesAppointments,
                isProcessOngoing: false
            },
        })),
)