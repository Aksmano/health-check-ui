import { createReducer, on } from "@ngrx/store";
import { LocationSearchItem } from "src/app/data/model/entities/AutoComplete";
import { MedicalOfferItem } from "src/app/data/model/entities/MedicalOffer";
import * as SearchOfferActions from "../actions/medical-offer.actions"

export interface MedicalOfferState {
    locations: LocationSearchItem[];
    offers: MedicalOfferItem[];
    fetchingCities: boolean;
    fetchingDoctors: boolean;
    loadingOffers: boolean;
};

const initialState: MedicalOfferState = {
    locations: [],
    offers: [],
    fetchingCities: false,
    fetchingDoctors: false,
    loadingOffers: false
};

export const medicalOfferReducer = createReducer(
    initialState,
    on(SearchOfferActions.fetchCitiesRequest,
        state => ({
            ...state,
            fetchingCities: true
        })),
    on(SearchOfferActions.fetchCitiesSuccess,
        (state, { locations }) => ({
            ...state,
            locations: locations,
            fetchingCities: false
        })),
    on(SearchOfferActions.loadMedicalOffersRequest,
        state => ({
            ...state
        })
    ),
    on(SearchOfferActions.loadMedicalOffersSuccess,
        (state, { medicalOfferItems }) => ({
            ...state,
            offers: medicalOfferItems
        })
    )
);