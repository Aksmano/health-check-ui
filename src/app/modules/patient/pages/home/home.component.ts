import { Component, OnInit } from '@angular/core';
import { AutoCompleteItem } from 'src/app/data/model/entities/AutoComplete';
import { MedicalFacilityService } from 'src/app/data/services/medical-facility/medical-facility.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public selectedCity: AutoCompleteItem = {} as AutoCompleteItem;
  public filteredCities: AutoCompleteItem[] = [];

  private cities: AutoCompleteItem[] = [];

  constructor(
    private readonly medicalFacilityService: MedicalFacilityService
  ) { }

  ngOnInit() {
    this.medicalFacilityService
      .getMedicalFacilitiesCities()
      .subscribe((cities) => this.cities = cities);
  }

  public filterCity(event: any) {
    let filtered: AutoCompleteItem[] = [];
    let query = event.query;

    for (let i = 0; i < this.cities.length; i++) {
      let city = this.cities[i];

      if (city.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(city);
        console.log(city);
      }
    }

    this.filteredCities = filtered;
  }
}
