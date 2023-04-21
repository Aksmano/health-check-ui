import { EmployeeRS } from "./EmployeeRS";

export interface AdministratorRS extends EmployeeRS {
    administratorUUID: string;  // as uuid
}