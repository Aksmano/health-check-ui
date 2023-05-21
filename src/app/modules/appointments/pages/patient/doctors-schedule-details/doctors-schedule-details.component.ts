import { Component } from '@angular/core';
import { MedicalTestSchedulesRS } from "../../../../../data/model/dto/rs/schedules/MedicalTestSchedulesRS";
import { DepartmentRS } from "../../../../../data/model/dto/rs/DepartmentRS";
import { TestDateRS } from "../../../../../data/model/dto/rs/schedules/TestDateRS";
import { AppointmentScheduleDayRec } from "../../../utils/models/appointment-schedule-day";
import { BehaviorSubject, Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import {
  MedicalTestSchedulesService
} from "../../../../../data/services/medical-test-schedules/medical-test-schedules.service";
import { MedicalTestsService } from "../../../../../data/services/medical-test/medical-tests.service";
import { DepartmentServiceImpl } from "../../../../../data/services/department/department.service";
import { KeycloakService } from "keycloak-angular";
import { NavigationService } from "../../../../../core/services/navigation/navigation.service";
import { ToastService } from "../../../../../core/services/toast/toast.service";
import { Address } from "../../../../../data/model/dto/common/Address";
import { getFriendlyEnumName, getUserFriendlyAddress } from "../../../../../utils";
import { ScheduleRS } from "../../../../../data/model/dto/rs/schedules/ScheduleRS";
import {
  getAllDaysInWeekByDate,
  getFirstDayOfWeek,
  getTheLastDayOfWeek,
  ONE_WEEK_IN_MILLISECONDS
} from "../../../utils/TimeUtils";
import { TestType } from "../../../../../data/model/common/TestType";
import { MedicalTestRQ } from "../../../../../data/model/dto/rq/MedicalTestRQ";
import { PatientRS } from "../../../../../data/model/dto/rs/PatientRS";
import { AppointmentService } from 'src/app/data/services/appointment/appointment.service';
import { ScheduleServiceImpl } from 'src/app/data/services/schedule/schedule.service';
import { DoctorServiceImpl } from 'src/app/data/services/doctor/doctor.service';
import { SchedulesAppointmentsRS } from 'src/app/data/model/dto/rs/schedules/SchedulesAppointmentsRS';
import { AppointmentRQ } from 'src/app/data/model/dto/rq/AppointmentRQ';
import { DoctorRS } from 'src/app/data/model/dto/rs/employeeRS/DoctorRS';
import { DropdownItem } from 'src/app/data/model/common/DropdownItem';
import { UserInfo } from 'src/app/core/user-info';
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
  protected specialization?: string;

  protected chosenDate?: TestDateRS;
  protected showDateVisible: boolean = false;
  protected schedulesByDay?: AppointmentScheduleDayRec[];
  private schedulesSubscription?: Subscription;
  private departmentSubscription?: Subscription;
  private pathSubscription?: Subscription;
  private resultSubscription?: Subscription;
  protected currentDate: Date | undefined;
  protected currentDate$ = new BehaviorSubject(new Date());
  protected patient: PatientRS | undefined;
  protected doctor?: DoctorRS;
  protected doctorsDropdownData: DropdownItem[] = [];
  protected selectedDoctor?: DropdownItem;

  constructor(private route: ActivatedRoute,
    private readonly scheduleService: ScheduleServiceImpl,
    private readonly appointmentService: AppointmentService,
    private readonly departmentService: DepartmentServiceImpl,
    private readonly doctorService: DoctorServiceImpl,
    private readonly keycloakService: KeycloakService,
    private readonly navigationService: NavigationService,
    private readonly toastService: ToastService) {
  }

  ngOnInit() {
    this.pathSubscription = this.route.params.subscribe(params => {
      this.unsubscribeAll();
      this.doctorService.getDoctorById(params['id'])
        .subscribe({
          next: doctor => {
            this.doctor = doctor
            this.departmentSubscription = this.departmentService.getDepartmentById(doctor.departmentId)
              .subscribe(data => {
                this.department = data;
                this.onDoctorSelect()
              })
          },
          error: err => this.toastService.showError("Something went wrong while loading doctor, please try again later.")
        })
      this.currentDate$.subscribe(data => {
        this.currentDate = data;
        //   this.schedulesByDay = undefined
        //   this.schedulesSubscription = this.scheduleService.getSchedulesWithAppointments(this.selectedDoctor!.code, {
        //     startDateTime: getFirstDayOfWeek(this.currentDate),
        //     endDateTime: getTheLastDayOfWeek(this.currentDate)
        //   })
        //     .subscribe(data => {
        //       this.handleData(data);
        //       this.schedulesByDay = this.getSchedulesByDay(this.appointmentSchedules!.schedules, this.appointmentSchedules!.appointments);
        //     })
      });
    }
    );
  }

  private handleData(data: SchedulesAppointmentsRS) {
    this.appointmentSchedules = data;
    console.log(this.appointmentSchedules);
    for (let assignedSchedule of this.appointmentSchedules.appointments) {
      assignedSchedule.startDateTime = new Date(assignedSchedule.startDateTime);
      assignedSchedule.endDateTime = new Date(assignedSchedule.endDateTime);
    }
    for (let schedule of this.appointmentSchedules.schedules) {
      schedule.startDateTime = new Date(schedule.startDateTime);
      schedule.endDateTime = new Date(schedule.endDateTime);
    }
  }

  public onDoctorSelect() {
    if (!!this.doctor) {
      this.schedulesByDay = undefined;
      this.schedulesSubscription = this.scheduleService.getSchedulesWithAppointments(this.doctor.doctorUUID, {
        startDateTime: getFirstDayOfWeek(this.currentDate!),
        endDateTime: getTheLastDayOfWeek(this.currentDate!)
      })
        .subscribe(data => {
          this.handleData(data);
          this.schedulesByDay = this.getSchedulesByDay(this.appointmentSchedules!.schedules, this.appointmentSchedules!.appointments);
        })
    }
    // this.schedulesSubscription = this.scheduleService.getSchedulesWithAppointments(this.selectedDoctor.code, {
    //   startDateTime: getFirstDayOfWeek(this.currentDate!),
    //   endDateTime: getTheLastDayOfWeek(this.currentDate!)
    // }).subscribe({
    //   next: data => {
    //     this.assignedSchedules = data;
    //     for (let assignedSchedule of this.assignedSchedules) {
    //       assignedSchedule.startDateTime = new Date(assignedSchedule.startDateTime);
    //       assignedSchedule.endDateTime = new Date(assignedSchedule.endDateTime);
    //     }
    //     this.hours = getAllDatesByWorkingHoursInDay(this.currentDate!);
    //     this.days = getAllDaysInWeekByDate(this.currentDate!);
    //     this.fetchingDoctorSchedules = false;
    //   }, error: error => {
    //     this.toastService.showError('Error during fetching schedules. Try again later.')
    //     this.assignedSchedules = [];
    //     this.hours = getAllDatesByWorkingHoursInDay(this.currentDate!);
    //     this.days = getAllDaysInWeekByDate(this.currentDate!);
    //   }
    // });
  }

  public getFriendlyAddress(address: Address) {
    return `${getUserFriendlyAddress(address)}, ${address.city}`;
  }

  public getFriendlySpecializationName() {
    if (!!this.doctor)
      return getFriendlyEnumName(this.doctor?.specialization);
    return undefined;
  }

  public linkToGoogleMaps(address: Address) {
    const baseUrl = "https://www.google.com/maps/search/";
    const linkEnd = getUserFriendlyAddress(address).replace('/', '+').replace(' ', '+') + '+' + address.city;

    return new URL(baseUrl + linkEnd);
  }

  private getSchedulesByDay(schedules: ScheduleRS[], assignedSchedules: ScheduleRS[]): AppointmentScheduleDayRec[] {
    schedules = this.createSchedulesByTestDuration(schedules);
    let allDaysInWeekByDate = getAllDaysInWeekByDate(this.currentDate!);
    let schedulesByDay = new Map<Date, ScheduleRS[]>();
    let assignedSchedulesByDay = new Map<Date, ScheduleRS[]>();
    allDaysInWeekByDate.forEach(date => {
      schedulesByDay.set(date, []);
      assignedSchedulesByDay.set(date, []);
    })
    schedulesByDay = this.groupPerDay(schedulesByDay, schedules, allDaysInWeekByDate);
    assignedSchedulesByDay = this.groupPerDay(assignedSchedulesByDay, assignedSchedules, allDaysInWeekByDate);

    console.log(schedulesByDay)
    let testDays = []
    for (let day of allDaysInWeekByDate) {
      let markedSchedules = this.markAsBusy(schedulesByDay.get(day)!, assignedSchedulesByDay.get(day)!);
      testDays.push({
        day: day,
        schedules: markedSchedules
      } as AppointmentScheduleDayRec);
    }
    return testDays;
  }

  private markAsBusy(schedules: ScheduleRS[], assignedSchedules: ScheduleRS[]): TestDateRS[] {
    let marked = []
    for (let schedule of schedules) {
      let busy = false;
      for (let assigned of assignedSchedules) {
        if (schedule.startDateTime.getHours() == assigned.startDateTime.getHours() && assigned.startDateTime.getMinutes() == schedule.startDateTime.getMinutes()) {
          busy = true;
          break;
        }
      }
      marked.push({
        startDateTime: schedule.startDateTime,
        endDateTime: schedule.endDateTime,
        busy: busy
      } as TestDateRS)
    }
    return marked;
  }

  private createSchedulesByTestDuration(schedules: ScheduleRS[]): ScheduleRS[] {
    let divByDuration = [];
    for (let schedule of schedules) {
      let start = schedule.startDateTime;
      while (start < schedule.endDateTime) {
        let end = new Date(start.getTime() + 1000 * 60 * 15)
        divByDuration.push({
          startDateTime: start,
          endDateTime: end
        } as ScheduleRS);
        start = end;
      }
    }
    return divByDuration
  }

  private groupPerDay(schedulesByDay: Map<Date, ScheduleRS[]>, schedules: ScheduleRS[], allDaysInWeekByDate: Date[]): Map<Date, ScheduleRS[]> {
    for (let schedule of schedules) {
      for (let day of allDaysInWeekByDate) {
        if (this.isTheSameDay(day, schedule)) {
          schedulesByDay.get(day)!.push(schedule)
        }
      }
    }
    return schedulesByDay;
  }

  private isTheSameDay(date: Date, schedule: ScheduleRS): boolean {
    let st = schedule.startDateTime;
    return date.getFullYear() == st.getFullYear() && date.getMonth() == st.getMonth() && date.getDate() == st.getDate();
  }


  private addMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60000);
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

  showChosenDate(schedule: TestDateRS) {
    if (!this.showDateVisible) {
      this.chosenDate = schedule;
      this.showDateVisible = true;
    }
  }
  
  submitAppointment() {
    if (!!this.doctor && !!UserInfo.profile) {
      this.keycloakService.getKeycloakInstance()
        .loadUserProfile()
        .then(profile => {
          let visitRQ = {
            doctorUUID: this.doctor?.doctorUUID,
            patientUUID: UserInfo.profile?.id,
            appointmentDateTime: this.addMinutes(this.chosenDate?.startDateTime!, 2 * 60)
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

  elo() {
    console.log('elo')
  }

  incrementCurrentDate() {
    this.currentDate$.next(new Date(this.currentDate!.getTime() + ONE_WEEK_IN_MILLISECONDS));
    this.onDoctorSelect()
  }

  decrementCurrentDate() {
    this.currentDate$.next(new Date(this.currentDate!.getTime() - ONE_WEEK_IN_MILLISECONDS));
    this.onDoctorSelect()
  }

  getFriendlyEnumName(testType: string) {
    return getFriendlyEnumName(testType);
  }

  createVisit() {
    if (this.selectedDoctor) {
      let visitRQ = {
        doctorUUID: this.selectedDoctor.code,
        patientUUID: this.patient?.patientUUID,
        appointmentDateTime: this.addMinutes(this.chosenDate?.startDateTime!, 2 * 60)
      } as AppointmentRQ;

      console.log(visitRQ)
      this.resultSubscription = this.appointmentService.createAppointment(visitRQ)
        .subscribe({
          next: data => {
            this.toastService.showSuccess('Visit created');
            this.navigationService.toAppointmentDetailsReceptionist(data.id)
          },
          error: error => {
            console.log(error)
            this.toastService.showError('Error during creating visit. Try again later');
          }
        })
    }
  }

  private mapToDropdownItem(name: string, code?: string): DropdownItem {
    return {
      name: name,
      code: code ?? name
    }
  }
}