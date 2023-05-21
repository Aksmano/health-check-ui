import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastService } from "../../../../../core/services/toast/toast.service";
import { NavigationService } from "../../../../../core/services/navigation/navigation.service";
import { ActivatedRoute } from "@angular/router";
import { TestStatus } from "../../../../../data/model/common/TestStatus";
import { Specialization, specializationDropdownList } from 'src/app/data/model/common/Specialization';
import { AppointmentService } from 'src/app/data/services/appointment/appointment.service';
import { AppointmentRS } from 'src/app/data/model/dto/rs/AppointmentRS';
import { AppointmentStatus } from 'src/app/data/model/dto/common/AppointmentStatus';
import { DoctorRS } from 'src/app/data/model/dto/rs/employeeRS/DoctorRS';
import { PatientRS } from 'src/app/data/model/dto/rs/PatientRS';
import { TreatmentRS } from 'src/app/data/model/dto/rs/TreatmentRS';
import { ONE_DAY_IN_MILISECONDS, ONE_WEEK_IN_MILLISECONDS } from '../../../utils/TimeUtils';

@Component({
  selector: 'app-scheduled-appointments-table',
  templateUrl: './scheduled-appointments-table.component.html',
  styleUrls: ['./scheduled-appointments-table.component.scss']
})
export class ScheduledAppointmentsTableComponent {
  protected selectedTestType: any;
  protected startDate: Date | undefined;
  protected endDate: Date | undefined;
  protected visits: AppointmentRS[] | undefined;
  protected isProcessOngoing: boolean = true;
  // protected visits: AppointmentRS[] = [
  //   {
  //     appointmentDate: new Date(),
  //     comments: '',
  //     departmentId: 1257,
  //     doctorRS: {
  //       specialization: Specialization.ANESTHESIA
  //     } as DoctorRS,
  //     id: 1,
  //     patientRS: {
  //       firstName: "Pat",
  //       lastName: "ient"
  //     } as PatientRS,
  //     status: AppointmentStatus.CANCELED,
  //     treatmentRS: {} as TreatmentRS
  //   }
  // ]
  public testTypes: any[] | undefined;
  protected departmentId: number | undefined;

  protected weekBeginning: Date = this.getWeekBeginning()
  protected weekEnd: Date = new Date(this.getWeekBeginning().getTime() + ONE_DAY_IN_MILISECONDS * 6)

  constructor(private readonly toastService: ToastService,
    protected readonly navigationService: NavigationService,
    private readonly appointmentService: AppointmentService,
    private readonly activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.testTypes = specializationDropdownList;
    this.activatedRoute.params.subscribe(params => {
      this.departmentId = parseInt(params['id']);
      this.getAppointments();
    });
  }

  private getAppointments() {
    if (!!this.departmentId) {
      this.isProcessOngoing = true
      this.appointmentService.getAppointmentsByDepartmentId(this.departmentId, {
        startDateTime: this.weekBeginning,
        endDateTime: new Date(this.weekBeginning.getTime() + ONE_WEEK_IN_MILLISECONDS)
      }).subscribe({
        next: data => {
          this.visits = data;
          console.log(this.visits)
        },
        error: error => {
          this.toastService.showError('Error during fetching tests for department.')
        },
        complete: () => this.isProcessOngoing = false
      })
    }
  }

  incrementCurrentDate() {
    this.weekBeginning = new Date(this.weekBeginning.getTime() + ONE_WEEK_IN_MILLISECONDS);
    this.weekEnd = new Date(this.weekBeginning.getTime() + ONE_DAY_IN_MILISECONDS * 6)
    this.getAppointments()
  }

  decrementCurrentDate() {
    this.weekBeginning = new Date(this.weekBeginning.getTime() - ONE_WEEK_IN_MILLISECONDS);
    this.weekEnd = new Date(this.weekBeginning.getTime() + ONE_DAY_IN_MILISECONDS * 6)
    this.getAppointments()
  }

  getMessageByTestType(appointment: AppointmentRS): string {
    if (!appointment.treatmentRS) {
      return 'Scheduled';
    }
    else return 'Finished';
  }

  getSeverity(appointment: AppointmentRS): string {
    if (!appointment.treatmentRS) {
      return 'info';
    }
    else return 'success';
  }

  deleteAppointment(id: number) {
    this.isProcessOngoing = true;
    this.appointmentService.removeAppointmentById(id)
      .subscribe({
        next: res => {
          this.toastService.showSuccess("Appointment was deleted successfully!")
          this.appointmentService.getAppointmentsByDepartmentId(this.departmentId!).subscribe({
            next: data => {
              this.visits = data;
              console.log(this.visits)
            },
            error: error => {
              this.toastService.showError('Error during fetching tests for department.')
            },
            complete: () => this.isProcessOngoing = false
          })
        },
        error: error => {
          this.toastService.showError("Something went wrong while downloading appointment, try again later.")
          this.isProcessOngoing = false
        }
      })
  }

  getWeekBeginning() {
    const d = new Date();
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }
}