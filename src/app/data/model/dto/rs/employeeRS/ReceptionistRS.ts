import { EmployeeRS } from "./EmployeeRS";

export interface ReceptionistRS extends EmployeeRS {
    receptionistUUID: string;  // as uuid
}