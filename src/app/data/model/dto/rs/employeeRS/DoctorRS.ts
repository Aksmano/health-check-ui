import { Specialization } from "../../../common/Specialization";
import { EmployeeRS } from "./EmployeeRS";

export interface DoctorRS extends EmployeeRS {
    doctorUUID: string;  // as uuid
    specialization: Specialization;
    rate: number;
    rateNumber: number;
}