import { Component, Input, OnInit } from '@angular/core';
import { TableViewType } from '../../table-view.component';
import { ReceptionistRS } from 'src/app/data/model/dto/rs/employeeRS/ReceptionistRS';

@Component({
  selector: 'app-receptionist-view',
  templateUrl: './receptionist-view.component.html',
  styleUrls: ['./receptionist-view.component.scss']
})
export class ReceptionistViewComponent {
  @Input() public viewType: TableViewType = TableViewType.Receptionist;
  @Input() public values: ReceptionistRS[] = [];
  @Input() public loadingValues: boolean = false;
  @Input() public rows: number = 0;
  @Input() public paginator: boolean = false;
  @Input() public classNames: string = '';

  constructor() {
    console.log(this.values);
  }
}