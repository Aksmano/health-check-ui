import { TestType } from "../../common/TestType";

export interface ReferralRQ {
    treatmentId: number;
    testType: TestType;
    expirationDate: Date;
}