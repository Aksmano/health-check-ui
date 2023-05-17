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
import { MedicalTestsService } from 'src/app/data/services/medical-test/medical-tests.service';
import { MedicalTestRS } from 'src/app/data/model/dto/rs/MedicalTestRS';
import { TestStatus } from 'src/app/data/model/common/TestStatus';
import { ReferralRQ } from 'src/app/data/model/dto/rq/ReferralRQ';
import { ONE_WEEK_IN_MILLISECONDS } from '../../../utils/TimeUtils';
import { TestType, testTypeDropdownItems } from 'src/app/data/model/common/TestType';
import { PrescriptionRQ } from 'src/app/data/model/dto/rq/PrescriptionRQ';
import { TreatmentRQ } from 'src/app/data/model/dto/rq/TreatmentRQ';
import { TreatmentRS } from 'src/app/data/model/dto/rs/TreatmentRS';
import { TreatmentService } from 'src/app/data/services/treatment/treatment.service';

@Component({
  selector: 'app-doctors-appointment-view',
  templateUrl: './doctors-appointment-view.component.html',
  styleUrls: ['./doctors-appointment-view.component.scss']
})
export class DoctorsAppointmentViewComponent {
  public appointment?: AppointmentRS;
  protected department?: DepartmentRS;
  protected showDateVisible: boolean = false;
  protected showAddTreatmentVisible = false;

  protected medTestsList: MedicalTestRS[] = [];
  protected appointmentsList: AppointmentRS[] = [];
  protected appointmentsListActive = true;
  protected medTestsListActive = false;
  protected loadingList = true;

  protected testTypesDropdownItems = testTypeDropdownItems

  protected addReferral = false;
  protected referral: ReferralRQ = {
    expirationDate: new Date(ONE_WEEK_IN_MILLISECONDS * 4)
  } as ReferralRQ

  protected addPrescription = false;
  protected prescription: PrescriptionRQ = {} as PrescriptionRQ

  protected uploadingTreatment = false;

  protected treatmentRQ: TreatmentRQ = {
    appointmentId: this.appointment?.id
  } as TreatmentRQ;
  protected treatmentRS?: TreatmentRS;

  private readonly ngUnsubscribe = new Subject();

  constructor(
    protected readonly navigationService: NavigationService,
    private readonly appointmentService: AppointmentService,
    private readonly doctorService: DoctorServiceImpl,
    private readonly treatmentService: TreatmentService,
    private readonly medicalTestsService: MedicalTestsService,
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
            this.loadMedTestsList()

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

  public loadMedTestsList() {
    this.loadingList = true;
    this.medTestsListActive = true;
    this.appointmentsListActive = false;
    this.medicalTestsService.getAllByPatientId(this.appointment!.patientRS.patientUUID)
      .subscribe({
        next: medTests => {
          this.medTestsList = medTests;
        },
        error: err => {
          this.toastService.showError("Something went wrong while loading medical tests for patient, try again later.")
          this.loadingList = false;
        },
        complete: () => this.loadingList = false
      })
  }

  getMessageByTestType(testStatus: string): string {
    if (testStatus == TestStatus.DONE.toString()) {
      return 'Done';
    }
    if (testStatus == TestStatus.WAITING_FOR_RESULT.toString()) {
      return 'Waiting for results';
    }
    return 'Nor performed';
  }

  getSeverityForMT(testStatus: string): string {
    if (testStatus == TestStatus.DONE.toString()) {
      return 'success';
    }
    if (testStatus == TestStatus.WAITING_FOR_RESULT.toString()) {
      return 'warning';
    }
    return 'danger';
  }

  public loadAppointmentsList() {
    this.loadingList = true;
    this.medTestsListActive = false;
    this.appointmentsListActive = true;
    this.appointmentService.getAppointmentsByPatientId(this.appointment!.patientRS.patientUUID)
      .subscribe({
        next: appointments => {
          this.appointmentsList = appointments;
        },
        error: err => {
          this.toastService.showError("Something went wrong while loading appointments for patient, try again later.")
          this.loadingList = false;
        },
        complete: () => this.loadingList = false
      })
  }

  public addTreatment() {
    if (!!this.appointment) {
      this.uploadingTreatment = true;
      this.treatmentRQ.appointmentId = this.appointment?.id
      this.treatmentService.addTreatmentToAppointment(this.treatmentRQ)
        .subscribe({
          next: treatment => {
            this.treatmentRS = treatment;
            if (this.addReferral) {
              this.treatmentService.addReferral(this.referral)
                .subscribe({
                  next: referral => {
                    this.toastService.showSuccess("Referral has been successfully saved!")
                    this.checkIfTreatmentIsUploaded()
                  },
                  error: err => {
                    this.toastService.showError("Something went wrong while uploading referral for patient, try again later.")
                    this.uploadingTreatment = false;
                    this.showAddTreatmentVisible = false;
                  }
                })
            }
            if (this.addPrescription) {
              this.treatmentService.addPrescription(this.prescription)
                .subscribe({
                  next: prescription => {
                    this.toastService.showSuccess("Prescription has been successfully saved!")
                    this.checkIfTreatmentIsUploaded()
                  },
                  error: err => {
                    this.toastService.showError("Something went wrong while uploading prescription for patient, try again later.")
                    this.uploadingTreatment = false;
                    this.showAddTreatmentVisible = false;
                  }
                })
            }
            this.toastService.showSuccess("Treatment has been successfully saved!")
            this.checkIfTreatmentIsUploaded()
          },
          error: err => {
            this.toastService.showError("Something went wrong while sending patients treatment, check if all fields are correctly filled.")
            this.uploadingTreatment = false;
            this.showAddTreatmentVisible = false;
          }
        })
    }
  }

  private checkIfTreatmentIsUploaded() {
    if (!this.addReferral && !this.addPrescription && !!this.treatmentRS) {
      this.uploadingTreatment = false;
      this.showAddTreatmentVisible = false;
      this.toastService.showSuccess("All data has been successfully saved!")
    }
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
