import { Injectable } from "@angular/core";
import { Actions, createEffect, defaultEffectsErrorHandler, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, switchMap } from "rxjs/operators";
import { MedicalOfferService } from "src/app/data/services/medical-facility/medical-offer.service";
import { effectErrorHandler } from "../actions/error-action";
import { fetchCitiesRequest, fetchCitiesSuccess, loadMedicalOffersRequest, loadMedicalOffersSuccess, MedicalOfferActionType } from "../actions/medical-offer.actions";
import { AppState } from "../index.reducers";

@Injectable()
export class MedicalOfferEffects {

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<AppState>,
        private readonly medicalOfferService: MedicalOfferService
    ) { }

    public readonly fetchCities$ = createEffect(() => this.actions$.pipe(
        ofType(fetchCitiesRequest),
        switchMap(() => this.medicalOfferService.getMedicalFacilitiesCities()),
        map(locations => fetchCitiesSuccess({ locations: locations })),
        catchError((err, caught) => {
            const errorAction = effectErrorHandler('fetchCities', err);
            this.store.dispatch(errorAction);

            return caught;
        })
    ))

    public readonly loadOffersForAddress$ = createEffect(() => this.actions$.pipe(
        ofType(loadMedicalOffersRequest),
        switchMap((action) => {
            console.log(action);
            
            return this.medicalOfferService.getMedicalOffers(action.city, action.address)
        }),
        map(offerItems => loadMedicalOffersSuccess({ medicalOfferItems: offerItems })),
        catchError((err, caught) => {
            const errorAction = effectErrorHandler('loadOffers', err);
            this.store.dispatch(errorAction);

            return caught;
        })
    ))
}