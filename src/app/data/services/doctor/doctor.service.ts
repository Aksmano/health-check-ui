import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mockResponse, objectToHttpParams } from 'src/app/utils';
import { DoctorRS } from '../../model/dto/rs/employeeRS/DoctorRS';
import { DoctorService } from './DoctorService';
import { DoctorRQ } from '../../model/dto/rq/employeeRQ/DoctorRQ';
import { RatingRS } from '../../model/dto/rs/RatingRS';
import { DoctorsCriteriaQP } from '../../model/dto/qp/DoctorsCriteriaQP';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { UserType } from '../../model/common/UserType';

@Injectable({
  providedIn: 'root'
})
export class DoctorServiceImpl implements DoctorService {
  public readonly baseUrl = '/api/domain-service/doctors';
  private userProfile: KeycloakProfile = {};

  constructor(
    private readonly httpClient: HttpClient,
    private readonly keycloak: KeycloakService
  ) {
    this.keycloak.loadUserProfile()
      .then(profile => this.userProfile = profile);
  }

  getAllDoctors(
    doctorsCriteria: DoctorsCriteriaQP = {} as DoctorsCriteriaQP
  ): Observable<DoctorRS[]> {
    // const doctorsParams = objectToHttpParams(doctorsCriteria);

    return this.httpClient.get<DoctorRS[]>(this.baseUrl, { params: { ...doctorsCriteria } });
  }

  getDoctorById(uuid: string): Observable<DoctorRS> {
    return this.httpClient.get<DoctorRS>(`${this.baseUrl}/${uuid}`);
  }

  createDoctor(doctorData: DoctorRQ): Observable<DoctorRS> {
    return this.httpClient.post<DoctorRS>(this.baseUrl, { ...doctorData });
  }

  deleteDoctorById(uuid: string): Observable<string> {
    return this.httpClient.delete<string>(`${this.baseUrl}/${uuid}`);
  }

  getDoctorRatesById(uuid: string): Observable<RatingRS[]> {
    return this.httpClient.get<RatingRS[]>(`${this.baseUrl}/${uuid}/rates`);
  }
}
