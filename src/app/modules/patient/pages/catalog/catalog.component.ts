import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { MedicalOfferItem } from 'src/app/data/model/entities/MedicalOffer';
import { loadMedicalOffersRequest } from 'src/app/redux/actions/medical-offer.actions';
import { AppState } from 'src/app/redux/index.reducers';
import { selectOffers } from 'src/app/redux/selectors/medical-offer.selectors';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  public offers: MedicalOfferItem[] = [];

  private params: ParamMap = {} as ParamMap;
  private readonly ngUnsubscribe = new Subject();

  constructor(
    private readonly store: Store<AppState>,
    private readonly route: ActivatedRoute
  ) {
    this.route.queryParamMap
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(params => this.params = params);

    this.store.dispatch(loadMedicalOffersRequest({
      city: this.params.get('city') ?? '',
      address: this.params.get('address') ?? ''
    }));
  }

  ngOnInit(): void {
    this.store.select(selectOffers)
      .subscribe(offers => {
        this.offers = offers
      })
  }
}
