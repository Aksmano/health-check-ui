import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { medicalOfferReducer, MedicalOfferState } from './reducers/medical-offer.reducer';

export interface AppState {
  medicalOffer: MedicalOfferState
}

export const reducers: ActionReducerMap<AppState> = {
  medicalOffer: medicalOfferReducer
};


export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
