import { AppointmentStatus } from "../common/AppointmentStatus";
import { PatientRS } from "./PatientRS";
import { TreatmentRS } from "./TreatmentRS";
import { DoctorRS } from "./employeeRS/DoctorRS";

export interface AppointmentRS {
    id: number;
    doctorRS: DoctorRS;
    patientRS: PatientRS;
    departmentId: number;
    status: AppointmentStatus;
    appointmentDate: Date;
    comments: string;
    treatmentRS: TreatmentRS;
}