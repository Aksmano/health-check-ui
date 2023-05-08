import { Component } from '@angular/core';
import { AppointmentService } from 'src/app/data/services/appointment/appointment.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  constructor(
    private readonly appointmentsService: AppointmentService
  ) {}
}
