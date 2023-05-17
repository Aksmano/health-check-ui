import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TreatmentRS } from '../../model/dto/rs/TreatmentRS';
import { HttpClient } from '@angular/common/http';
import { TreatmentRQ } from '../../model/dto/rq/TreatmentRQ';
import { UpdateTreatmentRQ } from '../../model/dto/rq/UpdateTreatmentRQ';
import { ReferralRQ } from '../../model/dto/rq/ReferralRQ';
import { PrescriptionRQ } from '../../model/dto/rq/PrescriptionRQ';
import { toJavaLocalDateTime } from 'src/app/utils';

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

  public readonly baseUrl = '/api/domain-service/treatments';

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  addTreatmentToAppointment(treatmentRQ: TreatmentRQ): Observable<TreatmentRS> {
    return this.httpClient.post<TreatmentRS>(this.baseUrl, { ...treatmentRQ })
  }

  updateTreatment(treatmentId: number, updateTreatmentRQ: UpdateTreatmentRQ): Observable<TreatmentRS> {
    return this.httpClient.put<TreatmentRS>(`${this.baseUrl}/${treatmentId}`, { ...updateTreatmentRQ });
  }

  removeTreatmentByAppointmentId(appointmentId: number): Observable<string> {
    return this.httpClient.delete<string>(`${this.baseUrl}/appointment/${appointmentId}`)
  }

  deleteTreatment(id: number): Observable<string> {
    return this.httpClient.delete<string>(`${this.baseUrl}/${id}`)
  }

  addReferral(referralRQ: ReferralRQ): Observable<ReferralRQ> {
    const referralToSend = {
      ...referralRQ,
      expirationDate: toJavaLocalDateTime(referralRQ.expirationDate)
    };

    return this.httpClient.post<ReferralRQ>(`${this.baseUrl}/referral`, { ...referralToSend })
  }

  addPrescription(prescriptionRQ: PrescriptionRQ): Observable<PrescriptionRQ> {
    const prescriptionToSend = {
      ...prescriptionRQ,
      expirationDate: toJavaLocalDateTime(prescriptionRQ.expirationDate)
    };

    return this.httpClient.post<PrescriptionRQ>(`${this.baseUrl}/prescription`, { ...prescriptionToSend })
  }
}
