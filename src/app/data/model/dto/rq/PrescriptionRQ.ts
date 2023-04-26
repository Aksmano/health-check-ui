export interface PrescriptionRQ {
    treatmentId: number;
    code: string;
    description: string;
    expirationDate: Date;
}