import { Component, OnInit } from '@angular/core';
import { EntityView } from '../../entity-view.abstract';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AdministrationServiceImpl } from 'src/app/data/services/administration/administration.service';
import { AdministratorRQ } from 'src/app/data/model/dto/rq/employeeRQ/AdministratorRQ';
import { AdministratorRS } from 'src/app/data/model/dto/rs/employeeRS/AdministratorRS';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent extends EntityView implements OnInit {

  valueRQ: AdministratorRQ = {} as AdministratorRQ;
  valueRS: AdministratorRS = {} as AdministratorRS;

  constructor(
    private readonly adminService: AdministrationServiceImpl,
    private readonly navigationService: NavigationService,
    override readonly route: ActivatedRoute,
  ) { super(); }

  ngOnInit(): void {
    this.route.queryParamMap
      .subscribe(params => this.queryParamsChanged(params));
  }

  override queryParamsModifyMode(params: ParamMap): void {
    console.log(this.id);
    
    if (!!this.id)
      this.adminService.getAdministratorByUUID(this.id)
        .subscribe(adminRS => {
          this.valueRS = adminRS;
          this.operationOngoing = false;
          console.log(this.operationOngoing);
        });
  }

  override queryParamsCreateMode(params: ParamMap): void {
    // throw new Error('Method not implemented.');
  }

  override createEntity(): void {
    this.operationOngoing = true;
    this.adminService.createAdministrator(this.valueRQ)
      .subscribe(res => {
        this.valueRQ = {} as AdministratorRQ;
        this.navigationService.navigateInSuperadminPanel(['entity-view'], {
          'mode': 'modify',
          'type': 'admin',
          'id': res.administratorUUID
        });
      });
  }

  override updateEntity(): void {
    throw new Error('Method not implemented.');
  }

  override deleteEntity(): void {
    this.operationOngoing = true;
    this.adminService.deleteAdministratorByUUID(this.valueRS.administratorUUID)
      .subscribe(res => {
        this.valueRQ = {} as AdministratorRQ;
        this.navigationService.navigateInSuperadminPanel(['entity-view'], {
          'mode': 'create',
          'type': 'admin'
        });
      });
  }

  override navigate(): void {
    throw new Error('Method not implemented.');
  }

}
