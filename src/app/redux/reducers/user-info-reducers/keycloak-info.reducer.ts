import { createReducer, on } from "@ngrx/store";
import { KeycloakProfile } from "keycloak-js";
import * as KeycloakInfoActions from "../../actions/user-info-actions/keylcloak-info.actions";
import { Patient } from "src/app/data/model/entities/Patient";
import { Doctor } from "src/app/data/model/entities/Doctor";
import { UserType } from "src/app/data/model/common/UserType";
import { WithProcessIndicator, newWPI } from "src/app/data/model/utils/WithProcessIndicator";

export interface KeycloakInfoState {
    keycloakInfo: WithProcessIndicator<{
        profile?: KeycloakProfile,
        roles?: string[];
        userType: UserType;
    }>;

};

const initialState: KeycloakInfoState = {
    keycloakInfo: newWPI({
        profile: undefined,
        roles: undefined,
        userType: UserType.Guest
    })
};

export const userInfoReducer = createReducer(
    initialState,
    // on(KeycloakInfoActions.loadKeycloakInfoRequest,
    //     () => ({
    //         keycloakInfo: newWPI({
    //             profile: undefined,
    //             roles: undefined,
    //             userType: UserType.Guest
    //         }, true)
    //     })),
    on(KeycloakInfoActions.loadKeycloakInfoSuccess,
        state => ({
            ...state,
            keycloakInfo: {
                ...state.keycloakInfo,
                isProcessOngoing: false
            }
        })),
    on(KeycloakInfoActions.setKeycloakProfile,
        (state, { keycloakProfile }) => ({
            ...state,
            keycloakInfo: {
                ...state.keycloakInfo,
                data: {
                    ...state.keycloakInfo.data!,
                    profile: keycloakProfile
                }
            }
        })),
    on(KeycloakInfoActions.setUserRoles,
        (state, { userRoles }) => ({
            ...state,
            keycloakInfo: {
                ...state.keycloakInfo,
                data: {
                    ...state.keycloakInfo.data!,
                    roles: userRoles
                }
            }
        })),
    on(KeycloakInfoActions.setUserType,
        (state, { userType }) => ({
            ...state,
            keycloakInfo: {
                ...state.keycloakInfo,
                data: {
                    ...state.keycloakInfo.data!,
                    userType: userType
                }
            }
        }))
);