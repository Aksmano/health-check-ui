import { Component } from '@angular/core';
import { DataTableViewType } from 'src/app/shared/components/data-table-view/data-table-view.component';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})

export class PanelComponent {
  public viewType: DataTableViewType = DataTableViewType.Appointment;
}
