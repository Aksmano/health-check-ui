import { HttpParams } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Observable, Subject, takeUntil } from 'rxjs';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { UserInfo } from 'src/app/core/user-info';
import { UserType } from 'src/app/data/model/common/UserType';
import { AdministrationServiceImpl } from 'src/app/data/services/administration/administration.service';
import { DepartmentServiceImpl } from 'src/app/data/services/department/department.service';
import { DoctorServiceImpl } from 'src/app/data/services/doctor/doctor.service';
import { PatientService } from 'src/app/data/services/patient/patient.service';
import { ReceptionistService } from 'src/app/data/services/receptionist/receptionist.service';
import { TableViewType } from 'src/app/shared/components/table-view/table-view.component';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {
  items: any[] = [];
  tableItems: any[] = [];
  loadingTableItems = true;

  currentViewType: TableViewType = TableViewType.Doctor;
  currentBrowseType: string | null = '';
  viewTypeChanged: Observable<TableViewType> = new Observable();

  readonly viewType = TableViewType;

  private readonly ngUnsubscribe = new Subject();

  constructor(
    private readonly doctorService: DoctorServiceImpl,
    private readonly deptService: DepartmentServiceImpl,
    private readonly patientService: PatientService,
    private readonly receptionistService: ReceptionistService,
    private readonly navigationService: NavigationService,
    private readonly route: ActivatedRoute,
    private readonly keycloak: KeycloakService,
    private readonly toastService: ToastService
  ) {
    this.route.queryParamMap.subscribe((params) => {
      this.currentBrowseType = params.get('type');
      if (this.currentBrowseType?.toLowerCase() === 'users') {
        this.tableItems = [];
        this.loadingTableItems = true;
        switch (params.get('user-type')?.toLowerCase()) {
          case 'doctor':
            this.currentViewType = TableViewType.Doctor;
            if (UserInfo.role === UserType.Superadmin) {
              this.doctorService
                .getAllDoctors()
                // .pipe(takeUntil(this.ngUnsubscribe))
                .subscribe({
                  next: (doctors) => {
                    console.log(doctors);

                    this.tableItems = doctors;
                    this.loadingTableItems = false;
                  },
                  error: (err) => {
                    this.toastService.showError(
                      'Something went wrong during loading, try again later'
                    );
                  },
                });
            } else if (UserInfo.role === UserType.Admin) {
              this.doctorService
                .getAllDoctors({ departmentId: UserInfo.deptId })
                // .pipe(takeUntil(this.ngUnsubscribe))
                .subscribe({
                  next: (doctors) => {
                    this.tableItems = doctors;
                    this.loadingTableItems = false;
                  },
                  error: (err) => {
                    this.toastService.showError(
                      'Something went wrong during loading, try again later'
                    );
                  },
                });
            }
            break;
          case 'receptionist':
            this.currentViewType = TableViewType.Receptionist;
            this.receptionistService
              .getReceptionists()
              .pipe(takeUntil(this.ngUnsubscribe))
              .subscribe({
                next: (receptionists) => {
                  this.tableItems = receptionists;
                  this.loadingTableItems = false;
                },
                error: (err) => {
                  this.toastService.showError(
                    'Something went wrong during loading, try again later'
                  );
                },
              });
            break;
        }
      } else if (this.currentBrowseType?.toLowerCase() === 'department') {
        if (!this.keycloak.isUserInRole(UserType.Superadmin)) {
          this.currentBrowseType = 'users';
          this.navigationService.navigateInSuperadminPanel([], {});
          return;
        }
        this.currentViewType = TableViewType.Department;
        this.tableItems = [];
        this.loadingTableItems = true;

        this.deptService.getDepartmentsByCriteria().subscribe({
          next: (departments) => {
            this.tableItems = departments;
            this.loadingTableItems = false;
            console.log(departments);
          },
          error: (err) => {
            this.toastService.showError(
              'Something went wrong during loading, try again later'
            );
          },
        });
      }
    });

    // this.deptService.getDepartmentsByCriteria()
    //   .subscribe(depts => console.log(depts))
  }

  getCurrentButtonStyle(view: string) {
    return this.currentViewType === view
      ? 'bg-teal-500 text-white'
      : 'text-700 transition-colors transition-duration-100 hover:bg-teal-300 hover:text-50';
  }

  ngOnInit() {
    this.items = [
      { label: 'Create', icon: 'pi pi-fw pi-home' },
      { label: 'Modify', icon: 'pi pi-fw pi-calendar' },
      { label: 'Delete', icon: 'pi pi-fw pi-trash' },
    ];
  }

  navigate(view: string) {
    const params: Params = {
      type: this.currentBrowseType,
      'user-type': view,
    };

    this.navigationService.navigateInSuperadminPanel(['browse'], params);
  }

  isSuperadmin() {
    return this.keycloak.isUserInRole(UserType.Superadmin);
  }
}
