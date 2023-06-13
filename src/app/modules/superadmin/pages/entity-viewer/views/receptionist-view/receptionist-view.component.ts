import { Component, OnInit } from '@angular/core';
import { EntityView } from '../../entity-view.abstract';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ReceptionistService } from 'src/app/data/services/receptionist/receptionist.service';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { ReceptionistRQ } from 'src/app/data/model/dto/rq/employeeRQ/ReceptionistRQ';
import { ReceptionistRS } from 'src/app/data/model/dto/rs/employeeRS/ReceptionistRS';
import { UserInfo } from 'src/app/core/user-info';
import { UserType } from 'src/app/data/model/common/UserType';
import { ToastService } from 'src/app/core/services/toast/toast.service';

@Component({
  selector: 'app-receptionist-view',
  templateUrl: './receptionist-view.component.html',
  styleUrls: ['./receptionist-view.component.scss'],
})
export class ReceptionistViewComponent extends EntityView implements OnInit {
  valueRQ: ReceptionistRQ = {} as ReceptionistRQ;
  valueRS: ReceptionistRS = {} as ReceptionistRS;

  constructor(
    private readonly receptionistService: ReceptionistService,
    private readonly navigationService: NavigationService,
    override readonly toastService: ToastService,
    override readonly route: ActivatedRoute
  ) {
    super(toastService);
    if (!(UserInfo.role === UserType.Admin)) {
      this.navigationService.navigateInSuperadminPanel([], {});
    }
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.queryParamsChanged(params);

      if (!!params.get('deptId')) {
        this.valueRQ.departmentId = parseInt(params.get('deptId')!);
      } else if (UserInfo.role === UserType.Admin && !!UserInfo.deptId) {
        this.valueRQ.departmentId = UserInfo.deptId;
      }
    });
  }

  override queryParamsModifyMode(params: ParamMap): void {
    if (!!this.id)
      this.receptionistService
        .getReceptionistByUUID(this.id)
        .subscribe((res) => {
          this.valueRS = res;
          this.operationOngoing = false;
        });
  }

  override queryParamsCreateMode(params: ParamMap): void {
    // throw new Error('Method not implemented.');
  }

  override createEntity(): void {
    this.operationOngoing = true;
    this.receptionistService.createReceptionist(this.valueRQ).subscribe({
      next: (res) => {
        this.valueRQ = {} as ReceptionistRQ;
        this.createEntitySuccess();
        this.navigationService.navigateInSuperadminPanel(['entity-view'], {
          mode: 'modify',
          type: 'receptionist',
          id: res.receptionistUUID,
        });
      },error: err => {
        this.operationOngoing = false;
        this.createEntityError()
      }
    });
  }

  override updateEntity(): void {
    throw new Error('Method not implemented.');
  }

  override deleteEntity(): void {
    this.operationOngoing = true;
    this.receptionistService
      .deleteReceptionistByUUID(this.valueRS.receptionistUUID)
      .subscribe({
        next: (res) => {
          this.valueRQ = {} as ReceptionistRQ;
          this.deleteEntitySuccess();
          this.navigationService.navigateInSuperadminPanel(['entity-view'], {
            mode: 'create',
            type: 'receptionist',
          });
        },
        error: (err) => {
          this.operationOngoing = false;
          this.deleteEntityError();
        },
      });
  }

  override navigate(): void {
    throw new Error('Method not implemented.');
  }
}
