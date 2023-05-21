import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../../model/entities/Appointment';
import { AppointmentRS } from '../../model/dto/rs/AppointmentRS';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppointmentRQ } from '../../model/dto/rq/AppointmentRQ';
import { Schedule } from '../../model/dto/common/Schedule';
import { objectToHttpParams, toJavaLocalDateTime } from 'src/app/utils';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  public readonly baseUrl: string = '/api/domain-service/appointments'

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getAppointmentById(id: number): Observable<AppointmentRS> {
    return this.httpClient.get<AppointmentRS>(`${this.baseUrl}/${id}`);
  }

  createAppointment(appointmentRQ: AppointmentRQ): Observable<AppointmentRS> {
    return this.httpClient.post<AppointmentRS>(this.baseUrl, { ...appointmentRQ });
  }

  getAppointmentsByDoctorId(doctorUUID: string, criteria?: Schedule): Observable<AppointmentRS[]> {
    let httpParams = new HttpParams();

    if (!!criteria) {
      httpParams = httpParams.append('startDateTime', toJavaLocalDateTime(criteria.startDateTime))
      httpParams = httpParams.append('endDateTime', toJavaLocalDateTime(criteria.endDateTime))
    }
    
    return this.httpClient.get<AppointmentRS[]>(`${this.baseUrl}/doctor/${doctorUUID}`, { params: httpParams });
  }

  getAppointmentsByPatientId(patientUUID: string, criteria?: Schedule): Observable<AppointmentRS[]> {
    let httpParams = new HttpParams();

    if (!!criteria) {
      httpParams = httpParams.append('startDateTime', toJavaLocalDateTime(criteria.startDateTime))
      httpParams = httpParams.append('endDateTime', toJavaLocalDateTime(criteria.endDateTime))
    }

    return this.httpClient.get<AppointmentRS[]>(`${this.baseUrl}/patient/${patientUUID}`, { params: httpParams });
  }

  getAllPatientAppointments(patientUUID: string): Observable<AppointmentRS[]> {
    return this.httpClient.get<AppointmentRS[]>(`${this.baseUrl}/all-patient-appointments/${patientUUID}`);
  }

  getAppointmentsByDepartmentId(departmentId: number, criteria?: Schedule): Observable<AppointmentRS[]> {
    let httpParams = new HttpParams();

    if (!!criteria) {
      httpParams = httpParams.append('startDateTime', toJavaLocalDateTime(criteria.startDateTime))
      httpParams = httpParams.append('endDateTime', toJavaLocalDateTime(criteria.endDateTime))
    }

    return this.httpClient.get<AppointmentRS[]>(`${this.baseUrl}/department/${departmentId}`, { params: httpParams });
  }

  removeAppointmentById(id: number): Observable<string> {
    return this.httpClient.delete<string>(`${this.baseUrl}/${id}`);
  }

  addCommentToAppointment(id: number, comment: string): Observable<AppointmentRS> {
    return this.httpClient.put<AppointmentRS>(`${this.baseUrl}/${id}`, comment)
  }
}
