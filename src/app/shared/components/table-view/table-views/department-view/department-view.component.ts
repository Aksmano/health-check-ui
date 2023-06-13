import { Component, Input, OnInit } from '@angular/core';
import { DepartmentRS } from 'src/app/data/model/dto/rs/DepartmentRS';
import { TableViewType } from '../../table-view.component';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { KeycloakService } from 'keycloak-angular';
import { UserType } from 'src/app/data/model/common/UserType';
import { AdministrationServiceImpl } from 'src/app/data/services/administration/administration.service';
import { DepartmentServiceImpl } from 'src/app/data/services/department/department.service';
import { TableView } from '../../table-view';
import { ToastService } from 'src/app/core/services/toast/toast.service';

@Component({
  selector: 'app-department-view',
  templateUrl: './department-view.component.html',
  styleUrls: ['./department-view.component.scss'],
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
    override readonly toastService: ToastService,
    private readonly keycloak: KeycloakService
  ) {
    super(toastService);
    if (!this.keycloak.isUserInRole(UserType.Superadmin)) {
      this.navigationService.navigateInSuperadminPanel([], {});
    }
  }

  public getUserFriendlyAddress(dept: DepartmentRS): string {
    const address = dept.address;

    return `${address.street} ${address.houseNumber}${
      !!address.apartmentNumber ? '/' + address.apartmentNumber : ''
    }`;
  }

  override modifyEntity(entity: DepartmentRS) {
    this.navigationService.navigateInSuperadminPanel(['entity-view'], {
      mode: 'modify',
      type: TableViewType.Department.toLowerCase(),
      id: entity.id,
    });
  }

  override deleteEntity(entity: DepartmentRS) {
    this.loadingMessage = 'Deleting department is ongoing...';
    this.processOngoing = true;
    this.deptService.deleteDepartmentById(entity.id).subscribe({
      next: (res) => {
        this.toastService.showSuccess(
          'Department deleted successfully, loading departments...'
        );
        this.deptService.getDepartmentsByCriteria().subscribe({
          next: (res) => {
            this.values = res;
            this.processOngoing = false;
          },
          error: (err) => {
            this.processOngoing = false;
            this.toastService.showError(
              'Something went wrong after getting departments, try again later.'
            );
          },
        });
      },
      error: (err) => {
        this.processOngoing = false;
        this.deleteEntityError();
      },
    });
  }

  goToAdmin(dept: DepartmentRS) {
    this.processOngoing = true;
    this.loadingMessage = 'Searching for admin...';
    this.adminService.getAdministratorByDepartmentId(dept.id).subscribe({
      next: (res) => {
        this.navigationService.navigateInSuperadminPanel(['entity-view'], {
          mode: 'modify',
          type: 'admin',
          id: res.administratorUUID,
        });
        this.processOngoing = false;
      },
      error: (err) => {
        if (err.status === 404) {
          this.navigationService.navigateInSuperadminPanel(['entity-view'], {
            mode: 'create',
            type: 'admin',
            deptId: dept.id,
          });
        } else {
          this.toastService.showError(
            'An error has occurred during loading doctor, try again later.'
          );
        }
        this.processOngoing = false;
      },
    });
  }
}
