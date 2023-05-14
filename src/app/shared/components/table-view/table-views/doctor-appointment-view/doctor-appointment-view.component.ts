import { Component, Input } from '@angular/core';
import { TableViewType } from '../../table-view.component';
import { DoctorRS } from 'src/app/data/model/dto/rs/employeeRS/DoctorRS';
import { TableView } from '../../table-view';
import { DepartmentRS } from 'src/app/data/model/dto/rs/DepartmentRS';
import { Address } from 'src/app/data/model/dto/common/Address';
import { getFriendlyEnumName, getUserFriendlyAddress } from 'src/app/utils';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';

export interface DoctorAppointmentTableItem {
  doctor: DoctorRS;
  dept: DepartmentRS
}

@Component({
  selector: 'app-doctor-appointment-view',
  templateUrl: './doctor-appointment-view.component.html',
  styleUrls: ['./doctor-appointment-view.component.scss']
})
export class DoctorAppointmentViewComponent {
  @Input() public viewType: TableViewType = TableViewType.DoctorAppointment;
  @Input() public values: DoctorAppointmentTableItem[] = [];
  @Input() public loadingValues: boolean = false;
  @Input() public rows: number = 0;
  @Input() public paginator: boolean = false;
  @Input() public classNames: string = '';

  constructor(
    private readonly navigation: NavigationService
  ) { }

  redirectToAppointment(doctor: DoctorRS) {
    this.navigation.toAppointments(['doctor', `${doctor.doctorUUID}`])
  }

  getUserFriendlyAddress(address: Address) {
    return `${getUserFriendlyAddress(address)}, ${address.city}`;
  }

  getUserFriendlySpecializationName(name: string) {
    return getFriendlyEnumName(name)
  }
}
