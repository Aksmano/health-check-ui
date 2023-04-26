import { Component } from '@angular/core';
import { ViewType } from 'src/app/shared/components/data-table-view/data-table-view.component';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})

export class PanelComponent {
  public viewType: ViewType = ViewType.Appointment;
}
