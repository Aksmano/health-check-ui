import { createSelector } from "@ngrx/store";
import { AppState } from "../index.reducers";

const userInfoState = (state: AppState) => state.userInfo;

export const selectUserProfile = createSelector(
    userInfoState,
    state => state.userProfile
);

export const selectIsLoadingUserProfile = createSelector(
    userInfoState,
    state => state.loadingUserProfile
);
