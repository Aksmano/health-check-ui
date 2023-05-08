import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TestType} from "../../../../../data/model/common/TestType";
import {
  MedicalTestSchedulesService
} from "../../../../../data/services/medical-test-schedules/medical-test-schedules.service";
import {Subscription} from "rxjs";
import {DepartmentRS} from "../../../../../data/model/dto/rs/DepartmentRS";
import {DepartmentServiceImpl} from "../../../../../data/services/department/department.service";
import {MedicalTestsService} from "../../../../../data/services/medical-test/medical-tests.service";
import {ScheduleRS} from "../../../../../data/model/dto/rs/schedules/ScheduleRS";
import {dayNames, TestScheduleDay} from "../../../utils/models/test-schedule-day";
import {TestDateRS} from "../../../../../data/model/dto/rs/schedules/TestDateRS";
import {MedicalTestRQ} from "../../../../../data/model/dto/rq/MedicalTestRQ";
import {KeycloakService} from "keycloak-angular";
import {NavigationService} from "../../../../../core/services/navigation/navigation.service";
import {ToastService} from "../../../../../core/services/toast/toast.service";
import {MedicalTestSchedulesRS} from "../../../../../data/model/dto/rs/schedules/MedicalTestSchedulesRS";

@Component({
  selector: 'app-medical-test-schedules-patient',
  templateUrl: './medical-tests-schedules-patient.component.html',
  styleUrls: ['./medical-tests-schedules-patient.component.scss']
})
export class MedicalTestsSchedulesPatientComponent implements OnInit, OnDestroy {
  // protected medicalTestSchedules = {
  //   departmentId: 910,
  //   type: TestType.AUDIOMETRY,
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
  //   assignedSchedules: [
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

  protected medicalTestSchedules: MedicalTestSchedulesRS | undefined;
  protected department: DepartmentRS | undefined;
  protected testType: String | undefined;

  protected chosenDate: TestDateRS | undefined;
  protected showDateVisible: boolean = false;
  protected schedulesByDay: TestScheduleDay[] | undefined;
  private schedulesSubscription: Subscription | undefined;
  private departmentSubscription: Subscription | undefined;
  private pathSubscription: Subscription | undefined;
  private resultSubscription: Subscription | undefined;


  constructor(private route: ActivatedRoute,
              private readonly medicalTestScheduleService: MedicalTestSchedulesService,
              private readonly medicalTestService: MedicalTestsService,
              private readonly departmentService: DepartmentServiceImpl,
              private readonly keycloakService: KeycloakService,
              private readonly navigationService: NavigationService,
              private readonly toastService: ToastService) {
  }

  ngOnInit() {
    this.pathSubscription = this.route.queryParams.subscribe(params => {
        this.unsubscribeAll();
        this.departmentSubscription = this.departmentService.getDepartmentById(params['departmentId'])
          .subscribe(data => {
            this.department = data;
          })
        this.testType = params['testType'];

        this.schedulesSubscription = this.medicalTestScheduleService.getTestTestSchedules({
          departmentId: parseInt(params['departmentId']),
          testType: params['testType']
        })
          .subscribe(data => {
            this.medicalTestSchedules = data;
            console.log(this.medicalTestSchedules);
            for (let assignedSchedule of this.medicalTestSchedules.assignedSchedules) {
              assignedSchedule.startDateTime = new Date(assignedSchedule.startDateTime);
              assignedSchedule.endDateTime = new Date(assignedSchedule.endDateTime);
            }
            this.schedulesByDay = this.getSchedulesByDay(this.medicalTestSchedules.schedules);
          })
      }
    );
  }

  private getSchedulesByDay(schedules: ScheduleRS[]): TestScheduleDay[] {
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
        } as TestScheduleDay
        testScheduleDays.push(entry);
      }
    }
    console.log(testScheduleDays)
    return testScheduleDays;
  }

  private addSchedulesBetweenDates(schedule: ScheduleRS): ScheduleRS[] {
    let testSchedules = [];
    let startDateTimeOfTest = schedule.startDateTime;
    while (true) {
      let endDateTimeOfTest = this.addMinutes(startDateTimeOfTest, 15);
      testSchedules.push({startDateTime: startDateTimeOfTest, endDateTime: endDateTimeOfTest} as ScheduleRS);
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
    if (this.medicalTestSchedules) {

      let date = this.medicalTestSchedules.assignedSchedules
        .map((assignedSchedule) => assignedSchedule.startDateTime)
        .find(assigned => assigned.getTime() === schedule.startDateTime.getTime());

      console.log(date)
      return !!date;
    } else return false;
  }

  checkAssignment(schedules: ScheduleRS[]): TestDateRS[] {
    return schedules.map(schedule => {
      return {
        startDateTime: schedule.startDateTime,
        endDateTime: schedule.endDateTime,
        busy: this.isBusy(schedule)
      } as TestDateRS
    });
  }

  showChosenDate(schedule: TestDateRS) {
    if (!this.showDateVisible) {
      this.chosenDate = schedule;
      this.showDateVisible = true;
    }
  }

  submitMedicalTest() {
    if (this.testType) {
      this.keycloakService.getKeycloakInstance()
        .loadUserProfile()
        .then(profile => {
          let visitRQ = {
            departmentId: this.department?.id,
            patientUUID: profile.id!,
            type: TestType[this.testType as keyof typeof TestType],
            testDate: this.addMinutes(this.chosenDate?.startDateTime!, 2 * 60)
          } as MedicalTestRQ;

          console.log(visitRQ)
          this.resultSubscription = this.medicalTestService.createMedicalTestVisit(visitRQ)
            .subscribe(data => {
              this.toastService.showSuccess('Visit created');
              this.navigationService.toMedicalTestById(data.id)
            }, error => {
              console.log(error)
              this.toastService.showError('Error during creating visit. Try again later');
            }, () => {
              this.toastService.showInfo('Completed');
            })
        });
    }
  }
}
