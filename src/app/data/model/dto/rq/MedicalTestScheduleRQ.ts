import { TestType } from "../../common/TestType";
import { ScheduleRQ } from "./ScheduleRQ";

export interface MedicalTestScheduleRQ {
    departmentId: number;
    testType: TestType;
    schedules: ScheduleRQ[];
}