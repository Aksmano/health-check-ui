import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { AddressRS } from 'src/app/data/model/dto/rs/AddressRS';
import { DepartmentRS } from 'src/app/data/model/dto/rs/DepartmentRS';
import { DepartmentServiceImpl } from 'src/app/data/services/department/department.service';
import { EntityView } from '../../entity-view.abstract';
import { KeycloakService } from 'keycloak-angular';
import { UserType } from 'src/app/data/model/common/UserType';
import { AdministrationServiceImpl } from 'src/app/data/services/administration/administration.service';
import { UserInfo } from 'src/app/core/user-info';
import { ToastService } from 'src/app/core/services/toast/toast.service';

@Component({
  selector: 'app-department-view',
  templateUrl: './department-view.component.html',
  styleUrls: ['./department-view.component.scss'],
})
export class DepartmentViewComponent extends EntityView implements OnInit {
  value: DepartmentRS = {
    address: {} as AddressRS,
  } as DepartmentRS;
  adminDeptId?: number;

  constructor(
    private readonly deptService: DepartmentServiceImpl,
    private readonly navigationService: NavigationService,
    private readonly adminService: AdministrationServiceImpl,
    private readonly keycloak: KeycloakService,
    override readonly toastService: ToastService,
    override readonly route: ActivatedRoute
  ) {
    super(toastService);
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.queryParamsChanged(params);

      if (!!params.get('deptId')) {
        this.deptService
          .getDepartmentByAdministratorUUID(UserInfo.profile?.id!)
          .subscribe({
            next: (value) => {
              console.log('pppp');

              this.value = value;
              this.operationOngoing = false;
            },
            error: (err) =>
              this.navigationService.navigateInSuperadminPanel([], {}),
          });
      }

      if (
        !this.keycloak.isUserInRole(UserType.Superadmin) &&
        !this.keycloak.isUserInRole(UserType.Admin) &&
        !params.get('deptId')
      ) {
        this.navigationService.navigateInSuperadminPanel([], {}); // TODO toast to show user is redirected
      }
    });
  }

  override queryParamsModifyMode(params: ParamMap): void {
    if (!!this.id)
      this.deptService
        .getDepartmentById(parseInt(params.get('id')!))
        .subscribe((value) => {
          this.value = value;
          this.operationOngoing = false;
        });
  }

  override queryParamsCreateMode(params: ParamMap): void {
    // throw new Error('Method not implemented.');
  }

  override createEntity(): void {
    this.operationOngoing = true;
    if (this.value.address.apartmentNumber === null)
      this.value.address.apartmentNumber = '-1';
    this.deptService.createDepartment(this.value).subscribe({
      next: (res) => {
        this.value = {} as DepartmentRS;
        this.createEntitySuccess();
        this.navigationService.navigateInSuperadminPanel(['entity-view'], {
          mode: 'modify',
          type: 'department',
          id: res.id,
        });
      },
      error: (err) => {
        this.createEntityError();
        this.operationOngoing = false;
      },
    });
  }

  updateEntity() {
    this.operationOngoing = true;
    // this.deptService.updateDepartmentById(this.value)
    //   .subscribe(res => {
    //     this.value = {} as DepartmentRS;
    //     this.navigationService.navigateInSuperadminPanel(['entity-view'], {
    //       'mode': 'modify',
    //       'type': 'department',
    //       'id': res.id
    //     })
    //   });
  }

  deleteEntity() {
    this.operationOngoing = true;
    this.deptService.deleteDepartmentById(this.value.id).subscribe({
      next: (res) => {
        this.operationOngoing = false;
        this.deleteEntitySuccess();
        this.navigationService.navigateInSuperadminPanel(['entity-view'], {
          mode: 'create',
          type: 'department',
        });
      },
      error: (err) => {
        this.deleteEntityError();
        this.operationOngoing = false;
      },
    });
  }

  override navigate(): void {
    throw new Error('Method not implemented.');
  }
}
