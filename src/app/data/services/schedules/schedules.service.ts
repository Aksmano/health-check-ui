import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScheduleRS } from '../../model/dto/rs/schedules/ScheduleRS';

interface SchedulesRepository {
  getSchedulesByDoctorId(id: number): Observable<ScheduleRS[]>;
}

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {

  constructor() { }
}
