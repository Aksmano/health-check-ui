import { getFriendlyEnumName } from "src/app/utils";

export enum Specialization {
    ANESTHESIA = "ANESTHESIA",
    CARDIOVASCULAR = "CARDIOVASCULAR",
    COMMUNITYHEALTH = "COMMUNITYHEALTH",
    DENTISTRY = "DENTISTRY",
    DERMATOLOGY = "DERMATOLOGY",
    DIETNUTRITION = "DIETNUTRITION",
    EMERGENCY = "EMERGENCY",
    ENDOCRINE = "ENDOCRINE",
    GASTROENTEROLOGIC = "GASTROENTEROLOGIC",
    GENETIC = "GENETIC",
    GERIATRIC = "GERIATRIC",
    GYNECOLOGIC = "GYNECOLOGIC",
    HEMATOLOGIC = "HEMATOLOGIC",
    INFECTIOUS = "INFECTIOUS",
    LABORATORYSCIENCE = "LABORATORYSCIENCE",
    MIDWIFERY = "MIDWIFERY",
    MUSCULOSKELETAL = "MUSCULOSKELETAL",
    NEUROLOGIC = "NEUROLOGIC",
    NURSING = "NURSING",
    OBSTETRIC = "OBSTETRIC",
    ONCOLOGIC = "ONCOLOGIC",
    OPTOMETRIC = "OPTOMETRIC",
    OTOLARYNGOLOGIC = "OTOLARYNGOLOGIC",
    PATHOLOGY = "PATHOLOGY",
    PEDIATRIC = "PEDIATRIC",
    PHARMACYSPECIALTY = "PHARMACYSPECIALTY",
    PHYSIOTHERAPY = "PHYSIOTHERAPY",
    PLASTICSURGERY = "PLASTICSURGERY",
    PODIATRIC = "PODIATRIC",
    PRIMARYCARE = "PRIMARYCARE",
    PSYCHIATRIC = "PSYCHIATRIC",
    PUBLICHEALTH = "PUBLICHEALTH",
    PULMONARY = "PULMONARY",
    RADIOGRAPHY = "RADIOGRAPHY",
    RENAL = "RENAL",
    RESPIRATORYTHERAPY = "RESPIRATORYTHERAPY",
    RHEUMATOLOGIC = "RHEUMATOLOGIC",
    SPEECHPATHOLOGY = "SPEECHPATHOLOGY",
    SURGICAL = "SURGICAL",
    TOXICOLOGIC = "TOXICOLOGIC",
    UROLOGIC = "UROLOGIC"
}

export const specializationDropdownList: { name: string, code: string }[] = [
    { name: getFriendlyEnumName(Specialization.ANESTHESIA), code: Specialization.ANESTHESIA },
    { name: getFriendlyEnumName(Specialization.CARDIOVASCULAR), code: Specialization.CARDIOVASCULAR },
    { name: getFriendlyEnumName(Specialization.COMMUNITYHEALTH), code: Specialization.COMMUNITYHEALTH },
    { name: getFriendlyEnumName(Specialization.DENTISTRY), code: Specialization.DENTISTRY },
    { name: getFriendlyEnumName(Specialization.DERMATOLOGY), code: Specialization.DERMATOLOGY },
    { name: getFriendlyEnumName(Specialization.DIETNUTRITION), code: Specialization.DIETNUTRITION },
    { name: getFriendlyEnumName(Specialization.EMERGENCY), code: Specialization.EMERGENCY },
    { name: getFriendlyEnumName(Specialization.ENDOCRINE), code: Specialization.ENDOCRINE },
    { name: getFriendlyEnumName(Specialization.GASTROENTEROLOGIC), code: Specialization.GASTROENTEROLOGIC },
    { name: getFriendlyEnumName(Specialization.GENETIC), code: Specialization.GENETIC },
    { name: getFriendlyEnumName(Specialization.GERIATRIC), code: Specialization.GERIATRIC },
    { name: getFriendlyEnumName(Specialization.GYNECOLOGIC), code: Specialization.GYNECOLOGIC },
    { name: getFriendlyEnumName(Specialization.HEMATOLOGIC), code: Specialization.HEMATOLOGIC },
    { name: getFriendlyEnumName(Specialization.INFECTIOUS), code: Specialization.INFECTIOUS },
    { name: getFriendlyEnumName(Specialization.LABORATORYSCIENCE), code: Specialization.LABORATORYSCIENCE },
    { name: getFriendlyEnumName(Specialization.MIDWIFERY), code: Specialization.MIDWIFERY },
    { name: getFriendlyEnumName(Specialization.MUSCULOSKELETAL), code: Specialization.MUSCULOSKELETAL },
    { name: getFriendlyEnumName(Specialization.NEUROLOGIC), code: Specialization.NEUROLOGIC },
    { name: getFriendlyEnumName(Specialization.NURSING), code: Specialization.NURSING },
    { name: getFriendlyEnumName(Specialization.OBSTETRIC), code: Specialization.OBSTETRIC },
    { name: getFriendlyEnumName(Specialization.ONCOLOGIC), code: Specialization.ONCOLOGIC },
    { name: getFriendlyEnumName(Specialization.OPTOMETRIC), code: Specialization.OPTOMETRIC },
    { name: getFriendlyEnumName(Specialization.OTOLARYNGOLOGIC), code: Specialization.OTOLARYNGOLOGIC },
    { name: getFriendlyEnumName(Specialization.PATHOLOGY), code: Specialization.PATHOLOGY },
    { name: getFriendlyEnumName(Specialization.PEDIATRIC), code: Specialization.PEDIATRIC },
    { name: getFriendlyEnumName(Specialization.PHARMACYSPECIALTY), code: Specialization.PHARMACYSPECIALTY },
    { name: getFriendlyEnumName(Specialization.PHYSIOTHERAPY), code: Specialization.PHYSIOTHERAPY },
    { name: getFriendlyEnumName(Specialization.PLASTICSURGERY), code: Specialization.PLASTICSURGERY },
    { name: getFriendlyEnumName(Specialization.PODIATRIC), code: Specialization.PODIATRIC },
    { name: getFriendlyEnumName(Specialization.PRIMARYCARE), code: Specialization.PRIMARYCARE },
    { name: getFriendlyEnumName(Specialization.PSYCHIATRIC), code: Specialization.PSYCHIATRIC },
    { name: getFriendlyEnumName(Specialization.PUBLICHEALTH), code: Specialization.PUBLICHEALTH },
    { name: getFriendlyEnumName(Specialization.PULMONARY), code: Specialization.PULMONARY },
    { name: getFriendlyEnumName(Specialization.RADIOGRAPHY), code: Specialization.RADIOGRAPHY },
    { name: getFriendlyEnumName(Specialization.RENAL), code: Specialization.RENAL },
    { name: getFriendlyEnumName(Specialization.RESPIRATORYTHERAPY), code: Specialization.RESPIRATORYTHERAPY },
    { name: getFriendlyEnumName(Specialization.RHEUMATOLOGIC), code: Specialization.RHEUMATOLOGIC },
    { name: getFriendlyEnumName(Specialization.SPEECHPATHOLOGY), code: Specialization.SPEECHPATHOLOGY },
    { name: getFriendlyEnumName(Specialization.SURGICAL), code: Specialization.SURGICAL },
    { name: getFriendlyEnumName(Specialization.TOXICOLOGIC), code: Specialization.TOXICOLOGIC },
    { name: getFriendlyEnumName(Specialization.UROLOGIC), code: Specialization.UROLOGIC },
]