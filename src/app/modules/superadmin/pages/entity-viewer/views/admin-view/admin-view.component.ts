import { Component, OnInit } from '@angular/core';
import { EntityView } from '../../entity-view.abstract';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AdministrationServiceImpl } from 'src/app/data/services/administration/administration.service';
import { AdministratorRQ } from 'src/app/data/model/dto/rq/employeeRQ/AdministratorRQ';
import { AdministratorRS } from 'src/app/data/model/dto/rs/employeeRS/AdministratorRS';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
})
export class AdminViewComponent extends EntityView implements OnInit {
  valueRQ: AdministratorRQ = {} as AdministratorRQ;
  valueRS: AdministratorRS = {} as AdministratorRS;

  constructor(
    private readonly adminService: AdministrationServiceImpl,
    private readonly navigationService: NavigationService,
    override readonly route: ActivatedRoute,
    override readonly toastService: ToastService
  ) {
    super(toastService);
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.queryParamsChanged(params);

      if (!!params.get('deptId')) {
        this.valueRQ.departmentId = parseInt(params.get('deptId')!);
      }
    });
  }

  override queryParamsModifyMode(params: ParamMap): void {
    console.log(this.id);

    if (!!this.id)
      this.adminService.getAdministratorByUUID(this.id).subscribe((adminRS) => {
        this.valueRS = adminRS;
        this.operationOngoing = false;
        console.log(this.operationOngoing);
      });

    console.log(params.get('deptId'));
  }

  override queryParamsCreateMode(params: ParamMap): void {
    // throw new Error('Method not implemented.');
  }

  override createEntity(): void {
    this.operationOngoing = true;
    this.adminService.createAdministrator(this.valueRQ).subscribe({
      next: (res) => {
        this.valueRQ = {} as AdministratorRQ;
        this.createEntitySuccess();
        this.navigationService.navigateInSuperadminPanel(['entity-view'], {
          mode: 'modify',
          type: 'admin',
          id: res.administratorUUID,
        });
      },
      error: (err) => {
        this.createEntityError();
        this.operationOngoing = false;
      },
    });
  }

  override updateEntity(): void {
    throw new Error('Method not implemented.');
  }

  override deleteEntity(): void {
    this.operationOngoing = true;
    this.adminService
      .deleteAdministratorByUUID(this.valueRS.administratorUUID)
      .subscribe({
        next: (res) => {
          this.valueRQ = {} as AdministratorRQ;
          this.deleteEntitySuccess()
          this.navigationService.navigateInSuperadminPanel(['entity-view'], {
            mode: 'create',
            type: 'admin',
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
