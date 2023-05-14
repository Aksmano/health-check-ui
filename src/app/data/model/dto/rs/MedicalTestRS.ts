import {TestStatus} from "../../common/TestStatus";
import {TestType} from "../../common/TestType";
import {TestResultRS} from "./TestResultRS";
import {PatientRS} from "@data/model/dto/rs/PatientRS";

export interface MedicalTestRS {
  id: number;
  testStatus: TestStatus;
  departmentId: number;
  departmentName: string;
  patientUUID: string;  // as uuid
  type: TestType;
  medicalTestResultId: number;
  testDateTime: Date;
  patient: PatientRS;
}
