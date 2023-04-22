import { TestType } from "../../../common/TestType";
import { ScheduleRS } from "./ScheduleRS";

export interface MedicalTestSchedulesRS {
    departmentId: number;
    type: TestType;
    receptionSchedules: ScheduleRS;
    assignedSchedules: ScheduleRS;
}