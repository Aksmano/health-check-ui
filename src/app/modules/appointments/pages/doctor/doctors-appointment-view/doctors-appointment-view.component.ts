import { Component, OnDestroy, OnInit } from '@angular/core';
import { DepartmentRS } from "../../../../../data/model/dto/rs/DepartmentRS";
import { Subject, Subscription, takeUntil } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { ToastService } from "../../../../../core/services/toast/toast.service";
import { DepartmentServiceImpl } from "../../../../../data/services/department/department.service";
import { NavigationService } from "../../../../../core/services/navigation/navigation.service";
import { Address } from "../../../../../data/model/dto/common/Address";
import { getFriendlyEnumName, getUserFriendlyAddress } from "../../../../../utils";
import { AppointmentService } from 'src/app/data/services/appointment/appointment.service';
import { AppointmentRS } from 'src/app/data/model/dto/rs/AppointmentRS';
import { AppointmentStatus } from 'src/app/data/model/dto/common/AppointmentStatus';
import { DoctorRS } from 'src/app/data/model/dto/rs/employeeRS/DoctorRS';
import { DoctorServiceImpl } from 'src/app/data/services/doctor/doctor.service';
import { PatientRS } from 'src/app/data/model/dto/rs/PatientRS';

@Component({
  selector: 'app-doctors-appointment-view',
  templateUrl: './doctors-appointment-view.component.html',
  styleUrls: ['./doctors-appointment-view.component.scss']
})
export class DoctorsAppointmentViewComponent {
  public appointment?: AppointmentRS;
  protected department?: DepartmentRS;
  protected showDateVisible: boolean = false;

  private readonly ngUnsubscribe = new Subject();

  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly doctorService: DoctorServiceImpl,
    private readonly departmentService: DepartmentServiceImpl,
    private readonly toastService: ToastService,
    private readonly route: ActivatedRoute,
    private readonly navigation: NavigationService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.appointmentService.getAppointmentById(params['id'])
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: appointment => {
            this.appointment = appointment;
            this.appointment.appointmentDate = new Date(appointment.appointmentDate)
            
            this.departmentService.getDepartmentById(this.appointment.departmentId)
              .pipe(takeUntil(this.ngUnsubscribe))
              .subscribe({
                next: dept => {
                  this.department = dept
                },
                error: err => {
                  this.toastService.showError('Error during fetching appointments department. Try again later.')
                }
              })
          },
          error: err => {
            this.toastService.showError('Error during fetching appointment. Try again later.')
          }
        })
    })
  }

  public getDoctorName(doctor: DoctorRS) {
    return `${doctor.firstname} ${doctor.lastname}`
  }

  public getPatientName(patient: PatientRS) {
    return `${patient.firstName} ${patient.lastName}`
  }

  public getFriendlyAddress(address: Address) {
    return `${getUserFriendlyAddress(address)}, ${address.city}`;
  }

  public getEnumValueName(constEnumValue: string) {
    return getFriendlyEnumName(constEnumValue);
  }

  public linkToGoogleMaps(address: Address) {
    const baseUrl = "https://www.google.com/maps/search/";  //wybickiego+14+krakow
    const linkEnd = getUserFriendlyAddress(address).replace('/', '+').replace(' ', '+') + '+' + address.city;

    return new URL(baseUrl + linkEnd);
  }

  public friendlyDateTime(date: Date) {
    return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
  }

  public tabColor(status: AppointmentStatus) {
    switch (status) {
      case AppointmentStatus.FINISHED:
        return "success";
      case AppointmentStatus.SCHEDULED:
        return "info";
      case AppointmentStatus.CANCELED:
        return "warning";
    }
  }

  // private removeSubscriptions(): void {
  //   if (this.testSubscription) {
  //     this.testSubscription.unsubscribe();
  //   }
  //   if (this.pathSubscription) {
  //     this.pathSubscription.unsubscribe();
  //   }
  // }

  isScheduled() {
    return this.appointment?.status == AppointmentStatus.SCHEDULED;
  }

  isCanceled() {
    return this.appointment?.status == AppointmentStatus.CANCELED;
  }

  isFinished() {
    return this.appointment?.status == AppointmentStatus.FINISHED;
  }

  getResult() {
    // this.medicalTestService.getMedicalTestResult(this.medicalTest?.id!)
    //   .subscribe(data => {
    //     const url = window.URL.createObjectURL(data);
    //     window.open(url);
    //   }, error => {
    //     this.toastService.showError('Error during fetching results.')
    //   })
  }

  deleteMedicalTest() {
    this.appointmentService.removeAppointmentById(this.appointment?.id!)
      .subscribe({
        next: data => {
          this.toastService.showSuccess('Deleted successfully.')
          setTimeout(() => {
            this.navigation.toAppointments();
          }, 300);
        }, error: err => {
          this.toastService.showError('Error during deleting appointment. Try again later.')
        }
      })
  }
}
