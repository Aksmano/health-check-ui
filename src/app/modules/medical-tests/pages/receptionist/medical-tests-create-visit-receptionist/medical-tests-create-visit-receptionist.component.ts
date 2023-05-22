import {Component} from '@angular/core';
import {MedicalTestSchedulesRS} from "../../../../../data/model/dto/rs/schedules/MedicalTestSchedulesRS";
import {DepartmentRS} from "../../../../../data/model/dto/rs/DepartmentRS";
import {TestDateRS} from "../../../../../data/model/dto/rs/schedules/TestDateRS";
import {TestScheduleDayRec} from "../../../utils/models/test-schedule-day";
import {BehaviorSubject, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {
  MedicalTestSchedulesService
} from "../../../../../data/services/medical-test-schedules/medical-test-schedules.service";
import {MedicalTestsService} from "../../../../../data/services/medical-test/medical-tests.service";
import {DepartmentServiceImpl} from "../../../../../data/services/department/department.service";
import {KeycloakService} from "keycloak-angular";
import {NavigationService} from "../../../../../core/services/navigation/navigation.service";
import {ToastService} from "../../../../../core/services/toast/toast.service";
import {Address} from "../../../../../data/model/dto/common/Address";
import {getFriendlyEnumName, getUserFriendlyAddress} from "../../../../../utils";
import {ScheduleRS} from "../../../../../data/model/dto/rs/schedules/ScheduleRS";
import {
  getAllDaysInWeekByDate,
  getFirstDayOfWeek,
  getTheLastDayOfWeek,
  ONE_WEEK_IN_MILLISECONDS
} from "../../../utils/TimeUtils";
import {TestType} from "../../../../../data/model/common/TestType";
import {MedicalTestRQ} from "../../../../../data/model/dto/rq/MedicalTestRQ";
import {PatientRS} from "../../../../../data/model/dto/rs/PatientRS";

@Component({
  selector: 'app-medical-test-create-visit-receptionist',
  templateUrl: './medical-tests-create-visit-receptionist.component.html',
  styleUrls: ['./medical-tests-create-visit-receptionist.component.scss']
})
export class MedicalTestsCreateVisitReceptionistComponent {
  public allDataLoaded: boolean = false;

  protected medicalTestSchedules?: MedicalTestSchedulesRS;
  protected department?: DepartmentRS;
  protected testType?: string;

  protected chosenDate?: TestDateRS;
  protected showDateVisible: boolean = false;
  protected schedulesByDay?: TestScheduleDayRec[];
  private schedulesSubscription?: Subscription;
  private departmentSubscription?: Subscription;
  private pathSubscription?: Subscription;
  private resultSubscription?: Subscription;
  protected currentDate: Date | undefined;
  protected currentDate$ = new BehaviorSubject(new Date());
  protected patient: PatientRS | undefined;

  constructor(private route: ActivatedRoute,
              private readonly medicalTestScheduleService: MedicalTestSchedulesService,
              private readonly medicalTestService: MedicalTestsService,
              private readonly departmentService: DepartmentServiceImpl,
              private readonly keycloakService: KeycloakService,
              private readonly navigationService: NavigationService,
              private readonly toastService: ToastService) {
  }

  ngOnInit() {
    this.pathSubscription = this.route.params.subscribe(params => {
        this.unsubscribeAll();
        this.departmentSubscription = this.departmentService.getDepartmentById(params['departmentId'])
          .subscribe(data => {
            this.department = data;
          })
        this.testType = params['type'];
        this.currentDate$.subscribe(data => {
          this.currentDate = data;
          this.schedulesSubscription = this.medicalTestScheduleService.getMedicalTestSchedules({
            departmentId: parseInt(params['departmentId']),
            testType: params['type'],
            startDateTime: getFirstDayOfWeek(this.currentDate),
            endDateTime: getTheLastDayOfWeek(this.currentDate)
          })
            .subscribe(data => {
              this.handleData(data);
              this.schedulesByDay = this.getSchedulesByDay(this.medicalTestSchedules!.schedules, this.medicalTestSchedules!.assignedSchedules);
            })
        });
      }
    );
  }

  private handleData(data: MedicalTestSchedulesRS) {
    this.medicalTestSchedules = data;
    console.log(this.medicalTestSchedules);
    for (let assignedSchedule of this.medicalTestSchedules.assignedSchedules) {
      assignedSchedule.startDateTime = new Date(assignedSchedule.startDateTime);
      assignedSchedule.endDateTime = new Date(assignedSchedule.endDateTime);
    }
    for (let schedule of this.medicalTestSchedules.schedules) {
      schedule.startDateTime = new Date(schedule.startDateTime);
      schedule.endDateTime = new Date(schedule.endDateTime);
    }
  }

  public getFriendlyAddress(address: Address) {
    return `${getUserFriendlyAddress(address)}, ${address.city}`;
  }

  public getTestTypeName() {
    const typeName = this.testType ?? "";
    return getFriendlyEnumName(typeName);
  }

  public linkToGoogleMaps(address: Address) {
    const baseUrl = "https://www.google.com/maps/search/";
    const linkEnd = getUserFriendlyAddress(address).replace('/', '+').replace(' ', '+') + '+' + address.city;

    return new URL(baseUrl + linkEnd);
  }

  private getSchedulesByDay(schedules: ScheduleRS[], assignedSchedules: ScheduleRS[]): TestScheduleDayRec[] {
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
      } as TestScheduleDayRec);
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
            })
        });
    }
  }

  elo() {
    console.log('elo')
  }

  incrementCurrentDate() {
    this.currentDate$.next(new Date(this.currentDate!.getTime() + ONE_WEEK_IN_MILLISECONDS));
  }

  decrementCurrentDate() {
    this.currentDate$.next(new Date(this.currentDate!.getTime() - ONE_WEEK_IN_MILLISECONDS));
  }

  getFriendlyEnumName(testType: string) {
    return getFriendlyEnumName(testType);
  }

  createVisit() {
    if (this.testType) {
      let visitRQ = {
        departmentId: this.department?.id,
        patientUUID: this.patient!.patientUUID!,
        type: TestType[this.testType as keyof typeof TestType],
        testDate: this.addMinutes(this.chosenDate?.startDateTime!, 2 * 60)
      } as MedicalTestRQ;

      console.log(visitRQ)
      this.resultSubscription = this.medicalTestService.createMedicalTestVisit(visitRQ)
        .subscribe(data => {
          this.toastService.showSuccess('Visit created');
          this.navigationService.toMedicalTestByIdForReceptionist(data.id)
        }, error => {
          console.log(error)
          this.toastService.showError('Error during creating visit. Try again later');
        }, () => {
        })
    }
  }
}
