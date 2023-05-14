import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { UserInfo } from 'src/app/core/user-info';
import { AppointmentStatus } from 'src/app/data/model/dto/common/AppointmentStatus';
import { AppointmentRS } from 'src/app/data/model/dto/rs/AppointmentRS';
import { DoctorRS } from 'src/app/data/model/dto/rs/employeeRS/DoctorRS';
import { AppointmentService } from 'src/app/data/services/appointment/appointment.service';
import { DepartmentServiceImpl } from 'src/app/data/services/department/department.service';

@Component({
  selector: 'app-patient-all-appointments',
  templateUrl: './patient-all-appointments.component.html',
  styleUrls: ['./patient-all-appointments.component.scss']
})
export class PatientAllAppointmentsComponent implements OnInit {
  protected appointments?: AppointmentRS[];
  protected allDataLoaded = false;

  private readonly ngUnsubscribe = new Subject();
  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly toastService: ToastService,
    private readonly navigation: NavigationService
  ) { }

  ngOnInit(): void {
    if (!!UserInfo.profile) {
      this.appointmentService.getAppointmentsByPatientId(UserInfo.profile.id!)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: appointments => {
            this.appointments = appointments.sort((a, b) => {
              return new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime()
            });
            console.log(this.appointments);
          },
          error: err => {
            this.toastService.showError('Error during downloading appointments. Try again later.')
          }
        })
    }
  }

  getDocNames(doctor: DoctorRS) {
    return `${doctor.firstname} ${doctor.lastname}`
  }

  getSeverity(status: AppointmentStatus) {
    switch (status) {
      case AppointmentStatus.FINISHED:
        return 'success';
      case AppointmentStatus.CANCELED:
        return 'danger';
      case AppointmentStatus.SCHEDULED:
        return 'warning';
    }
  }

  getMessageByTestType(status: AppointmentStatus) {
    switch (status) {
      case AppointmentStatus.FINISHED:
        return 'Done';
      case AppointmentStatus.CANCELED:
        return 'Canceled';
      case AppointmentStatus.SCHEDULED:
        return 'Scheduled';
    }
  }

  goToAppointment(id: number) {
    this.navigation.toAppointmentById(id)
  }
}
