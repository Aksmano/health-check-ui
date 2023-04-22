import { AppointmentDateRS } from "./AppointmentDateRS";
import { ScheduleRS } from "./ScheduleRS";

export interface SchedulesAppointmentsRS {
    schedules: ScheduleRS[];
    appointments: AppointmentDateRS[];
}