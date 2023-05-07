import {Component, OnDestroy, OnInit} from '@angular/core';
import {MedicalTestsService} from "../../../../../data/services/medical-test/medical-tests.service";
import {DepartmentRS} from "../../../../../data/model/dto/rs/DepartmentRS";
import {DepartmentServiceImpl} from "../../../../../data/services/department/department.service";
import {Subscription} from "rxjs";
import {TestType} from "../../../../../data/model/common/TestType";
import {NavigationService} from "../../../../../core/services/navigation/navigation.service";

@Component({
  selector: 'app-medical-tests-patient',
  templateUrl: './medical-tests-search-patient.component.html',
  styleUrls: ['./medical-tests-search-patient.component.scss']
})
export class MedicalTestsSearchPatientComponent implements OnInit, OnDestroy {

  protected departments: DepartmentRS[] = [];
  protected filteredDepartments: DepartmentRS[] = [];
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

  protected selectedTestType: any;
  protected selectedCity: any;
  protected selectedCountry: any;
  protected selectedCounty: any;
  protected selectedStreet: any;
  protected selectedName: any;


  constructor(private readonly departmentService: DepartmentServiceImpl,
              private readonly navigationService: NavigationService) {
  }

  ngOnInit(): void {
    this.departmentSub = this.departmentService.getDepartmentsByCriteria()
      .subscribe((data) => {
        this.departments = data;
        this.filteredDepartments = this.departments;
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
      this.filteredDepartments = this.departments
        .filter(dep => {
          return dep.address.country === this.selectedCountry.name;
        });
      console.log(this.filteredDepartments);
      this.counties = Array.from((new Set(this.filteredDepartments.map(dep => dep.address.county))).values())
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
      this.filteredDepartments = this.departments
        .filter(dep => {
          return (dep.address.county === this.selectedCounty.name) &&
            (dep.address.country === this.selectedCountry.name);
        });
      console.log(this.filteredDepartments);

      this.cities = Array.from((new Set(this.filteredDepartments.map(dep => dep.address.city))).values())
        .map(x => {
          return this.mapToDropdownItem(x)
        });
    }

  }

  filterByCity() {
    this.selectedStreet = undefined;
    this.selectedName = undefined;
    if (this.departments) {
      this.filteredDepartments = this.departments
        .filter(dep => {
          return (dep.address.city === this.selectedCity.name) &&
            (dep.address.county === this.selectedCounty.name) &&
            (dep.address.country === this.selectedCountry.name);
        });
      console.log(this.filteredDepartments);
    }
  }

  searchForAvailableSchedules(depId: number) {
    console.log(depId)
    console.log(this.selectedTestType)
    this.navigationService.toMedicalTestScheduleByDepartment([], {
      queryParams: {
        departmentId: depId,
        testType: this.selectedTestType.name
      }
    });
  }

  ngOnDestroy(): void {
    if (this.departmentSub) {
      this.departmentSub.unsubscribe();
    }
  }
}
