import { Appointment } from "./Appointment";
import { Department } from "./Department";
import { Person } from "./Person";
import { Rating } from "./Rating";
import { Schedule } from "./Schedule";

export interface Doctor extends Person{
    department: Department;
    specialization: Specialization;
    schedules: Schedule[];
    appointments: Appointment[];
    rating: number;
    numberOfRatings: number;
}

export enum Specialization {
    ANESTHESIA,
    CARDIOVASCULAR,
    COMMUNITYHEALTH,
    DENTISTRY,
    DERMATOLOGY,
    DIETNUTRITION,
    EMERGENCY,
    ENDOCRINE,
    GASTROENTEROLOGIC,
    GENETIC,
    GERIATRIC,
    GYNECOLOGIC,
    HEMATOLOGIC,
    INFECTIOUS,
    LABORATORYSCIENCE,
    MIDWIFERY,
    MUSCULOSKELETAL,
    NEUROLOGIC,
    NURSING,
    OBSTETRIC,
    ONCOLOGIC,
    OPTOMETRIC,
    OTOLARYNGOLOGIC,
    PATHOLOGY,
    PEDIATRIC,
    PHARMACYSPECIALTY,
    PHYSIOTHERAPY,
    PLASTICSURGERY,
    PODIATRIC,
    PRIMARYCARE,
    PSYCHIATRIC,
    PUBLICHEALTH,
    PULMONARY,
    RADIOGRAPHY,
    RENAL,
    RESPIRATORYTHERAPY,
    RHEUMATOLOGIC,
    SPEECHPATHOLOGY,
    SURGICAL,
    TOXICOLOGIC,
    UROLOGIC
}
