export interface RatingRS {
    id: number;
    patientUUID: string;  // as uuid
    doctorUUID: string;  // as uuid
    grade: number;
    description: string;
}