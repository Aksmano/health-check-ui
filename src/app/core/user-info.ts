import { KeycloakService } from "keycloak-angular";
import { UserType } from "../data/model/common/UserType";
import { AdministrationServiceImpl } from "../data/services/administration/administration.service";
import { DoctorServiceImpl } from "../data/services/doctor/doctor.service";
import { PatientService } from "../data/services/patient/patient.service";
import { ReceptionistService } from "../data/services/receptionist/receptionist.service";
import { KeycloakProfile } from "keycloak-js";
import { DepartmentRS } from "../data/model/dto/rs/DepartmentRS";
import { DepartmentServiceImpl } from "../data/services/department/department.service";
import { PatientRS } from "../data/model/dto/rs/PatientRS";

export class UserInfo {

    public static role: UserType = UserType.Guest;
    public static profile?: KeycloakProfile;
    public static deptId?: number;
    public static patientData?: PatientRS;

    public loaded: boolean = false;

    constructor(
        private readonly doctorService: DoctorServiceImpl,
        private readonly adminService: AdministrationServiceImpl,
        private readonly patientService: PatientService,
        private readonly receptionistService: ReceptionistService,
        private readonly departmentService: DepartmentServiceImpl,
        private readonly keycloak: KeycloakService
    ) {
        if (this.keycloak.isUserInRole(UserType.Admin)) {
            this.setUserData(UserType.Admin)
        } else if (this.keycloak.isUserInRole(UserType.Superadmin)) {
            this.setUserData(UserType.Superadmin)
        } else if (this.keycloak.isUserInRole(UserType.Doctor)) {
            this.setUserData(UserType.Doctor)
        } else if (this.keycloak.isUserInRole(UserType.Receptionist)) {
            this.setUserData(UserType.Receptionist)
        } else if (this.keycloak.isUserInRole(UserType.Patient)) {
            this.setUserData(UserType.Patient)
        }

        this.loaded = true;
    }

    private setUserData(userType: UserType) {
        UserInfo.role = userType;

        this.keycloak.loadUserProfile()
            .then(profile => {
                UserInfo.profile = profile;
                if (!!UserInfo.profile) {
                    if (userType === UserType.Doctor) {
                        this.doctorService.getDoctorById(UserInfo.profile.id!)
                            .subscribe(res => UserInfo.deptId = res.departmentId)
                    }
                    if (userType === UserType.Admin) {
                        this.departmentService.getDepartmentByAdministratorUUID(UserInfo.profile.id!)
                            .subscribe(res => UserInfo.deptId = res.id)
                    }
                    if (userType === UserType.Receptionist) {
                        this.receptionistService.getReceptionistByUUID(UserInfo.profile.id!)
                            .subscribe(res => UserInfo.deptId = res.departmentId)
                    }
                    if (userType === UserType.Patient) {
                        this.patientService.getPatientData()
                            .subscribe(res => UserInfo.patientData = res);
                    }
                }
            });
    }
}
