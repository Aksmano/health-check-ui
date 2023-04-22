import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mockResponse } from 'src/app/utils';
import { Observable } from 'rxjs';
import { PatientDataRQ } from '../../model/dto/rq/PatientDataRQ';
import { PatientRS } from '../../model/dto/rs/PatientRS';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  public postPatientInfo(patientData: PatientDataRQ): Observable<PatientRS | null> {
    return mockResponse({
      dataToReturn: null//patientData.patient
    });
  }

  public getPatientInfo(patientUUID: string, mockPatient?: PatientRS): Observable<PatientRS | null> {
    return mockResponse({
      dataToReturn: mockPatient ?? null
    });
  }
}
