import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MedicalTestRQ} from "../../model/dto/rq/MedicalTestRQ";
import {MedicalTestRS} from "../../model/dto/rs/MedicalTestRS";

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
    return this.httpClient.post<MedicalTestRS>(this.baseUrl, medicalTestRq);
  }

  getMedicalTestById(id: number): Observable<MedicalTestRS> {
    return this.httpClient.get<MedicalTestRS>(this.baseUrl + "/id/" + id);
  }

  getMedicalTestResult(testId: number): Observable<Blob> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.httpClient.get(this.baseUrl + "/result/" + testId, {headers: headers, responseType: 'blob'});
  }
}
