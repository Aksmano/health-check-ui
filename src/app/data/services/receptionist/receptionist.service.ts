import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReceptionistRS } from '../../model/dto/rs/employeeRS/ReceptionistRS';
import { Observable } from 'rxjs';
import { ReceptionistRQ } from '../../model/dto/rq/employeeRQ/ReceptionistRQ';

@Injectable({
  providedIn: 'root'
})
export class ReceptionistService {

  public readonly baseUrl = '/api/domain-service/receptionists';

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  public getReceptionistByUUID(uuid: string): Observable<ReceptionistRS> {
    return this.httpClient.get<ReceptionistRS>(`${this.baseUrl}/${uuid}`);
  }

  public getReceptionists(): Observable<ReceptionistRS[]> {
    return this.httpClient.get<ReceptionistRS[]>(this.baseUrl);
  }

  public createReceptionist(receptionistData: ReceptionistRQ): Observable<ReceptionistRS> {
    return this.httpClient.post<ReceptionistRS>(this.baseUrl, { ...receptionistData });
  }

  public deleteReceptionistByUUID(uuid: string): Observable<string> {
    return this.httpClient.delete<string>(`${this.baseUrl}/${uuid}`);
  }
}
