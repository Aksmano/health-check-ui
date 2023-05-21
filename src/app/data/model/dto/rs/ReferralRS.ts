import { TestType } from "../../common/TestType";
import { TreatmentRS } from "./TreatmentRS";

export interface ReferralRS {
    id: number;
    treatment: TreatmentRS;
    testType: string;
    expirationDate: Date;
}