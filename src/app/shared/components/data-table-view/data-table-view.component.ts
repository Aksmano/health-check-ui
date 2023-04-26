import { Component, Input } from '@angular/core';

export enum ViewType {
  Doctor = "Doctor",
  Appointment = "Appointment",
  MedTest = "MedTest",
  Prescription = "Prescription"
}

@Component({
  selector: 'app-data-table-view',
  templateUrl: './data-table-view.component.html',
  styleUrls: ['./data-table-view.component.scss']
})
export class DataTableViewComponent {
  @Input() public viewType: ViewType = ViewType.Doctor;
  @Input() public values: any[] = [];
  @Input() public loadingValues: boolean = false;
  @Input() public rows: number = 0;
  @Input() public paginator: boolean = false;
  @Input() public classNames: string = '';

  public getRows = () => this.rows > 0 ? this.rows : 1000;
}
