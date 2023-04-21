import { TestType } from "../../entities/MedicalOffer";
import { ScheduleRQ } from "./ScheduleRQ";

export interface MedicalTestScheduleRQ {
    departmentId: number;
    testType: TestType;
    schedules: ScheduleRQ[];
}