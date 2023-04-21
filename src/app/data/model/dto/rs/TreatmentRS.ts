import { PrescriptionRS } from "./PrescriptionRS";

export interface TreatmentRS {
    id: number;
    appointmentId: number;
    referralId: number;
    diagnosis: string;
    recommendation: string;
    prescription: PrescriptionRS;
}