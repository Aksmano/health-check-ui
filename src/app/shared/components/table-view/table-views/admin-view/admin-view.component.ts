import { Component, Input } from '@angular/core';
import { AdministratorRS } from 'src/app/data/model/dto/rs/employeeRS/AdministratorRS';
import { TableViewType } from '../../table-view.component';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent {
  @Input() public viewType: TableViewType = TableViewType.Doctor;
  @Input() public values: AdministratorRS[] = [];
  @Input() public loadingValues: boolean = false;
  @Input() public rows: number = 0;
  @Input() public paginator: boolean = false;
  @Input() public classNames: string = '';

  constructor(
    private readonly navigationService: NavigationService
  ) {
    console.log(this.values);
  }

  modifyAdmin(doctor: AdministratorRS) {
    this.navigationService.navigateInSuperadminPanel(['entity-view'], {
      'mode': 'modify',
      'type': TableViewType.Doctor.toLowerCase(),
      'id': doctor.administratorUUID,
    })
  }
}
