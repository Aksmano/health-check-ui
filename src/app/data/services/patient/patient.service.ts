import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ReceptionistRS} from '../../model/dto/rs/employeeRS/ReceptionistRS';
import {ReceptionistRQ} from '../../model/dto/rq/employeeRQ/ReceptionistRQ';
import {PatientRS} from '../../model/dto/rs/PatientRS';
import {PatientDataRQ} from '../../model/dto/rq/PatientDataRQ';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  public readonly baseUrl = '/api/domain-service/patients';

  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  getPatientData(): Observable<PatientRS> {
    return this.httpClient.get<PatientRS>(this.baseUrl);
  }

  getPatientByUUID(uuid: string): Observable<PatientRS> {
    return this.httpClient.get<PatientRS>(`${this.baseUrl}/${uuid}`);
  }

  updatePatientData(patientData: PatientDataRQ): Observable<PatientRS> {
    return this.httpClient.put<PatientRS>(this.baseUrl, { ...patientData });
  }

  hasPatientDataUpdated(uuid: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}/is-updated/${uuid}`);
  }

  //TODO add query params
  getPatients(page: number, firstName?: string, lastName?: string, phoneNumber?: string): Observable<PatientRS[]> {
    return this.httpClient.get<PatientRS[]>(`${this.baseUrl}/all`);
  }
}
