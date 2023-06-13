import { Component } from '@angular/core';
import { EntityView } from '../../entity-view.abstract';
import { ParamMap } from '@angular/router';
import { PatientService } from 'src/app/data/services/patient/patient.service';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.scss']
})
export class PatientViewComponent extends EntityView {

  constructor(
    private readonly patientService: PatientService,
    private readonly navigationService: NavigationService,
    override readonly toastService: ToastService
  ) { super(toastService); }

  override queryParamsModifyMode(params: ParamMap): void {
    throw new Error('Method not implemented.');
  }
  override queryParamsCreateMode(params: ParamMap): void {
    throw new Error('Method not implemented.');
  }
  override createEntity(): void {
    throw new Error('Method not implemented.');
  }
  override updateEntity(): void {
    throw new Error('Method not implemented.');
  }
  override deleteEntity(): void {
    throw new Error('Method not implemented.');
  }
  override navigate(): void {
    throw new Error('Method not implemented.');
  }

}
