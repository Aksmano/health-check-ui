import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PrimeNGConfig } from 'primeng/api';
import { fetchCitiesRequest } from './redux/actions/medical-offer.actions';
import { AppState } from './redux/index.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private readonly primengConfig: PrimeNGConfig,
    private readonly store: Store<AppState>
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.store.dispatch(fetchCitiesRequest());
  }
}
