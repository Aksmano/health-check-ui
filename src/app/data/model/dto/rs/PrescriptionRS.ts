import { TreatmentRS } from "./TreatmentRS";

export interface PrescriptionRS {
    id: number;
    treatmentRS: TreatmentRS;
    code: string;
    description: string;
    expirationDate: Date;
}