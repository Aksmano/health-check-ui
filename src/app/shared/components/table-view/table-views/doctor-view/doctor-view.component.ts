import { Component, Input, OnInit } from '@angular/core';
import { Specialization } from 'src/app/data/model/common/Specialization';
import { DoctorRS } from 'src/app/data/model/dto/rs/employeeRS/DoctorRS';
import { TableViewType } from '../../table-view.component';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { TableView } from '../../table-view';
import { DoctorServiceImpl } from 'src/app/data/services/doctor/doctor.service';
import { KeycloakService } from 'keycloak-angular';
import { UserType } from 'src/app/data/model/common/UserType';
import { AdministrationServiceImpl } from 'src/app/data/services/administration/administration.service';
import { DepartmentServiceImpl } from 'src/app/data/services/department/department.service';
import { UserInfo } from 'src/app/core/user-info';

@Component({
  selector: 'app-doctor-view',
  templateUrl: './doctor-view.component.html',
  styleUrls: ['./doctor-view.component.scss']
})
export class DoctorViewComponent extends TableView {

  @Input() public viewType: TableViewType = TableViewType.Doctor;
  @Input() public values: DoctorRS[] = [];
  @Input() public loadingValues: boolean = false;
  @Input() public rows: number = 0;
  @Input() public paginator: boolean = false;
  @Input() public classNames: string = '';

  constructor(
    private readonly navigationService: NavigationService,
    private readonly doctorService: DoctorServiceImpl,
    private readonly adminService: AdministrationServiceImpl,
    private readonly deptService: DepartmentServiceImpl,
    private readonly keycloak: KeycloakService
  ) {
    super();
    console.log(this.values);
  }

  override deleteEntity(entity: DoctorRS): void {
    this.loadingMessage = "Deleting doctor is ongoing..."
    this.processOngoing = true;

    this.doctorService.deleteDoctorById(entity.doctorUUID)
      .subscribe({
        next: res => {
          if (UserInfo.role === UserType.Superadmin)
            this.doctorService.getAllDoctors()
              .subscribe(res => {
                this.values = res;
                this.processOngoing = false;
              });
          else if (UserInfo.role === UserType.Admin) {
            this.doctorService.getAllDoctors({ departmentId: UserInfo.deptId })
              .subscribe(res => {
                this.values = res;
                this.processOngoing = false;
              });
          }
        },
        error: (err) => {
          // place for toast
          this.processOngoing = false;
        }
      })
  }

  override modifyEntity(entity: DoctorRS): void {
    this.navigationService.navigateInSuperadminPanel(['entity-view'], {
      'mode': 'modify',
      'type': TableViewType.Doctor.toLowerCase(),
      'id': entity.doctorUUID,
      'deptId': entity.departmentId
    })
  }
}
