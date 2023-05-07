import { Specialization } from "../../../common/Specialization";
import { EmployeeRQ } from "./EmployeeRQ";

export interface DoctorRQ extends EmployeeRQ {
    specialization: string;
}