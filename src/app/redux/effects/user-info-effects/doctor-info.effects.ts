import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DoctorService } from "src/app/data/services/doctor/DoctorService";
import { DoctorServiceImpl } from "src/app/data/services/doctor/doctor.service";
import { AppState } from "../../index.reducers";
import { Store } from "@ngrx/store";
import { loadDoctorPersonalDataRequest, loadDoctorPersonalDataSuccess, loadDoctorInfoRequest, loadDoctorAppointmentsSchedulesRequest, loadDoctorAppointmentsSchedulesSuccess, loadDoctorInfoFailed, loadDoctorDepartmentDataRequest, loadDoctorDepartmentDataSuccess } from "../../actions/user-info-actions/doctor-info.action";
import { catchError, map, switchMap } from "rxjs";
import { effectErrorHandler } from "../../actions/error-action";
import { ScheduleServiceImpl } from "src/app/data/services/schedule/schedule.service";
import { DepartmentServiceImpl } from "src/app/data/services/department/department.service";

@Injectable()
export class DoctorInfoEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<AppState>,
        private readonly doctorService: DoctorServiceImpl,
        private readonly schedulesService: ScheduleServiceImpl,
        private readonly departmentService: DepartmentServiceImpl
    ) { }

    loadDoctorInfo$ = createEffect(() => this.actions$.pipe(
        ofType(loadDoctorInfoRequest),
        map(({ uuid }) => {
            loadDoctorAppointmentsSchedulesRequest({ uuid })
            return loadDoctorPersonalDataRequest({ uuid });
        }),
        catchError((err, caught) => {
            const errorAction = effectErrorHandler('loadDoctorInfo', err);
            this.store.dispatch(errorAction);
            this.store.dispatch(loadDoctorInfoFailed({ errorMessage: err.message }))

            return caught;
        })
    ));

    loadDoctorPersonalData$ = createEffect(() => this.actions$.pipe(
        ofType(loadDoctorPersonalDataRequest),
        switchMap(({ uuid }) => this.doctorService.getDoctorById(uuid)),
        map((doctorData) => {
            loadDoctorDepartmentDataRequest({ id: doctorData.departmentId })
            return loadDoctorPersonalDataSuccess({ doctorData })
        }),
        catchError((err, caught) => {
            const errorAction = effectErrorHandler('loadDoctorPersonalData', err);
            this.store.dispatch(errorAction);
            this.store.dispatch(loadDoctorInfoFailed({ errorMessage: err.message }))

            return caught;
        })
    ));

    loadDoctorDepartmentDataRequest$ = createEffect(() => this.actions$.pipe(
        ofType(loadDoctorDepartmentDataRequest),
        switchMap(({ id }) => this.departmentService.getDepartmentById(id)),
        map((departmentData) => loadDoctorDepartmentDataSuccess({ departmentData })),
        catchError((err, caught) => {
            const errorAction = effectErrorHandler('loadDoctorDepartmentDataRequest', err);
            this.store.dispatch(errorAction);
            this.store.dispatch(loadDoctorInfoFailed({ errorMessage: err.message }))

            return caught;
        })
    ));

    loadDoctorAppointmentSchedules$ = createEffect(() => this.actions$.pipe(
        ofType(loadDoctorAppointmentsSchedulesRequest),
        switchMap(({ uuid }) => this.schedulesService.getSchedulesWithAppointments(uuid)),
        map((schedulesAppointments) => loadDoctorAppointmentsSchedulesSuccess({
            schedulesAppointments
        })),
        catchError((err, caught) => {
            const errorAction = effectErrorHandler('loadDoctorAppointmentSchedules', err);
            this.store.dispatch(errorAction);
            this.store.dispatch(loadDoctorInfoFailed({ errorMessage: err.message }))

            return caught;
        })
    ));

    // loadDoctorInfo$ = createEffect(() => this.actions$.pipe(
    //     ofType(loadDoctorDataRequest),
    //     switchMap(({ uuid }) => this.doctorService.getDoctorById(uuid)),

    // ));
}