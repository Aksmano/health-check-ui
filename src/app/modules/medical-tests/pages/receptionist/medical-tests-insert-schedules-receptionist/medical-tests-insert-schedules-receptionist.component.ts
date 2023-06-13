import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScheduleRS } from '../../../../../data/model/dto/rs/schedules/ScheduleRS';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MedicalTestSchedulesService } from '../../../../../data/services/medical-test-schedules/medical-test-schedules.service';
import { ActivatedRoute } from '@angular/router';
import { MedicalTestScheduleCriteriaQP } from '../../../qp/medical-test-schedule-criteria-qp';
import {
  getAllDatesByWorkingHoursInDay,
  getAllDaysInWeekByDate,
  getFirstDayOfWeek,
  getTheLastDayOfWeek,
} from '../../../utils/TimeUtils';
import { ToastService } from '../../../../../core/services/toast/toast.service';
import { MedicalTestScheduleRQ } from '../../../../../data/model/dto/rq/MedicalTestScheduleRQ';
import { TestType } from '../../../../../data/model/common/TestType';
import { ScheduleRQ } from '../../../../../data/model/dto/rq/ScheduleRQ';

@Component({
  selector: 'app-medical-test-insert-schedules-receptionist',
  templateUrl: './medical-tests-insert-schedules-receptionist.component.html',
  styleUrls: ['./medical-tests-insert-schedules-receptionist.component.scss'],
})
export class MedicalTestsInsertSchedulesReceptionistComponent
  implements OnInit, OnDestroy
{
  private assignedSchedules: ScheduleRS[] | undefined;
  protected currentDate: Date | undefined;
  protected currentDate$ = new BehaviorSubject(new Date());
  protected hours: Date[] | undefined;
  protected days: Date[] | undefined;
  protected departmentId: number | undefined;
  protected type: string | undefined;
  private dateSubscription: Subscription | undefined;
  private schedulesSubscription: Subscription | undefined;
  protected showDateVisible: boolean = false;
  protected chosenDate: Date | undefined;
  protected chosenHours: number = 1;

  protected fetchingMedTestsSchedules = true;
  protected addingSchedules = false;

  constructor(
    private readonly medicalTestScheduleService: MedicalTestSchedulesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.departmentId = parseInt(params['departmentId']);
      this.type = params['type'];
      if (this.dateSubscription) {
        this.dateSubscription.unsubscribe();
      }
      this.dateSubscription = this.dateSubscription =
        this.currentDate$.subscribe((data) => {
          this.currentDate = data;
          if (this.schedulesSubscription) {
            this.schedulesSubscription.unsubscribe();
          }
          this.fetchingMedTestsSchedules = true;
          this.schedulesSubscription = this.medicalTestScheduleService
            .getMedicalTestSchedules({
              departmentId: this.departmentId,
              testType: this.type,
              startDateTime: getFirstDayOfWeek(this.currentDate),
              endDateTime: getTheLastDayOfWeek(this.currentDate),
            } as MedicalTestScheduleCriteriaQP)
            .subscribe({
              next: (data) => {
                this.assignedSchedules = data.schedules;
                for (let assignedSchedule of this.assignedSchedules) {
                  assignedSchedule.startDateTime = new Date(
                    assignedSchedule.startDateTime
                  );
                  assignedSchedule.endDateTime = new Date(
                    assignedSchedule.endDateTime
                  );
                }
                this.hours = getAllDatesByWorkingHoursInDay(this.currentDate!);
                this.days = getAllDaysInWeekByDate(this.currentDate!);
                this.fetchingMedTestsSchedules = false;
              },
              error: (error) => {
                this.toastService.showError(
                  'Error during fetching schedules. Try again later.'
                );
                this.assignedSchedules = [];
                this.hours = getAllDatesByWorkingHoursInDay(this.currentDate!);
                this.days = getAllDaysInWeekByDate(this.currentDate!);
                this.fetchingMedTestsSchedules = false;
              },
            });
        });
    });
  }

  ngOnDestroy(): void {
    this.removeSubscriptions();
  }

  removeSubscriptions() {
    if (this.dateSubscription) {
      this.dateSubscription.unsubscribe();
    }
    if (this.schedulesSubscription) {
      this.schedulesSubscription.unsubscribe();
    }
  }

  isDateInSchedule(hour: Date, day: Date): boolean {
    for (let i = 0; i < this.assignedSchedules!.length; i++) {
      let schedule = this.assignedSchedules![i];
      if (
        schedule.startDateTime.getFullYear() == day.getFullYear() &&
        schedule.startDateTime.getMonth() == day.getMonth() &&
        schedule.startDateTime.getDate() == day.getDate()
      ) {
        if (
          schedule.startDateTime.getHours() <= hour.getHours() &&
          hour.getHours() < schedule.endDateTime.getHours()
        ) {
          return true;
        }
      }
    }
    return false;
  }

  changeDate(next: boolean): void {
    let time = this.currentDate?.getTime();
    if (next) {
      time = time! + 86400000 * 7;
    } else {
      time = time! - 86400000 * 7;
    }
    this.currentDate$.next(new Date(time));
  }

  showTimeInsertWindow(day: Date, hour: Date) {
    this.chosenDate = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate(),
      hour.getHours()
    );
    this.showDateVisible = true;
  }

  addSchedule() {
    this.addingSchedules = true;

    let endDate = new Date(this.chosenDate!);
    endDate.setTime(
      endDate.getTime() + this.chosenHours * 60 * 60 * 1000 + 2 * 60 * 60 * 1000
    );
    endDate = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate(),
      endDate.getHours()
    );
    let startDate = new Date(
      this.chosenDate!.getFullYear(),
      this.chosenDate!.getMonth(),
      this.chosenDate!.getDate(),
      this.chosenDate!.getHours() + 2
    );
    let rq = {
      departmentId: this.departmentId!,
      testType: TestType[this.type as keyof typeof TestType],
      schedules: [
        {
          startDateTime: startDate,
          endDateTime: endDate,
        } as ScheduleRQ,
      ],
    } as MedicalTestScheduleRQ;
    this.medicalTestScheduleService.addMedicalTestSchedule(rq).subscribe(
      (data) => {
        this.toastService.showSuccess('Schedules inserted successfully');
        this.showDateVisible = false;
        this.addingSchedules = false;
        this.currentDate$.next(this.currentDate!);
      },
      (error) => {
        this.addingSchedules = false;
        this.toastService.showError(
          'Error occurred during inserting schedules. Try again later.'
        );
      }
    );
  }
}
