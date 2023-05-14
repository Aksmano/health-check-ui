import {ScheduleRS} from "../../../../data/model/dto/rs/schedules/ScheduleRS";
import {TestDateRS} from "../../../../data/model/dto/rs/schedules/TestDateRS";

export interface TestScheduleDay {
  day: string;
  dayName: string;
  schedules: TestDateRS[];
  assignedSchedules: {}
}

export interface TestScheduleDayRec {
  day: Date;
  schedules: TestDateRS[];
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
