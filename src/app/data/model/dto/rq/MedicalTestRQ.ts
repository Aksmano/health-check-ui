import { TestType } from "../../entities/MedicalOffer";

export interface MedicalTestRQ {
    departmentId: number;
    patientUUID: string;  // as uuid
    type: TestType;
    testDate: Date;
}