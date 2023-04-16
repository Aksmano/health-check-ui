import { Patient } from "../../entities/Patient";

export interface PatientDataDTO {
    patient: Patient;
    keycloakId: string;
}