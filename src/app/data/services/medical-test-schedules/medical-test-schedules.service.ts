import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {MedicalTestSchedulesRS} from "../../model/dto/rs/schedules/MedicalTestSchedulesRS";
import {objectToHttpParams} from "../../../utils";
import {MedicalTestScheduleCriteriaQP} from "../../../modules/medical-tests/qp/medical-test-schedule-criteria-qp";
import {Service} from "../Service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {TestType} from "../../model/common/TestType";
import {ScheduleRS} from "../../model/dto/rs/schedules/ScheduleRS";
import {MedicalTestRQ} from "../../model/dto/rq/MedicalTestRQ";
import {MedicalTestRS} from "../../model/dto/rs/MedicalTestRS";
import {MedicalTestScheduleRQ} from "../../model/dto/rq/MedicalTestScheduleRQ";

@Injectable({
  providedIn: 'root'
})
export class MedicalTestSchedulesService implements Service {
  public readonly baseUrl = '/api/domain-service/medical-tests-schedules'

  constructor(private readonly httpClient: HttpClient) {
  }

  getMedicalTestSchedules(medicalTestScheduleCriteria: MedicalTestScheduleCriteriaQP = {} as MedicalTestScheduleCriteriaQP
  ): Observable<MedicalTestSchedulesRS> {
    console.log(medicalTestScheduleCriteria)
    let queryParams = this.createQueryParams(medicalTestScheduleCriteria);

    return this.httpClient.get<MedicalTestSchedulesRS>(this.baseUrl, {params: queryParams});
  }

  addMedicalTestSchedule(medicalTestScheduleRQ: MedicalTestScheduleRQ): Observable<ScheduleRS[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(medicalTestScheduleRQ)
    return this.httpClient.post<ScheduleRS[]>(this.baseUrl, {...medicalTestScheduleRQ})
  }

  createQueryParams(medicalTestScheduleCriteria: MedicalTestScheduleCriteriaQP): HttpParams {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("departmentId", medicalTestScheduleCriteria.departmentId);
    queryParams = queryParams.append("testType", medicalTestScheduleCriteria.testType);

    queryParams = !!medicalTestScheduleCriteria.startDateTime
      ? queryParams.append("startDateTime", medicalTestScheduleCriteria.startDateTime)
      : queryParams;
    queryParams = !!medicalTestScheduleCriteria.endDateTime
      ? queryParams.append("endDateTime", medicalTestScheduleCriteria.endDateTime)
      : queryParams;
    return queryParams;
  }
}
