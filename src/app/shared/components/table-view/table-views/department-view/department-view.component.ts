import { Component, Input, OnInit } from '@angular/core';
import { DepartmentRS } from 'src/app/data/model/dto/rs/DepartmentRS';
import { TableViewType } from '../../table-view.component';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { KeycloakService } from 'keycloak-angular';
import { UserType } from 'src/app/data/model/common/UserType';
import { AdministrationServiceImpl } from 'src/app/data/services/administration/administration.service';

@Component({
  selector: 'app-department-view',
  templateUrl: './department-view.component.html',
  styleUrls: ['./department-view.component.scss']
})
export class DepartmentViewComponent {
  @Input() public viewType: TableViewType = TableViewType.Department;
  @Input() public values: DepartmentRS[] = [];
  @Input() public loadingValues: boolean = false;
  @Input() public rows: number = 0;
  @Input() public paginator: boolean = false;
  @Input() public classNames: string = '';

  constructor(
    private readonly navigationService: NavigationService,
    private readonly adminService: AdministrationServiceImpl,
    private readonly keycloak: KeycloakService
  ) {
    if (!this.keycloak.isUserInRole(UserType.Superadmin)) {
      this.navigationService.navigateInSuperadminPanel([], {});
    }
    // this.id = this.dept.id as unknown as string;
  }

  public getUserFriendlyAddress(dept: DepartmentRS): string {
    const address = dept.address

    return `${address.street} ${address.houseNumber}${!!address.apartmentNumber ? '/' + address.apartmentNumber : ''}`
  }

  modifyDept(dept: DepartmentRS) {
    this.navigationService.navigateInSuperadminPanel(['entity-view'], {
      'mode': 'modify',
      'type': TableViewType.Department.toLowerCase(),
      'id': dept.id
    })
  }

  goToAdmin(dept: DepartmentRS) {
    this.adminService.getAdministratorByDepartmentId(dept.id)
      .subscribe(res => {
        this.navigationService.navigateInSuperadminPanel(['entity-view'], {
          'mode': 'modify',
          'type': 'admin',
          'id': res.administratorUUID
        })
      })
  }
}
