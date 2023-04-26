import { Department } from "./Department";
import { Doctor } from "./Doctor";
import { Patient } from "./Patient";

export interface Appointment {
    doctor: Doctor;
    patient: Patient;
    department: Department;
    appointmentDate: Date;
    comments: string;
    cabinetNumber: number;
    //  treatment: Treatment ;
}