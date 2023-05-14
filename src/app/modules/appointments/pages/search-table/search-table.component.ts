import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { AppointmentService } from 'src/app/data/services/appointment/appointment.service';
import { DoctorServiceImpl } from 'src/app/data/services/doctor/doctor.service';
import { TableViewType } from 'src/app/shared/components/table-view/table-view.component';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss']
})
export class SearchTableComponent {
  public loadingAppointments = true;
  public tableItems?: any;
  public params?: ParamMap

  public readonly viewType = TableViewType.DoctorAppointment;

  private readonly ngUnsubscribe = new Subject();

  constructor(
    private readonly navigation: NavigationService,
    private readonly appointmentService: AppointmentService,
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
            next: res => {
              this.tableItems = res;
            },
            error: err => {
              this.toastService.showError("Something went wrong while loading doctors, try again later");
            },
            complete: () => {
              this.loadingAppointments = false;
            }
          })
      });
  }
}
