import { Component, Input, OnInit } from '@angular/core';
import { TableViewType } from '../../table-view.component';
import { ReceptionistRS } from 'src/app/data/model/dto/rs/employeeRS/ReceptionistRS';
import { TableView } from '../../table-view';
import { ReceptionistService } from 'src/app/data/services/receptionist/receptionist.service';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { UserInfo } from 'src/app/core/user-info';
import { UserType } from 'src/app/data/model/common/UserType';
import { ToastService } from 'src/app/core/services/toast/toast.service';

@Component({
  selector: 'app-receptionist-view',
  templateUrl: './receptionist-view.component.html',
  styleUrls: ['./receptionist-view.component.scss'],
})
export class ReceptionistViewComponent extends TableView {
  @Input() public viewType: TableViewType = TableViewType.Receptionist;
  @Input() public values: ReceptionistRS[] = [];
  @Input() public loadingValues: boolean = false;
  @Input() public rows: number = 0;
  @Input() public paginator: boolean = false;
  @Input() public classNames: string = '';

  constructor(
    private readonly receptionistService: ReceptionistService,
    override readonly toastService: ToastService,
    private readonly navigationService: NavigationService
  ) {
    super(toastService);
    console.log(this.values);
  }

  override deleteEntity(entity: ReceptionistRS): void {
    this.processOngoing = true;
    this.loadingMessage = 'Deleting receptionist is ongoing...';
    this.receptionistService
      .deleteReceptionistByUUID(entity.receptionistUUID)
      .subscribe({
        next: (res) => {
          this.deleteEntitySuccess()
          this.receptionistService.getReceptionists().subscribe((res) => {
            this.values = res;
            this.processOngoing = false;
          });
        },
        error: err => {
          this.processOngoing = false;
          this.deleteEntityError()
        }
      });
  }

  override modifyEntity(entity: ReceptionistRS): void {
    this.navigationService.navigateInSuperadminPanel(['entity-view'], {
      mode: 'modify',
      type: 'receptionist',
      id: entity.receptionistUUID,
      deptId: entity.departmentId,
    });
  }
}
