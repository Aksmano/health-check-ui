import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import * as constants from "constants";
import {ToastService} from "../../../../core/services/toast/toast.service";
import {PatientService} from "../../../../data/services/patient/patient.service";
import {BehaviorSubject, Subscription} from "rxjs";
import {PatientRS} from "../../../../data/model/dto/rs/PatientRS";

@Component({
  selector: 'app-patients-table',
  templateUrl: './patients-table.component.html',
  styleUrls: ['./patients-table.component.scss']
})
export class PatientsTableComponent implements OnInit, OnDestroy {

  @Input() patientUUID: string | undefined;
  @Output() patientUUIDOut = new EventEmitter<string>();
  protected currentPage$ = new BehaviorSubject(0);
  private patientsSubscription: Subscription | undefined;
  protected patients: PatientRS[] | undefined;
  protected selectedPatient: PatientRS | undefined;

  constructor(private readonly toastService: ToastService,
              private readonly patientService: PatientService) {
  }

  ngOnInit(): void {
    this.currentPage$.subscribe(page => {
      if (this.patientsSubscription) {
        this.patientsSubscription.unsubscribe();
      }
      this.patientsSubscription = this.patientService.getPatients(page).subscribe(data => {
        this.patients = data;
      }, error => {
        this.toastService.showError('Error during fetching patients. Try again later.')
      })
    })
  }

  ngOnDestroy(): void {
  }

  choosePatient() {
    this.patientUUIDOut.next!(this.selectedPatient!.patientUUID);
  }
}
