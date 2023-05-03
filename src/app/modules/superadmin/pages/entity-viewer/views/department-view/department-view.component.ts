import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { AddressRS } from 'src/app/data/model/dto/rs/AddressRS';
import { DepartmentRS } from 'src/app/data/model/dto/rs/DepartmentRS';
import { DepartmentServiceImpl } from 'src/app/data/services/department/department.service';
import { EntityView } from '../../entity-view.abstract';
import { KeycloakService } from 'keycloak-angular';
import { UserType } from 'src/app/data/model/common/UserType';

@Component({
  selector: 'app-department-view',
  templateUrl: './department-view.component.html',
  styleUrls: ['./department-view.component.scss']
})
export class DepartmentViewComponent extends EntityView implements OnInit {
  value: DepartmentRS = {
    address: {} as AddressRS
  } as DepartmentRS;

  constructor(
    private readonly deptService: DepartmentServiceImpl,
    private readonly navigationService: NavigationService,
    private readonly keycloak: KeycloakService,
    override readonly route: ActivatedRoute
  ) { super(); }

  ngOnInit(): void {
    if(!this.keycloak.isUserInRole(UserType.Superadmin)) {
      this.navigationService.navigateInSuperadminPanel([], {}); // TODO toast to show user is redirected
    }
    this.route.queryParamMap
      .subscribe(params => this.queryParamsChanged(params));
  }

  override queryParamsModifyMode(params: ParamMap): void {
    if (!!this.id)
      this.deptService.getDepartmentById(parseInt(params.get('id')!))
        .subscribe(value => {
          this.value = value;
          this.operationOngoing = false;
        })
  }

  override queryParamsCreateMode(params: ParamMap): void {
    // throw new Error('Method not implemented.');
  }

  override createEntity(): void {
    this.operationOngoing = true;
    this.deptService.createDepartment(this.value)
      .subscribe(res => {
        this.value = {} as DepartmentRS;
        this.navigationService.navigateInSuperadminPanel(['entity-view'], {
          'mode': 'modify',
          'type': 'department',
          'id': res.id
        })
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
    this.deptService.deleteDepartmentById(this.value.id)
      .subscribe(res => {
        this.operationOngoing = false;
        this.navigationService.navigateInSuperadminPanel(['entity-view'], {
          'mode': 'create',
          'type': 'department'
        })
      });
  }

  override navigate(): void {
    throw new Error('Method not implemented.');
  }
}
