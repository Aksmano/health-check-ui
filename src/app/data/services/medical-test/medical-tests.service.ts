import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { MedicalTestRQ } from "../../model/dto/rq/MedicalTestRQ";
import { MedicalTestRS } from "../../model/dto/rs/MedicalTestRS";
import { ScheduleRQ } from '../../model/dto/rq/ScheduleRQ';
import { toJavaLocalDateTime } from 'src/app/utils';

@Injectable({
  providedIn: 'root'
})
export class MedicalTestsService {

  public readonly baseUrl: string = "/api/domain-service/medical-tests";

  constructor(private httpClient: HttpClient) {
  }

  createMedicalTestVisit(medicalTestRq: MedicalTestRQ): Observable<MedicalTestRS> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post<MedicalTestRS>(this.baseUrl, { ...medicalTestRq });
  }

  getMedicalTestById(id: number): Observable<MedicalTestRS> {
    return this.httpClient.get<MedicalTestRS>(this.baseUrl + "/id/" + id);
  }

  getMedicalTestsByDepartmentId(departmentId: number, criteria?: ScheduleRQ): Observable<MedicalTestRS[]> {
    let httpParams = new HttpParams();

    if (!!criteria) {
      httpParams = httpParams.append('startDateTime', toJavaLocalDateTime(criteria.startDateTime))
      httpParams = httpParams.append('endDateTime', toJavaLocalDateTime(criteria.endDateTime))
    }

    return this.httpClient.get<MedicalTestRS[]>(this.baseUrl + "/department/" + departmentId, { params: httpParams });
  }

  getMedicalTestsByDepartmentIdWithCriteria(departmentId: number, criteria?: ScheduleRQ): Observable<MedicalTestRS[]> {
    let httpParams = new HttpParams();

    if (!!criteria) {
      httpParams = httpParams.append('startDateTime', toJavaLocalDateTime(criteria.startDateTime))
      httpParams = httpParams.append('endDateTime', toJavaLocalDateTime(criteria.endDateTime))
    }

    return this.httpClient.get<MedicalTestRS[]>(this.baseUrl + "/department/" + departmentId, { params: httpParams });
  }

  getMedicalTestResult(testId: number): Observable<Blob> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.httpClient.get(this.baseUrl + "/result/" + testId, { headers: headers, responseType: 'blob' });
  }

  deleteMedicalTest(testId: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + "/" + testId);
  }

  getAllByPatientId(patientId: string): Observable<MedicalTestRS[]> {
    console.log(this.baseUrl + '/patient/' + patientId);
    return this.httpClient.get<MedicalTestRS[]>(this.baseUrl + '/patient/' + patientId);
  }

  addResult(testId: number, file: Blob): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/pdf');
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<MedicalTestRS>(this.baseUrl + '/result/' + testId, formData);
  }
}
