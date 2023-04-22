import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TreatmentRS } from '../../model/dto/rs/TreatmentRS';

interface TreatmentRepository {
  getTreatmentById(id: number): Observable<TreatmentRS>;
  getTreatmentsByDoctorId(id: number): Observable<TreatmentRS[]>;
  getTreatmentsByPatientId(id: number): Observable<TreatmentRS[]>;
  getTreatmentsByDate(id: number): Observable<TreatmentRS[]>;
}

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  constructor() { }
}
