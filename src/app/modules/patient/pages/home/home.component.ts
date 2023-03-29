import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { AutoCompleteEvent, AutoCompleteItem, LocationSearchItem } from 'src/app/data/model/entities/AutoComplete';
import { MedicalOfferService } from 'src/app/data/services/medical-facility/medical-offer.service';
import { fetchCitiesRequest } from 'src/app/redux/actions/medical-offer.actions';
import { AppState } from 'src/app/redux/index.reducers';
import { selectIsFetchingCities, selectLocations } from 'src/app/redux/selectors/medical-offer.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public selectedCity: AutoCompleteItem = {} as AutoCompleteItem;
  public selectedAddress: AutoCompleteItem = {} as AutoCompleteItem;

  public cityPicked = false;
  public addressPicked = false;
  public fetchingCities = false;

  public filteredCities: AutoCompleteItem[] = [];
  public filteredAddresses: AutoCompleteItem[] = [];

  private cities: LocationSearchItem[] = [];
  private addresses: AutoCompleteItem[] = [];

  private readonly ngUnsubscribe = new Subject();

  constructor(
    private readonly store: Store<AppState>,
    private readonly navigationService: NavigationService
  ) { }

  ngOnInit() {
    this.store.select(selectLocations)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(locations => {
        console.log(locations);

        this.cities = locations
      });
    this.store.select(selectIsFetchingCities)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(fetchingCities => {
        console.log(fetchingCities);

        this.fetchingCities = fetchingCities
      });
  }

  public onCitySelect(value: LocationSearchItem) {
    this.addresses = value.addresses;
    this.selectedAddress = {} as AutoCompleteItem;
    this.cityPicked = true;
    this.addressPicked = false;

    this.filterAddresses({ query: '' } as AutoCompleteEvent);
  }

  public filterCity(event: AutoCompleteEvent) {
    this.filteredCities = this.cities.
      filter(city => city.name.toLowerCase().indexOf(event.query.toLowerCase()) === 0);
  }

  public filterAddresses(event: AutoCompleteEvent) {
    this.filteredAddresses = this.addresses
      .filter(address => address.name.toLowerCase().indexOf(event.query.toLowerCase()) === 0)
  }

  public searchForAvailableAppointments() {
    this.navigationService.toPatientsPortal([`catalog`], {
      queryParams: {
        city: this.selectedCity.name,
        address: this.selectedAddress.name
      }
    });
  }
}
