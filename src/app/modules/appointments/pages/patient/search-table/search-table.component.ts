import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { DepartmentRS } from 'src/app/data/model/dto/rs/DepartmentRS';
import { DoctorRS } from 'src/app/data/model/dto/rs/employeeRS/DoctorRS';
import { AppointmentService } from 'src/app/data/services/appointment/appointment.service';
import { DepartmentServiceImpl } from 'src/app/data/services/department/department.service';
import { DoctorServiceImpl } from 'src/app/data/services/doctor/doctor.service';
import { TableViewType } from 'src/app/shared/components/table-view/table-view.component';
import { DoctorAppointmentTableItem } from 'src/app/shared/components/table-view/table-views/doctor-appointment-view/doctor-appointment-view.component';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss']
})
export class SearchTableComponent implements OnInit {
  public loadingAppointments = true;
  public tableItems: DoctorAppointmentTableItem[] = [];
  public params?: ParamMap

  public doctors?: DoctorRS[];
  public departments?: DepartmentRS[];

  public readonly viewType = TableViewType.DoctorAppointment;

  private readonly ngUnsubscribe = new Subject();

  constructor(
    private readonly navigation: NavigationService,
    private readonly appointmentService: AppointmentService,
    private readonly departmentService: DepartmentServiceImpl,
    private readonly doctorService: DoctorServiceImpl,
    private readonly toastService: ToastService,
    private readonly route: ActivatedRoute
  ) {
    this.route.queryParamMap
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(params => {
        this.params = params

        this.doctorService.getAllDoctors({
          specialization: params.get('specialization') ?? '',
          departmentId: parseInt(params.get('departmentId') ?? '')
        })
          .subscribe({
            next: doctors => {
              this.doctors = doctors;
              this.tryToCreateTableData();
            },
            error: err => {
              this.toastService.showError("Something went wrong while loading doctors, try again later");
            }
          });

        this.departmentService.getDepartmentsByCriteria()
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe({
            next: depts => {
              this.departments = depts
              this.tryToCreateTableData();
            },
            error: err => {
              this.toastService.showError("Something went wrong while loading doctors departments info, try again later");
            }
          })
      });
  }

  tryToCreateTableData() {
    if (!!this.doctors && !!this.departments) {
      this.tableItems = this.doctors.map(doc => {
        return {
          doctor: doc,
          dept: this.departments!.find(dept => dept.id === doc.departmentId)!
        } as DoctorAppointmentTableItem
      });

      this.loadingAppointments = false;
    }
  }

  ngOnInit(): void {
    // this.
  }
}
