import { TestType } from "../../entities/MedicalOffer";

export interface ReferralRQ {
    treatmentId: number;
    testType: TestType;
    expirationDate: Date;
}