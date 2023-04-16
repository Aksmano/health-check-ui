import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from '../../model/entities/Schedule';

interface SchedulesRepository {
  getSchedulesByDoctorId(id: number): Observable<Schedule[]>;
}

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {

  constructor() { }
}
