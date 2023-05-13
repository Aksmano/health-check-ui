import {Component} from '@angular/core';
import {TestType} from "../../../../../data/model/common/TestType";
import {MedicalTestRS} from "../../../../../data/model/dto/rs/MedicalTestRS";
import {getTypesAsDropdownItem} from "../../../utils/TestTypeUtils";

@Component({
  selector: 'app-medical-test-visits-receptionist',
  templateUrl: './medical-tests-visits-receptionist.component.html',
  styleUrls: ['./medical-tests-visits-receptionist.component.scss']
})
export class MedicalTestsVisitsReceptionistComponent {
  protected selectedTestType: any;
  protected startDate: Date | undefined;
  protected endDate: Date | undefined;
  protected visits: MedicalTestRS[] | undefined;
  public testTypes: any[] = getTypesAsDropdownItem();

}
