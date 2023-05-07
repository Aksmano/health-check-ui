import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {MedicalTestRQ} from "../../model/dto/rq/MedicalTestRQ";
import {MedicalTestRS} from "../../model/dto/rs/MedicalTestRS";

@Injectable({
  providedIn: 'root'
})
export class MedicalTestService {

  public readonly baseUrl: string = "/api/domain-service/medical-tests";

  constructor(private httpClient: HttpClient) {
  }

  createMedicalTestVisit(medicalTestRq: MedicalTestRQ): Observable<MedicalTestRS> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post<MedicalTestRS>(this.baseUrl, medicalTestRq);
  }
}
