import { Component, Input, OnInit } from '@angular/core';
import { Specialization } from 'src/app/data/model/common/Specialization';
import { DoctorRS } from 'src/app/data/model/dto/rs/employeeRS/DoctorRS';
import { TableViewType } from '../../table-view.component';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';

@Component({
  selector: 'app-doctor-view',
  templateUrl: './doctor-view.component.html',
  styleUrls: ['./doctor-view.component.scss']
})
export class DoctorViewComponent {
  @Input() public viewType: TableViewType = TableViewType.Doctor;
  @Input() public values: DoctorRS[] = [];
  @Input() public loadingValues: boolean = false;
  @Input() public rows: number = 0;
  @Input() public paginator: boolean = false;
  @Input() public classNames: string = '';

  constructor(
    private readonly navigationService: NavigationService
  ) {
    console.log(this.values);
  }

  modifyDoctor(doctor: DoctorRS) {
    this.navigationService.navigateInSuperadminPanel(['entity-view'], {
      'mode': 'modify',
      'type': TableViewType.Doctor.toLowerCase(),
      'id': doctor.doctorUUID
    })
  }
}
