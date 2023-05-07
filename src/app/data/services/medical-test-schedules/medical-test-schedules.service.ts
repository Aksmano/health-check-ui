import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {MedicalTestSchedulesRS} from "../../model/dto/rs/schedules/MedicalTestSchedulesRS";
import {objectToHttpParams} from "../../../utils";
import {MedicalTestScheduleCriteriaQP} from "../../../modules/medical-tests/qp/medical-test-schedule-criteria-qp";
import {Service} from "../Service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {TestType} from "../../model/common/TestType";
import {ScheduleRS} from "../../model/dto/rs/schedules/ScheduleRS";

@Injectable({
  providedIn: 'root'
})
export class MedicalTestSchedulesService implements Service {
  public readonly baseUrl = '/api/domain-service/medical-tests-schedules'

  constructor(private readonly httpClient: HttpClient) {
  }

  getTestTestSchedules(medicalTestScheduleCriteria: MedicalTestScheduleCriteriaQP = {} as MedicalTestScheduleCriteriaQP
  ): Observable<MedicalTestSchedulesRS> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("departmentId", medicalTestScheduleCriteria.departmentId);
    queryParams = queryParams.append("testType", medicalTestScheduleCriteria.testType);

    return this.httpClient.get<MedicalTestSchedulesRS>(this.baseUrl, {params: queryParams});
  }

}
