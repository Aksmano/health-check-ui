import { MedicalOfferEffects } from "./effects/medical-offer.effects";
import { DoctorInfoEffects } from "./effects/user-info-effects/doctor-info.effects";
import { UserInfoEffects } from "./effects/user-info-effects/keycloak-info.effects";

export const effects = [
    MedicalOfferEffects,
    UserInfoEffects,
    DoctorInfoEffects
]