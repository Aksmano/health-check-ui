import {Component, OnInit} from '@angular/core';
import {MedicalTestService} from "../../../../../data/services/medical-test/medical-test.service";
import {DepartmentRS} from "../../../../../data/model/dto/rs/DepartmentRS";
import {DepartmentServiceImpl} from "../../../../../data/services/department/department.service";
import {Subscription} from "rxjs";
import {TestType} from "../../../../../data/model/common/TestType";
import {NavigationService} from "../../../../../core/services/navigation/navigation.service";

@Component({
  selector: 'app-medical-tests-patient',
  templateUrl: './medical-tests-patient.component.html',
  styleUrls: ['./medical-tests-patient.component.scss']
})
export class MedicalTestsPatientComponent implements OnInit {

  protected departments: DepartmentRS[] = [];
  private departmentSub: Subscription | undefined;
  protected medicalTestSchedule: String = "";

  public testTypes: any[] = Object.keys(TestType)
    .filter((item) => {
      return isNaN(Number(item));
    })
    .map(item => {
      return this.mapToDropdownItem(item);
    });
  public countries: any[] = [];
  public counties: any[] = [];
  public cities: any[] = [];
  public streets: any[] = [];
  public names: any[] = [];

  protected selectedTestType: any;
  protected selectedCity: any;
  protected selectedCountry: any;
  protected selectedCounty: any;
  protected selectedStreet: any;
  protected selectedName: any;


  constructor(private readonly departmentService: DepartmentServiceImpl,
              private readonly medicalTestService: MedicalTestService,
              private readonly navigationService: NavigationService) {
  }

  ngOnInit(): void {
    this.departmentSub = this.departmentService.getDepartmentsByCriteria()
      .subscribe((data) => {
        this.departments = data;
        if (this.departments) {
          this.countries = Array.from((new Set(this.departments.map(dep => dep.address.country))).values())
            .map(x => {
              return this.mapToDropdownItem(x)
            });
        }
      });

  }

  private mapToDropdownItem(item: any) {
    return {
      name: item,
      code: item
    }
  }

  changeCounties() {
    console.log(this.selectedCountry)
    this.selectedCounty = undefined;
    this.selectedCity = undefined;
    this.selectedStreet = undefined;
    this.selectedName = undefined;

    if (this.departments) {
      let counties = this.departments
        .filter(dep => {
          return dep.address.country === this.selectedCountry.name;
        })
        .map(dep => dep.address.county);

      this.counties = Array.from((new Set(counties)).values())
        .map(x => {
          return this.mapToDropdownItem(x)
        });
    }
  }

  changeCities() {
    this.selectedCity = undefined;
    this.selectedStreet = undefined;
    this.selectedName = undefined;
    if (this.departments) {
      let cities = this.departments
        .filter(dep => {
          return (dep.address.county === this.selectedCounty.name) &&
            (dep.address.country === this.selectedCountry.name);
        })
        .map(dep => dep.address.city);

      this.cities = Array.from((new Set(cities)).values())
        .map(x => {
          return this.mapToDropdownItem(x)
        });
    }

  }

  changeStreets() {
    this.selectedStreet = undefined;
    this.selectedName = undefined;
    if (this.departments) {
      let streets = this.departments
        .filter(dep => {
          return (dep.address.city === this.selectedCity.name) &&
            (dep.address.county === this.selectedCounty.name) &&
            (dep.address.country === this.selectedCountry.name);
        })
        .map(dep => dep.address.street);

      this.streets = Array.from((new Set(streets)).values())
        .map(x => {
          return this.mapToDropdownItem(x)
        });
    }
  }

  changeNames() {
    this.selectedName = undefined;
    if (this.departments) {
      let names = this.departments
        .filter(dep => {
          return (dep.address.street === this.selectedStreet.name) &&
            (dep.address.city === this.selectedCity.name) &&
            (dep.address.county === this.selectedCounty.name) &&
            (dep.address.country === this.selectedCountry.name);
        })
        .map(dep => dep.name);

      this.names = Array.from((new Set(names)).values())
        .map(x => {
          return this.mapToDropdownItem(x)
        });
    }
  }

  searchForAvailableSchedules() {
    let department = this.departments
      .filter(dep => {
        return (dep.name === this.selectedName.name) &&
          (dep.address.street === this.selectedStreet.name) &&
          (dep.address.city === this.selectedCity.name) &&
          (dep.address.county === this.selectedCounty.name) &&
          (dep.address.country === this.selectedCountry.name);
      })[0];


    this.navigationService.toMedicalTestScheduleByDepartment([], {queryParams:{
        departmentId:department.id,
        testType: this.selectedTestType.name
      }});
  }
}
