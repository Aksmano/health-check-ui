import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../../model/entities/Appointment';

interface AppointmentRepository {
  getAllAppointments(): Observable<Appointment[]>;
  getAppointmentById(id: number): Observable<Appointment>;
  getAppointmentsByDoctorId(id: number): Observable<Appointment[]>;
  getAppointmentsByPatientId(id: number): Observable<Appointment[]>;
  getAppointmentsByDepartmentId(id: number): Observable<Appointment[]>;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor() { }
}
