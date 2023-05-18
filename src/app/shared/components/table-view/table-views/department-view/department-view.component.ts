import { Component, Input, OnInit } from '@angular/core';
import { DepartmentRS } from 'src/app/data/model/dto/rs/DepartmentRS';
import { TableViewType } from '../../table-view.component';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { KeycloakService } from 'keycloak-angular';
import { UserType } from 'src/app/data/model/common/UserType';
import { AdministrationServiceImpl } from 'src/app/data/services/administration/administration.service';
import { DepartmentServiceImpl } from 'src/app/data/services/department/department.service';
import { TableView } from '../../table-view';

@Component({
  selector: 'app-department-view',
  templateUrl: './department-view.component.html',
  styleUrls: ['./department-view.component.scss']
})
export class DepartmentViewComponent extends TableView {
  @Input() public viewType: TableViewType = TableViewType.Department;
  @Input() public values: DepartmentRS[] = [];
  @Input() public loadingValues: boolean = false;
  @Input() public rows: number = 0;
  @Input() public paginator: boolean = false;
  @Input() public classNames: string = '';

  constructor(
    private readonly navigationService: NavigationService,
    private readonly adminService: AdministrationServiceImpl,
    private readonly deptService: DepartmentServiceImpl,
    private readonly keycloak: KeycloakService
  ) {
    super();
    if (!this.keycloak.isUserInRole(UserType.Superadmin)) {
      this.navigationService.navigateInSuperadminPanel([], {});
    }
  }

  public getUserFriendlyAddress(dept: DepartmentRS): string {
    const address = dept.address

    return `${address.street} ${address.houseNumber}${!!address.apartmentNumber ? '/' + address.apartmentNumber : ''}`
  }

  override modifyEntity(entity: DepartmentRS) {
    this.navigationService.navigateInSuperadminPanel(['entity-view'], {
      'mode': 'modify',
      'type': TableViewType.Department.toLowerCase(),
      'id': entity.id
    })
  }

  override deleteEntity(entity: DepartmentRS) {
    this.loadingMessage = "Deleting department is ongoing...";
    this.processOngoing = true;
    this.deptService.deleteDepartmentById(entity.id)
      .subscribe(res => {
        this.deptService.getDepartmentsByCriteria()
          .subscribe(res => {
            this.values = res;
            this.processOngoing = false;
          })
      })
  }

  goToAdmin(dept: DepartmentRS) {
    this.processOngoing = true;
    this.loadingMessage = "Searching for admin...";
    this.adminService.getAdministratorByDepartmentId(dept.id)
      .subscribe({
        next: res => {
          this.navigationService.navigateInSuperadminPanel(['entity-view'], {
            'mode': 'modify',
            'type': 'admin',
            'id': res.administratorUUID
          })
          this.processOngoing = false;
        },
        error: (err) => {
          if (err.status === 404) {
            this.navigationService.navigateInSuperadminPanel(['entity-view'], {
              'mode': 'create',
              'type': 'admin',
              'deptId': dept.id
            })
            this.processOngoing = false;
          }
        }
      })
  }
}
