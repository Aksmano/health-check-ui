import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { medicalOfferReducer, MedicalOfferState } from './reducers/medical-offer.reducer';
import { userInfoReducer, UserInfoState } from './reducers/user-info.reducer';

export interface AppState {
  medicalOffer: MedicalOfferState,
  userInfo: UserInfoState
}

export const reducers: ActionReducerMap<AppState> = {
  medicalOffer: medicalOfferReducer,
  userInfo: userInfoReducer
};


export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
