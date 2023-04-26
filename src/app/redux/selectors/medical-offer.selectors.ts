import { createSelector } from "@ngrx/store";
import { AppState } from "../index.reducers";

const medicalOfferState = (state: AppState) => state.medicalOffer;

export const selectLocations = createSelector(
    medicalOfferState,
    state => state.locations
);

export const selectIsFetchingCities = createSelector(
    medicalOfferState,
    state => state.fetchingCities
);

export const selectOffers = createSelector(
    medicalOfferState,
    state => state.offers
);

export const selectAreOffersLoading = createSelector(
    medicalOfferState,
    state => state.loadingOffers
);