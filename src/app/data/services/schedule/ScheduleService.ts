import { Observable } from "rxjs";
import { ScheduleCriteriaQP } from "../../model/dto/qp/schedule/ScheduleCriteriaQP";
import { Service } from "../Service";
import { ScheduleRS } from "../../model/dto/rs/schedules/ScheduleRS";
import { SchedulesAppointmentsRS } from "../../model/dto/rs/schedules/SchedulesAppointmentsRS";
import { ScheduleRQ } from "../../model/dto/rq/ScheduleRQ";
import { SchedulesAppointmentsCriteriaQP } from "../../model/dto/qp/schedule/SchedulesAppointmentsCriteriaQP";

export interface ScheduleService extends Service {
    getSchedules(uuid: string, scheduleCriteria?: ScheduleCriteriaQP): Observable<ScheduleRS[]>;
    getSchedulesWithAppointments(uuid: string, scheduleCriteria?: SchedulesAppointmentsCriteriaQP): Observable<SchedulesAppointmentsRS>;
    addSchedules(schedules: ScheduleRQ[]): Observable<ScheduleRS[]>;
}