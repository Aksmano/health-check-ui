import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mockResponse } from 'src/app/utils';
import { Patient } from '../../model/entities/Patient';
import { Observable } from 'rxjs';
import { PatientDataDTO } from '../../model/dto/rq/PatientDataDTO';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  public postPatientInfo(patientData: PatientDataDTO): Observable<Patient | null> {
    return mockResponse({
      dataToReturn: patientData.patient
    });
  }

  public getPatientInfo(keycloakId: string, mockPatient?: Patient): Observable<Patient | null> {
    return mockResponse({
      dataToReturn: mockPatient ?? null
    });
  }
}
