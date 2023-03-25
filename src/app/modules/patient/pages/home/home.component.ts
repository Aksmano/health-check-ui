import { Component } from '@angular/core';
import { AutoCompleteItem } from 'src/app/data/model/entities/AutoComplete';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  public cities: AutoCompleteItem[] = [
    {
      name: 'Krakow',
      code: 'KR'
    },
    {
      name: 'Warszawa',
      code: 'WW'
    },
    {
      name: 'Poznan',
      code: 'PO'
    },
    {
      name: 'Wrocław',
      code: 'WR'
    },
    {
      name: 'Gdańsk',
      code: 'GD'
    }
  ]
  public selectedCity: AutoCompleteItem = {} as AutoCompleteItem;
  public filteredCities: AutoCompleteItem[] = [];

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
