import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { UserInfo } from 'src/app/core/user-info';
import { Specialization } from 'src/app/data/model/common/Specialization';
import { TestStatus } from 'src/app/data/model/common/TestStatus';
import { Address } from 'src/app/data/model/dto/common/Address';
import { AppointmentStatus } from 'src/app/data/model/dto/common/AppointmentStatus';
import { AppointmentRS } from 'src/app/data/model/dto/rs/AppointmentRS';
import { DepartmentRS } from 'src/app/data/model/dto/rs/DepartmentRS';
import { MedicalTestRS } from 'src/app/data/model/dto/rs/MedicalTestRS';
import { PatientRS } from 'src/app/data/model/dto/rs/PatientRS';
import { PrescriptionRS } from 'src/app/data/model/dto/rs/PrescriptionRS';
import { ReferralRS } from 'src/app/data/model/dto/rs/ReferralRS';
import { TreatmentRS } from 'src/app/data/model/dto/rs/TreatmentRS';
import { DoctorRS } from 'src/app/data/model/dto/rs/employeeRS/DoctorRS';
import { AppointmentService } from 'src/app/data/services/appointment/appointment.service';
import { DepartmentServiceImpl } from 'src/app/data/services/department/department.service';
import { DoctorServiceImpl } from 'src/app/data/services/doctor/doctor.service';
import { MedicalTestsService } from 'src/app/data/services/medical-test/medical-tests.service';
import { TreatmentService } from 'src/app/data/services/treatment/treatment.service';
import { getFriendlyEnumName, getUserFriendlyAddress } from 'src/app/utils';

@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.scss']
})
export class AppointmentViewComponent implements OnInit {
  public appointment?: AppointmentRS;
  protected department?: DepartmentRS;
  // public appointment?: AppointmentRS = {
  //   appointmentDate: new Date("2023-04-30T08:00:00"),
  //   doctorRS: { "doctorUUID": "bb1862ea-bb52-4ede-847c-320a36c97130", "firstname": "Adam", "lastname": "Adminowski", "specialization": Specialization.ANESTHESIA, "departmentId": 497, "rate": 0, "rateNumber": 0 },
  //   patientRS: {} as PatientRS,
  //   comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vehicula vel lectus non lacinia. Duis vehicula posuere accumsan. Sed posuere vestibulum dolor gravida fringilla. Etiam commodo eget est bibendum consequat. Pellentesque luctus, massa in pellentesque lacinia, ex magna sodales nibh, ac vestibulum lacus odio eu sem. Mauris pulvinar accumsan urna eu congue. Quisque feugiat erat eu mi convallis aliquet. Integer sit amet placerat sapien.',
  //   departmentId: 1257,
  //   id: 1243,
  //   status: AppointmentStatus.SCHEDULED,
  //   treatmentRS: {} as TreatmentRS
  // };
  // protected department?: DepartmentRS = { "id": 1257, "name": "Testing department", "address": { "country": "PL", "city": "Krakow", "street": "Elegancka", "houseNumber": "17", "apartmentNumber": "10", "postalCode": "12-123", "post": "krakow somewhere", "county": "krakowski", "province": "Malopolska" } };
  protected showDateVisible: boolean = false;

  protected medTestsList: MedicalTestRS[] = [];
  protected appointmentsList: AppointmentRS[] = [];
  protected appointmentsListActive = true;
  protected medTestsListActive = false;
  protected loadingList = true;

  protected prescriptionRS?: PrescriptionRS;
  protected referralRS?: ReferralRS;

  protected showTreatment = false;

  private readonly ngUnsubscribe = new Subject();

  constructor(
    protected readonly navigationService: NavigationService,
    private readonly appointmentService: AppointmentService,
    private readonly medicalTestsService: MedicalTestsService,
    private readonly treatmentService: TreatmentService,
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

            if (!!appointment.treatmentRS.prescriptionId) {
              this.treatmentService.getPrescriptionById(appointment.treatmentRS.prescriptionId)
                .subscribe({
                  next: prescription => {
                    this.prescriptionRS = prescription;
                  },
                  error: err => this.toastService.showError('Error during fetching appointment. Try again later.')
                })
            }

            if (!!appointment.treatmentRS.referralId) {
              this.treatmentService.getReferralById(appointment.treatmentRS.referralId)
                .subscribe({
                  next: referral => {
                    this.referralRS = referral;
                  },
                  error: err => this.toastService.showError('Error during fetching appointment. Try again later.')
                })
            }

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

      this.loadMedTestsList()
    })
  }

  public loadAppointmentsList() {
    this.loadingList = true;
    this.medTestsListActive = false;
    this.appointmentsListActive = true;
    this.appointmentService.getAllPatientAppointments(UserInfo.profile?.id!)
      .subscribe({
        next: appointments => {
          this.appointmentsList = appointments;
          console.log(appointments);

        },
        error: err => {
          this.toastService.showError("Something went wrong while loading appointments for patient, try again later.")
          this.loadingList = false;
        },
        complete: () => this.loadingList = false
      })
  }

  public loadMedTestsList() {
    this.loadingList = true;
    this.medTestsListActive = true;
    this.appointmentsListActive = false;
    console.log('ddddd');

    this.medicalTestsService.getAllByPatientId(UserInfo.profile?.id!)
      .subscribe({
        next: medTests => {
          this.medTestsList = medTests;
          this.loadingList = false
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

  public getDoctorName(doctor: DoctorRS) {
    return `${doctor.firstname} ${doctor.lastname}`
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
    return `${new Date(date).toLocaleDateString()}, ${new Date(date).toLocaleTimeString()}`;
  }

  public tabColor(item: AppointmentRS) {
    if (!item.treatmentRS)
      return 'info'
    else return 'success'
  }

  public getTabText(item: AppointmentRS) {
    if (!item.treatmentRS)
      return 'Scheduled'
    else return 'Finished'
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
    return !this.appointment?.treatmentRS;
  }

  isCanceled() {
    return this.appointment?.status == AppointmentStatus.CANCELED;
  }

  isFinished() {
    return !!this.appointment?.treatmentRS;
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
