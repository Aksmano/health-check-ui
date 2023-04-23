import { createAction, props } from "@ngrx/store";
import { LocationSearchItem } from "src/app/data/model/entities/AutoComplete";
import { MedicalOfferItem } from "src/app/data/model/entities/MedicalOffer";

export enum MedicalOfferActionType {
    FETCH_CITIES_REQUEST = '[Search Filter] Fetch Cities Request',
    FETCH_CITIES_SUCCESS = '[Search Filter] Fetch Cities Success',
    LOAD_MEDICAL_OFFERS_REQUEST = '[Search Filter] Fetch Medical Offers Request',
    LOAD_MEDICAL_OFFERS_SUCCESS = '[Search Filter] Fetch Medical Offers Success'
}

const ActionTypes = MedicalOfferActionType;

export const fetchCitiesRequest = createAction(
    ActionTypes.FETCH_CITIES_REQUEST
);

export const fetchCitiesSuccess = createAction(
    ActionTypes.FETCH_CITIES_SUCCESS,
    props<{ locations: LocationSearchItem[] }>()
);

export const loadMedicalOffersRequest = createAction(
    ActionTypes.LOAD_MEDICAL_OFFERS_REQUEST,
    props<{ city: string, address: string}>()
);

export const loadMedicalOffersSuccess = createAction(
    ActionTypes.LOAD_MEDICAL_OFFERS_SUCCESS,
    props<{ medicalOfferItems: MedicalOfferItem[] }>()
);
