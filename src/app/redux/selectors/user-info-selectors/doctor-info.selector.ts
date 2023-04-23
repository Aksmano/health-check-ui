import { createSelector } from "@ngrx/store";
import { AppState } from "../../index.reducers";

const doctorInfoState = (state: AppState) => state.doctorInfo;

export const selectDoctorPersonalData = createSelector(
    doctorInfoState,
    state => state.personalData
);

export const selectDoctorSchedulesAppointments = createSelector(
    doctorInfoState,
    state => state.schedulesAppointments
);

export const selectDoctorDepartmentData = createSelector(
    doctorInfoState,
    state => state.departmentData
);

export const selectIsLoadingDoctorInfoFinished = createSelector(
    doctorInfoState,
    state => state.departmentData.isProcessOngoing
        && state.personalData.isProcessOngoing
        && state.schedulesAppointments.isProcessOngoing
);

export const selectIsDoctorInfoLoadedSuccessfully = createSelector(
    doctorInfoState,
    state => state.isSuccess
);

export const selectDoctorInfoErrorMessage = createSelector(
    doctorInfoState,
    state => state.isSuccess
);