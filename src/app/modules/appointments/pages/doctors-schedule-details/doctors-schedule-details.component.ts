import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subject, Subscription, takeUntil } from "rxjs";
import { KeycloakService } from "keycloak-angular";
import { Address } from 'src/app/data/model/dto/common/Address';
import { getFriendlyEnumName, getUserFriendlyAddress } from 'src/app/utils';
import { SchedulesAppointmentsRS } from 'src/app/data/model/dto/rs/schedules/SchedulesAppointmentsRS';
import { DepartmentRS } from 'src/app/data/model/dto/rs/DepartmentRS';
import { AppointmentDateRS } from 'src/app/data/model/dto/rs/schedules/AppointmentDateRS';
import { AppointmentScheduleDay, dayNames } from '../../models/appointment-schedule-day';
import { ScheduleServiceImpl } from 'src/app/data/services/schedule/schedule.service';
import { AppointmentService } from 'src/app/data/services/appointment/appointment.service';
import { DepartmentServiceImpl } from 'src/app/data/services/department/department.service';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { ScheduleRS } from 'src/app/data/model/dto/rs/schedules/ScheduleRS';
import { AppointmentRQ } from 'src/app/data/model/dto/rq/AppointmentRQ';
import { DoctorRS } from 'src/app/data/model/dto/rs/employeeRS/DoctorRS';
import { UserInfo } from 'src/app/core/user-info';
import { DoctorServiceImpl } from 'src/app/data/services/doctor/doctor.service';

@Component({
  selector: 'app-doctors-schedule-details',
  templateUrl: './doctors-schedule-details.component.html',
  styleUrls: ['./doctors-schedule-details.component.scss']
})
export class DoctorsScheduleDetailsComponent {
  // protected appointmentSchedules: SchedulesAppointmentsRS = {
  //   schedules: [
  //     {
  //       startDateTime: new Date("2023-04-28T08:00:00"),
  //       endDateTime: new Date("2023-04-28T16:00:00")
  //     },
  //     {
  //       startDateTime: new Date("2023-04-29T08:00:00"),
  //       endDateTime: new Date("2023-04-29T16:00:00")
  //     },
  //     {
  //       startDateTime: new Date("2023-04-30T08:00:00"),
  //       endDateTime: new Date("2023-04-30T16:00:00")
  //     },
  //     {
  //       startDateTime: new Date("2023-05-01T08:00:00"),
  //       endDateTime: new Date("2023-05-01T16:00:00")
  //     },
  //     {
  //       startDateTime: new Date("2023-05-02T08:00:00"),
  //       endDateTime: new Date("2023-05-02T16:00:00")
  //     },
  //     {
  //       startDateTime: new Date("2023-05-03T08:00:00"),
  //       endDateTime: new Date("2023-05-03T16:00:00")
  //     }, {
  //       startDateTime: new Date("2023-05-04T08:00:00"),
  //       endDateTime: new Date("2023-05-04T16:00:00")
  //     }
  //   ],
  //   appointments: [
  //     {
  //       startDateTime: new Date("2023-04-28T08:00:00"),
  //       endDateTime: new Date("2023-04-28T08:15:00")
  //     },
  //     {
  //       startDateTime: new Date("2023-04-28T09:00:00"),
  //       endDateTime: new Date("2023-04-28T09:15:00")
  //     },
  //     {
  //       startDateTime: new Date("2023-04-28T15:45:00"),
  //       endDateTime: new Date("2023-04-28T16:00:00")
  //     },
  //     {
  //       startDateTime: new Date("2023-04-30T08:00:00"),
  //       endDateTime: new Date("2023-04-30T08:15:00")
  //     }
  //   ]
  // };

  public allDataLoaded: boolean = false;

  protected appointmentSchedules?: SchedulesAppointmentsRS;
  protected department?: DepartmentRS;
  protected doctor?: DoctorRS;

  protected chosenDate?: AppointmentDateRS;
  protected showDateVisible: boolean = false;
  protected schedulesByDay?: AppointmentScheduleDay[];
  private schedulesSubscription?: Subscription;
  private departmentSubscription?: Subscription;
  private pathSubscription?: Subscription;
  private resultSubscription?: Subscription;
  private readonly endDateDaysNumber = 30;
  private readonly oneDayInMilliseconds = 1000 * 60 * 60 * 24;

  private readonly ngUnsubscribe = new Subject();

  constructor(private route: ActivatedRoute,
    private readonly scheduleService: ScheduleServiceImpl,
    private readonly appointmentService: AppointmentService,
    private readonly departmentService: DepartmentServiceImpl,
    private readonly keycloakService: KeycloakService,
    private readonly navigationService: NavigationService,
    private readonly doctorService: DoctorServiceImpl,
    private readonly toastService: ToastService) {
  }

  ngOnInit() {
    this.pathSubscription = this.route.params.subscribe(params => {
      this.doctorService.getDoctorById(params['id'])
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: doctor => {
            this.doctor = doctor;

            this.departmentService.getDepartmentById(doctor.departmentId)
              .subscribe(data => {
                this.department = data;
              })

            this.scheduleService.getSchedulesWithAppointments(doctor.doctorUUID, {
              startDateTime: this.getCurrentLocalDateTime(),
              endDateTime: this.getLocalDateTimeFromNow(this.endDateDaysNumber),
            })
              .subscribe(data => {
                this.appointmentSchedules = data;
                console.log(this.appointmentSchedules);
                for (let assignedSchedule of this.appointmentSchedules.appointments) {
                  assignedSchedule.startDateTime = new Date(assignedSchedule.startDateTime);
                  assignedSchedule.endDateTime = new Date(assignedSchedule.endDateTime);
                }
                this.schedulesByDay = this.getSchedulesByDay(this.appointmentSchedules.schedules);
                this.allDataLoaded = true;
              })
          },
          error: err => {
            this.toastService.showError("Something went wrong while loading doctors data, try again later")
          }
        })
    });
  }

  public getFriendlyAddress(address: Address) {
    return `${getUserFriendlyAddress(address)}, ${address.city}`;
  }

  public getTestTypeName() {
    const typeName = this.doctor?.specialization ?? "";
    return getFriendlyEnumName(typeName);
  }

  public linkToGoogleMaps(address: Address) {
    const baseUrl = "https://www.google.com/maps/search/";
    const linkEnd = getUserFriendlyAddress(address).replace('/', '+').replace(' ', '+') + '+' + address.city;

    return new URL(baseUrl + linkEnd);
  }

  private getSchedulesByDay(schedules: ScheduleRS[]): AppointmentScheduleDay[] {
    let schedulesByDay = new Map<string, ScheduleRS[]>();
    for (let schedule of schedules) {
      schedule.startDateTime = new Date(schedule.startDateTime)
      schedule.endDateTime = new Date(schedule.endDateTime)
      let date = schedule.startDateTime.toISOString().slice(0, 10);
      let schedulesBySpecificDay = schedulesByDay.get(date);
      console.log(date)
      if (!schedulesBySpecificDay) {
        schedulesBySpecificDay = [];
        schedulesByDay.set(date, schedulesBySpecificDay);
      }
      for (let testDate of this.addSchedulesBetweenDates(schedule)) {
        schedulesBySpecificDay.push(testDate)
      }
    }
    let testScheduleDays = []

    for (let key of schedulesByDay.keys()) {
      let schedules = schedulesByDay.get(key);
      if (schedules) {
        let anyOfSchedules = schedules[0].startDateTime;
        let entry = {
          day: key,
          dayName: dayNames[anyOfSchedules.getDay()],
          schedules: this.checkAssignment(schedules),
        } as AppointmentScheduleDay
        testScheduleDays.push(entry);
      }
    }
    console.log(testScheduleDays, schedulesByDay)
    return testScheduleDays;
  }

  private addSchedulesBetweenDates(schedule: ScheduleRS): ScheduleRS[] {
    let testSchedules = [];
    let startDateTimeOfTest = schedule.startDateTime;
    while (true) {
      let endDateTimeOfTest = this.addMinutes(startDateTimeOfTest, 15);
      testSchedules.push({ startDateTime: startDateTimeOfTest, endDateTime: endDateTimeOfTest } as ScheduleRS);
      startDateTimeOfTest = endDateTimeOfTest;
      if (startDateTimeOfTest >= schedule.endDateTime) {
        break;
      }
    }
    return testSchedules;
  }

  private addMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60000);
  }

  private getCurrentLocalDateTime() {
    return (new Date()).toISOString().substring(0, 19);
  }

  private getLocalDateTimeFromNow(days: number) {
    return new Date((new Date()).getTime() + this.oneDayInMilliseconds * days).toISOString().substring(0, 19)
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  unsubscribeAll() {
    if (this.schedulesSubscription) {
      this.schedulesSubscription.unsubscribe();
    }
    if (this.departmentSubscription) {
      this.departmentSubscription.unsubscribe();
    }
    if (this.pathSubscription) {
      this.pathSubscription.unsubscribe();
    }
    if (this.resultSubscription) {
      this.resultSubscription.unsubscribe();
    }
  }

  isBusy(schedule: ScheduleRS): boolean {
    if (this.appointmentSchedules) {

      let date = this.appointmentSchedules.appointments
        .map((assignedSchedule) => assignedSchedule.startDateTime)
        .find(assigned => assigned.getTime() === schedule.startDateTime.getTime());

      console.log(date)
      return !!date;
    } else return false;
  }

  checkAssignment(schedules: ScheduleRS[]): AppointmentDateRS[] {
    return schedules.map(schedule => {
      return {
        startDateTime: schedule.startDateTime,
        endDateTime: schedule.endDateTime,
        busy: this.isBusy(schedule)
      } as AppointmentDateRS
    });
  }

  showChosenDate(schedule: AppointmentDateRS) {
    if (!this.showDateVisible) {
      this.chosenDate = schedule;
      this.showDateVisible = true;
    }
  }

  submitMedicalTest() {
    if (!!this.doctor && !!UserInfo.profile) {
      this.keycloakService.getKeycloakInstance()
        .loadUserProfile()
        .then(profile => {
          let visitRQ = {
            doctorUUID: this.doctor?.doctorUUID,
            patientUUID: UserInfo.profile?.id,
            appointmentDateTime: this.addMinutes(this.chosenDate?.startDateTime!, 2 * 60)
            // departmentId: this.department?.id,
            // patientUUID: profile.id!,
            // type: TestType[this.testType as keyof typeof TestType],
            // testDate: this.addMinutes(this.chosenDate?.startDateTime!, 2 * 60)
          } as AppointmentRQ;

          console.log(visitRQ)
          this.resultSubscription = this.appointmentService.createAppointment(visitRQ)
            .subscribe({
              next: data => {
                this.toastService.showSuccess('Visit created');
                this.navigationService.toAppointmentById(data.id)
              },
              error: err => {
                console.log(err)
                this.toastService.showError('Error during creating visit. Try again later');
              },
              complete: () => {
              }
            })
        });
    }
  }
}