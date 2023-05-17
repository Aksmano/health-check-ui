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
import { UserInfo } from 'src/app/core/user-info';

@Component({
  selector: 'app-doctor-scheduled-appointments-table',
  templateUrl: './scheduled-appointments-table.component.html',
  styleUrls: ['./scheduled-appointments-table.component.scss']
})
export class DoctorScheduledAppointmentsTableComponent {
  protected selectedTestType: any;
  protected startDate: Date | undefined;
  protected endDate: Date | undefined;
  protected visits: AppointmentRS[] | undefined;
  protected isProcessOngoing: boolean = true;
  protected doctorUUID: string = UserInfo.profile?.id!;
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
  protected doctorId: string | undefined;

  constructor(private readonly toastService: ToastService,
    protected readonly navigationService: NavigationService,
    private readonly appointmentService: AppointmentService,
    private readonly activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.testTypes = specializationDropdownList;
    this.activatedRoute.params.subscribe(params => {
      this.doctorId = params['doctorId'];

      this.appointmentService.getAppointmentsByDoctorId(this.doctorId!).subscribe({
        next: data => {
          this.visits = data;
        },
        error: error => {
          this.toastService.showError('Error during fetching tests for department.')
        },
        complete: () => this.isProcessOngoing = false
      })
    }
    );
  }

  ngOnDestroy(): void {
  }

  getMessageByTestType(testStatus: string): string {
    if (testStatus == AppointmentStatus.FINISHED.toString()) {
      return 'Finished';
    }
    if (testStatus == AppointmentStatus.SCHEDULED.toString()) {
      return 'Scheduled';
    }
    return 'Canceled';
  }

  getSeverity(testStatus: string): string {
    if (testStatus == AppointmentStatus.FINISHED.toString()) {
      return 'success';
    }
    if (testStatus == AppointmentStatus.SCHEDULED.toString()) {
      return 'warning';
    }
    return 'danger';
  }

  deleteAppointment(id: number) {
    this.isProcessOngoing = true;
    this.appointmentService.removeAppointmentById(id)
      .subscribe({
        next: res => {
          this.toastService.showSuccess("Appointment was deleted successfully!")
          this.appointmentService.getAppointmentsByDoctorId(this.doctorId!).subscribe({
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
}
