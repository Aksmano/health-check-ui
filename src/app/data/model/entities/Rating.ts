import { Doctor } from "./Doctor";
import { Patient } from "./Patient";

export interface Rating {
    doctor?: Doctor;
    patient?: Patient;
    grade: number;
    description?: string;
}