import { Component, Input } from '@angular/core';
import { TableViewType } from '../../table-view.component';
import { DoctorRS } from 'src/app/data/model/dto/rs/employeeRS/DoctorRS';

@Component({
  selector: 'app-doctor-appointment-view',
  templateUrl: './doctor-appointment-view.component.html',
  styleUrls: ['./doctor-appointment-view.component.scss']
})
export class DoctorAppointmentViewComponent {
  @Input() public viewType: TableViewType = TableViewType.DoctorAppointment;
  @Input() public values: DoctorRS[] = [];
  @Input() public loadingValues: boolean = false;
  @Input() public rows: number = 0;
  @Input() public paginator: boolean = false;
  @Input() public classNames: string = '';

  
}
