import { Injectable } from '@angular/core';
import { ScheduleService } from './ScheduleService';
import { Observable } from 'rxjs';
import { DayOfWeek } from '../../model/common/DayOfWeek';
import { ScheduleCriteriaQP } from '../../model/dto/qp/schedule/ScheduleCriteriaQP';
import { ScheduleRQ } from '../../model/dto/rq/ScheduleRQ';
import { ScheduleRS } from '../../model/dto/rs/schedules/ScheduleRS';
import { SchedulesAppointmentsRS } from '../../model/dto/rs/schedules/SchedulesAppointmentsRS';
import { HttpClient } from '@angular/common/http';
import { objectToHttpParams, toJavaLocalDateTime } from 'src/app/utils';
import { SchedulesAppointmentsCriteriaQP } from '../../model/dto/qp/schedule/SchedulesAppointmentsCriteriaQP';

@Injectable({
  providedIn: 'root'
})
export class ScheduleServiceImpl implements ScheduleService {
  public readonly baseUrl = '/api/domain-service/schedules';

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getSchedules(
    uuid: string,
    scheduleCriteria: ScheduleCriteriaQP = {} as ScheduleCriteriaQP
  ): Observable<ScheduleRS[]> {
    const params: { [key: string]: string } = {}

    if (!!scheduleCriteria.startDateTime)
      params['startDateTime'] = scheduleCriteria.startDateTime;
    if (!!scheduleCriteria.endDateTime)
      params['endDateTime'] = scheduleCriteria.endDateTime;

    return this.httpClient.get<ScheduleRS[]>(`${this.baseUrl}/${uuid}`, { params: params });
  }

  getSchedulesWithAppointments(
    uuid: string,
    scheduleCriteria: SchedulesAppointmentsCriteriaQP = {} as SchedulesAppointmentsCriteriaQP
  ): Observable<SchedulesAppointmentsRS> {
    const params: { [key: string]: string } = {}

    if (!!scheduleCriteria.startDateTime)
      params['startDateTime'] = scheduleCriteria.startDateTime;
    if (!!scheduleCriteria.endDateTime)
      params['endDateTime'] = scheduleCriteria.endDateTime;

    return this.httpClient.get<SchedulesAppointmentsRS>(`${this.baseUrl}/with-appointments/${uuid}`, { params: params });
  }

  addSchedules(schedules: ScheduleRQ[]): Observable<ScheduleRS[]> {
    const validSchedules = schedules.map(sch => {
      return {
        startDateTime: toJavaLocalDateTime(sch.startDateTime),
        endDateTime: toJavaLocalDateTime(sch.endDateTime),
      }
    })

    return this.httpClient.post<ScheduleRS[]>(this.baseUrl, validSchedules);
  }

  addSchedulesByDoctorId(id: string, schedules: ScheduleRQ[]): Observable<ScheduleRS[]> {
    console.log(schedules)
    return this.httpClient.post<ScheduleRS[]>(`${this.baseUrl}/doctor/${id}`, schedules);
  }
}
