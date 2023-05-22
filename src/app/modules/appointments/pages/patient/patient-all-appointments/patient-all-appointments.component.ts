import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { UserInfo } from 'src/app/core/user-info';
import { AppointmentStatus } from 'src/app/data/model/dto/common/AppointmentStatus';
import { AppointmentRS } from 'src/app/data/model/dto/rs/AppointmentRS';
import { TreatmentRS } from 'src/app/data/model/dto/rs/TreatmentRS';
import { DoctorRS } from 'src/app/data/model/dto/rs/employeeRS/DoctorRS';
import { AppointmentService } from 'src/app/data/services/appointment/appointment.service';
import { DepartmentServiceImpl } from 'src/app/data/services/department/department.service';
import { ONE_WEEK_IN_MILLISECONDS } from '../../../utils/TimeUtils';

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
      this.appointmentService.getAllPatientAppointments(UserInfo.profile.id!)
        // , {
        //   startDateTime: new Date(new Date().getTime() - ONE_WEEK_IN_MILLISECONDS * 10),
        //   endDateTime: new Date(new Date().getTime() + ONE_WEEK_IN_MILLISECONDS  * 10)
        // })
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: appointments => {
            this.appointments = appointments.sort((a, b) => {
              return new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime()
            });
            console.log(this.appointments);
          },
          error: err => {
            if (err.status === 404)
              this.toastService.showWarn("You don't have any appointments for this moment.")
            else
              this.toastService.showError('Error during downloading appointments. Try again later.')

              this.appointments = [];
          }
        })
    }
  }

  getDocNames(doctor: DoctorRS) {
    return `${doctor.firstname} ${doctor.lastname}`
  }

  getSeverity(treatmentRS: TreatmentRS | undefined) {
    if (!!treatmentRS)
      return 'success';
    else
      return 'waring';
  }

  getMessageByTestType(treatmentRS: AppointmentStatus) {
    console.log(treatmentRS);

    if (!!treatmentRS)
      return 'Done';
    else
      return 'Scheduled';
  }

  goToAppointment(id: number) {
    this.navigation.toAppointmentById(id)
  }
}
