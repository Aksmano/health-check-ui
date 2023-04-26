import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { medicalOfferReducer, MedicalOfferState } from './reducers/medical-offer.reducer';
import { userInfoReducer, KeycloakInfoState } from './reducers/user-info-reducers/keycloak-info.reducer';
import { doctorInfoReducer, DoctorInfoState } from './reducers/user-info-reducers/doctor-info.reducer';
import { departmentReducer, DepartmentsState } from './reducers/departments.reducer';

export interface AppState {
  medicalOffer: MedicalOfferState,
  userInfo: KeycloakInfoState,
  doctorInfo: DoctorInfoState,
  department: DepartmentsState
}

export const reducers: ActionReducerMap<AppState> = {
  medicalOffer: medicalOfferReducer,
  userInfo: userInfoReducer,
  doctorInfo: doctorInfoReducer,
  department: departmentReducer
};


export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
