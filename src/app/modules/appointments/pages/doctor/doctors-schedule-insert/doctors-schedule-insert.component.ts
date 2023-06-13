import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScheduleRS } from '../../../../../data/model/dto/rs/schedules/ScheduleRS';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MedicalTestSchedulesService } from '../../../../../data/services/medical-test-schedules/medical-test-schedules.service';
import { ActivatedRoute } from '@angular/router';
// import {MedicalTestScheduleCriteriaQP} from "../../../qp/medical-test-schedule-criteria-qp";
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
import { ScheduleServiceImpl } from 'src/app/data/services/schedule/schedule.service';
import { SchedulesAppointmentsCriteriaQP } from 'src/app/data/model/dto/qp/schedule/SchedulesAppointmentsCriteriaQP';
import { DoctorServiceImpl } from 'src/app/data/services/doctor/doctor.service';
import { DropdownItem } from 'src/app/data/model/common/DropdownItem';
import { Specialization } from 'src/app/data/model/common/Specialization';
import { getFriendlyEnumName } from 'src/app/utils';

@Component({
  selector: 'app-doctors-schedule-insert',
  templateUrl: './doctors-schedule-insert.component.html',
  styleUrls: ['./doctors-schedule-insert.component.scss'],
})
export class DoctorsScheduleInsertComponent {
  private assignedSchedules: ScheduleRS[] | undefined;
  protected currentDate: Date | undefined;
  protected currentDate$ = new BehaviorSubject(new Date());
  protected hours: Date[] | undefined;
  protected days: Date[] | undefined;
  protected doctorUUID: string | undefined;
  protected spec: Specialization | undefined;
  private dateSubscription: Subscription | undefined;
  private schedulesSubscription: Subscription | undefined;
  protected showDateVisible: boolean = false;
  protected chosenDate: Date | undefined;
  protected chosenHours: number = 1;

  protected doctorsDropdownList: DropdownItem[] = [];
  protected fetchingDoctorSchedules = true;
  protected addingSchedules = false;

  constructor(
    private readonly scheduleService: ScheduleServiceImpl,
    private readonly doctorService: DoctorServiceImpl,
    private readonly activatedRoute: ActivatedRoute,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.doctorUUID = params['id'];
      // this.spec = params['spec'];
      if (this.dateSubscription) {
        this.dateSubscription.unsubscribe();
      }
      this.dateSubscription = this.dateSubscription =
        this.currentDate$.subscribe((data) => {
          this.currentDate = data;
          if (this.schedulesSubscription) {
            this.schedulesSubscription.unsubscribe();
          }

          this.fetchingDoctorSchedules = true;
          this.doctorService.getDoctorById(params['id']).subscribe({
            next: (doctor) => {
              this.schedulesSubscription = this.scheduleService
                .getSchedules(doctor.doctorUUID, {
                  startDateTime: getFirstDayOfWeek(this.currentDate!),
                  endDateTime: getTheLastDayOfWeek(this.currentDate!),
                } as SchedulesAppointmentsCriteriaQP)
                .subscribe({
                  next: (data) => {
                    this.assignedSchedules = data;
                    for (let assignedSchedule of this.assignedSchedules) {
                      assignedSchedule.startDateTime = new Date(
                        assignedSchedule.startDateTime
                      );
                      assignedSchedule.endDateTime = new Date(
                        assignedSchedule.endDateTime
                      );
                    }
                    this.hours = getAllDatesByWorkingHoursInDay(
                      this.currentDate!
                    );
                    this.days = getAllDaysInWeekByDate(this.currentDate!);
                    this.fetchingDoctorSchedules = false;
                  },
                  error: (error) => {
                    this.toastService.showError(
                      'Error during fetching schedules. Try again later.'
                    );
                    this.assignedSchedules = [];
                    this.hours = getAllDatesByWorkingHoursInDay(
                      this.currentDate!
                    );
                    this.days = getAllDaysInWeekByDate(this.currentDate!);
                  },
                });
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
    let rq = [
      {
        startDateTime: startDate,
        endDateTime: endDate,
      } as ScheduleRQ,
    ];
    this.scheduleService.addSchedules(rq).subscribe({
      next: (data) => {
        this.toastService.showSuccess('Schedules inserted successfully');
        this.showDateVisible = false;
        this.currentDate$.next(this.currentDate!);
      },
      error: (error) => {
        this.toastService.showError(
          'Error occurred during inserting schedules. Try again later.'
        );
      },
    });
  }

  getUserFriendlySpec(spec: Specialization) {
    return getFriendlyEnumName(spec);
  }

  private mapToDropdownItem(name: string, code?: string): DropdownItem {
    return {
      name: name,
      code: code ?? name,
    };
  }
}
