import { Component, OnDestroy, OnInit } from '@angular/core';
import { DepartmentRS } from '../../../../../data/model/dto/rs/DepartmentRS';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../../../core/services/toast/toast.service';
import { DepartmentServiceImpl } from '../../../../../data/services/department/department.service';
import { NavigationService } from '../../../../../core/services/navigation/navigation.service';
import { Address } from '../../../../../data/model/dto/common/Address';
import {
  getFriendlyEnumName,
  getUserFriendlyAddress,
} from '../../../../../utils';
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
import {
  TestType,
  testTypeDropdownItems,
} from 'src/app/data/model/common/TestType';
import { PrescriptionRQ } from 'src/app/data/model/dto/rq/PrescriptionRQ';
import { TreatmentRQ } from 'src/app/data/model/dto/rq/TreatmentRQ';
import { TreatmentRS } from 'src/app/data/model/dto/rs/TreatmentRS';
import { TreatmentService } from 'src/app/data/services/treatment/treatment.service';
import { DropdownItem } from 'src/app/data/model/common/DropdownItem';
import { PrescriptionRS } from 'src/app/data/model/dto/rs/PrescriptionRS';
import { ReferralRS } from 'src/app/data/model/dto/rs/ReferralRS';

@Component({
  selector: 'app-doctors-appointment-view',
  templateUrl: './doctors-appointment-view.component.html',
  styleUrls: ['./doctors-appointment-view.component.scss'],
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

  protected testTypesDropdownItems = testTypeDropdownItems;

  protected addReferral = false;
  protected selectedTestType?: DropdownItem;
  protected referral: ReferralRQ = {} as ReferralRQ;

  protected addPrescription = false;
  protected prescription: PrescriptionRQ = {} as PrescriptionRQ;

  protected addOnlyReferral = false;
  protected addOnlyPrescription = false;

  protected showTreatment = false;
  protected modifyingComments = false;

  protected uploadingData = false;
  protected newComment: string = '';

  protected treatmentRQ: TreatmentRQ = {
    appointmentId: this.appointment?.id,
  } as TreatmentRQ;

  protected prescriptionRS?: PrescriptionRS;
  protected referralRS?: ReferralRS;

  protected selectedMedTest?: MedicalTestRS;

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
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.appointmentService
        .getAppointmentById(params['id'])
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: (appointment) => {
            this.appointment = appointment;
            this.newComment = this.appointment.comments;
            this.appointment.appointmentDate = new Date(
              appointment.appointmentDate
            );
            this.loadMedTestsList();

            if (!!appointment.treatmentRS.prescriptionId) {
              this.treatmentService
                .getPrescriptionById(appointment.treatmentRS.prescriptionId)
                .subscribe({
                  next: (prescription) => {
                    this.prescriptionRS = prescription;
                  },
                  error: (err) =>
                    this.toastService.showError(
                      'Error during fetching appointment. Try again later.'
                    ),
                });
            }

            if (!!appointment.treatmentRS.referralId) {
              this.treatmentService
                .getReferralById(appointment.treatmentRS.referralId)
                .subscribe({
                  next: (referral) => {
                    this.referralRS = referral;
                  },
                  error: (err) =>
                    this.toastService.showError(
                      'Error during fetching appointment. Try again later.'
                    ),
                });
            }

            this.departmentService
              .getDepartmentById(this.appointment.departmentId)
              .pipe(takeUntil(this.ngUnsubscribe))
              .subscribe({
                next: (dept) => {
                  this.department = dept;
                },
                error: (err) => {
                  this.toastService.showError(
                    'Error during fetching appointments department. Try again later.'
                  );
                },
              });
          },
          error: (err) => {
            this.toastService.showError(
              'Error during fetching appointment. Try again later.'
            );
          },
        });
    });
  }

  public loadMedTestsList() {
    this.loadingList = true;
    this.medTestsListActive = true;
    this.appointmentsListActive = false;
    this.medicalTestsService
      .getAllByPatientId(this.appointment!.patientRS.patientUUID)
      .subscribe({
        next: (medTests) => {
          this.medTestsList = medTests;
        },
        error: (err) => {
          this.toastService.showError(
            'Something went wrong while loading medical tests for patient, try again later.'
          );
          this.loadingList = false;
        },
        complete: () => (this.loadingList = false),
      });
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
    this.appointmentService
      .getAppointmentsByPatientId(this.appointment!.patientRS.patientUUID)
      .subscribe({
        next: (appointments) => {
          this.appointmentsList = appointments;
        },
        error: (err) => {
          this.toastService.showError(
            'Something went wrong while loading appointments for patient, try again later.'
          );
          this.loadingList = false;
        },
        complete: () => (this.loadingList = false),
      });
  }

  public addTreatment() {
    if (!!this.appointment) {
      this.uploadingData = true;
      this.treatmentRQ.appointmentId = this.appointment?.id;
      this.treatmentService
        .addTreatmentToAppointment(this.treatmentRQ)
        .subscribe({
          next: (treatment) => {
            this.appointment!.treatmentRS = treatment;
            if (this.addReferral) {
              this.addNewReferral();
              this.checkIfTreatmentIsUploaded();
            }
            if (this.addPrescription) {
              this.addNewPrescription();
              this.checkIfTreatmentIsUploaded();
            }
            this.toastService.showSuccess(
              'Treatment has been successfully saved!'
            );
            this.checkIfTreatmentIsUploaded();
          },
          error: (err) => {
            this.toastService.showError(
              'Something went wrong while sending patients treatment, check if all fields are correctly filled.'
            );
            this.uploadingData = false;
            this.showAddTreatmentVisible = false;
          },
        });
    }
  }

  private checkIfTreatmentIsUploaded() {
    if (
      !this.addReferral &&
      !this.addPrescription &&
      !!this.appointment?.treatmentRS
    ) {
      this.uploadingData = false;
      this.showAddTreatmentVisible = false;
      this.toastService.showSuccess('All data has been successfully saved!');
      setTimeout(() => window.location.reload(), 1000);
    }
  }

  addNewReferral() {    
    if (
      !!this.referral &&
      !!this.referral.expirationDate &&
      !!this.appointment?.treatmentRS &&
      !!this.selectedTestType
    ) {
      this.uploadingData = true;

      this.referral.expirationDate = new Date(this.referral.expirationDate);
      this.referral.testType = this.selectedTestType.code as TestType;
      this.referral.treatmentId = this.appointment?.treatmentRS.id;
      this.treatmentService.addReferral(this.referral).subscribe({
        next: (prescription) => {
          this.toastService.showSuccess(
            'Prescription has been successfully saved!'
          );
          this.addOnlyReferral = false;
          this.checkIfTreatmentIsUploaded();
          setTimeout(() => window.location.reload(), 1000);
        },
        error: (err) => {
          this.toastService.showError(
            'Something went wrong while uploading referral for patient, try again later.'
          );
          this.addOnlyReferral = false;
          this.uploadingData = false;
          this.showAddTreatmentVisible = false;
        },
      });
    }
    else {
      this.toastService.showWarn("Can't add referral, check if all provided data is correct.")
      this.uploadingData = false;      
      this.showAddTreatmentVisible = false;
    }
  }

  addNewPrescription() {
    if (
      !!this.prescription &&
      !!this.appointment?.treatmentRS &&
      !!this.prescription.code &&
      !!this.prescription.description &&
      !!this.prescription.expirationDate
    ) {
      this.uploadingData = true;      

      this.prescription.expirationDate = new Date(
        this.prescription.expirationDate
      );
      this.prescription.treatmentId = this.appointment?.treatmentRS.id;
      this.treatmentService.addPrescription(this.prescription).subscribe({
        next: (prescription) => {
          this.toastService.showSuccess(
            'Prescription has been successfully saved!'
          );
          this.addOnlyPrescription = false;
          this.checkIfTreatmentIsUploaded();
          setTimeout(() => window.location.reload(), 1000);
        },
        error: (err) => {
          this.toastService.showError(
            'Something went wrong while uploading prescription for patient, try again later.'
          );
          this.addOnlyPrescription = false;
          this.uploadingData = false;
          this.showAddTreatmentVisible = false;
        },
      });
    }
    else {
      this.toastService.showWarn("Can't add prescription, check if all provided data is correct.")
      this.uploadingData = false;      
      this.showAddTreatmentVisible = false;
    }
  }

  updateAppointmentComments() {
    if (!!this.appointment && this.appointment) {
      this.uploadingData = true;
      this.appointmentService
        .addCommentToAppointment(this.appointment.id, this.newComment)
        .subscribe({
          next: (appointment) => {
            console.log('appointmnasdfasds fasfds afdsf ad');

            this.appointment = appointment;
            this.appointment.appointmentDate = new Date(
              appointment.appointmentDate
            );
            this.modifyingComments = false;
            this.uploadingData = false;
            this.toastService.showSuccess(
              `Comments has been successfully sent.`
            );
          },
          error: (err) => {
            this.toastService.showError(
              'Something went wrong while uploading comments for appointment, try again later.'
            );
            this.modifyingComments = false;
            this.uploadingData = false;
          },
        });
    }
  }

  checkReferralCreated() {
    return !!this.appointment?.treatmentRS.referralId;
  }

  checkPrescriptionCreated() {
    return !!this.appointment?.treatmentRS.prescriptionId;
  }

  public getDoctorName(doctor: DoctorRS) {
    return `${doctor.firstname} ${doctor.lastname}`;
  }

  public getPatientName(patient: PatientRS) {
    return `${patient.firstName} ${patient.lastName}`;
  }

  public getFriendlyAddress(address: Address) {
    return `${getUserFriendlyAddress(address)}, ${address.city}`;
  }

  public getEnumValueName(constEnumValue: string) {
    return getFriendlyEnumName(constEnumValue);
  }

  public linkToGoogleMaps(address: Address) {
    const baseUrl = 'https://www.google.com/maps/search/'; //wybickiego+14+krakow
    const linkEnd =
      getUserFriendlyAddress(address).replace('/', '+').replace(' ', '+') +
      '+' +
      address.city;

    return new URL(baseUrl + linkEnd);
  }

  public friendlyDateTime(date: Date) {
    return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
  }

  public tabColor(item: AppointmentRS) {
    if (!item.treatmentRS) {
      return 'info';
    } else {
      return 'success';
    }
  }

  public getTabText(item: AppointmentRS) {
    if (!item.treatmentRS) {
      return 'Scheduled';
    } else {
      return 'Finished';
    }
  }

  public getAppointmentStatusBasedOnTreatment() {
    if (this.appointment?.status === AppointmentStatus.CANCELED) {
      return 'Canceled';
    }
    if (!this.appointment!.treatmentRS) {
      return 'Scheduled';
    }
    if (!!this.appointment!.treatmentRS) {
      return 'Done';
    }
    return 'Scheduled';
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
    return !this.appointment!.treatmentRS;
  }

  isCanceled() {
    return this.appointment?.status == AppointmentStatus.CANCELED;
  }

  isFinished() {
    return !!this.appointment!.treatmentRS;
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
    this.appointmentService
      .removeAppointmentById(this.appointment?.id!)
      .subscribe({
        next: (data) => {
          this.toastService.showSuccess('Deleted successfully.');
          setTimeout(() => {
            this.navigation.toAppointments();
          }, 300);
        },
        error: (err) => {
          this.toastService.showError(
            'Error during deleting appointment. Try again later.'
          );
        },
      });
  }
}
