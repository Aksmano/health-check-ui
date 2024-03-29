import { AppointmentDateRS } from "src/app/data/model/dto/rs/schedules/AppointmentDateRS";

export interface AppointmentScheduleDay {
  day: string;
  dayName: string;
  schedules: AppointmentDateRS[];
  assignedSchedules: {}
}

export interface AppointmentScheduleDayRec {
  day: Date;
  schedules: AppointmentDateRS[];
}

export const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];
