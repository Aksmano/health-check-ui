import { ScheduleRS } from "./ScheduleRS";

export interface AppointmentDateRS extends ScheduleRS {
    busy?: boolean;
 }