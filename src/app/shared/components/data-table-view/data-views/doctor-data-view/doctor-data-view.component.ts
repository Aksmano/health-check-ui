import { Component, Input } from '@angular/core';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { Specialization } from 'src/app/data/model/common/Specialization';
import { Department } from 'src/app/data/model/entities/Department';
import { Doctor } from 'src/app/data/model/entities/Doctor';
import { getPathnamesList } from 'src/app/utils';

export interface DoctorScheduleDay {
  day: string;
  dayName: string;
  hours: {
    date: Date,
    displayHour: string
  }[];
}

const dayNames = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

@Component({
  selector: 'app-doctor-data-view',
  templateUrl: './doctor-data-view.component.html',
  styleUrls: ['./doctor-data-view.component.scss']
})
export class DoctorDataViewComponent {
  @Input() doctor: Doctor = {
    personalData: {
      departmentId: 1,
      doctorUUID: '1',
      firstname: 'Mariusz',
      lastname: 'Pudzianowski',
      rate: 4,
      rateNumber: 79,
      specialization: Specialization.MUSCULOSKELETAL
    },
    schedulesAppointments: {
      schedules: [
        {
          startDateTime: new Date(2023, 3, 4, 10, 0, 0),
          endDateTime: new Date(2023, 3, 4, 10, 15, 0)
        },
        {
          startDateTime: new Date(2023, 3, 4, 15, 0, 0),
          endDateTime: new Date(2023, 3, 4, 15, 15, 0)
        },
        {
          startDateTime: new Date(2023, 3, 5, 13, 0, 0),
          endDateTime: new Date(2023, 3, 5, 13, 15, 0)
        },
        {
          startDateTime: new Date(2023, 3, 6, 13, 15, 0),
          endDateTime: new Date(2023, 3, 6, 13, 30, 0)
        },
        {
          startDateTime: new Date(2023, 3, 7, 13, 45, 0),
          endDateTime: new Date(2023, 3, 7, 14, 0, 0)
        },
        {
          startDateTime: new Date(2023, 3, 8, 14, 0, 0),
          endDateTime: new Date(2023, 3, 8, 14, 15, 0)
        },
        {
          startDateTime: new Date(2023, 3, 9, 14, 15, 0),
          endDateTime: new Date(2023, 3, 9, 14, 30, 0)
        }
      ],
      appointments: []
    },
    department: {
      address: {
        apartmentNumber: '12',
        city: 'Krakow',
        county: 'Krakowskie',
        houseNumber: '15',
        postalCode: '30-668',
        post: 'idk',
        province: 'malopolska',
        street: 'Florianska',
        country: 'Poland'
      },
      id: 1,
      name: 'Big medical facility'
    },
  };

  public doctorScheduleDays: DoctorScheduleDay[] = [];

  constructor(
    private readonly navigationService: NavigationService
  ) {
    this.getDoctorSchedule();
  }

  public redirectToOfferPage() {
    this.navigationService.toPatientsPortal(['doctors', `${this.doctor.personalData!.doctorUUID}`])
  }

  public getDoctorDepartmentAddress() {
    const address = this.doctor.department!.address;
    return `${address.street} ${address.houseNumber}${!!address.apartmentNumber ? '/' + address.apartmentNumber : ''}, ${address.postalCode}, ${address.city}`;
  }

  public redirectToAppointmentForm() {
    console.log([...getPathnamesList(), `appointment-form`]);

    this.navigationService.toLocation([...getPathnamesList(), `appointment-form`]);
  }

  public getDoctorSpecialization() {
    const specName = Specialization[this.doctor.personalData!.specialization].split('_');

    return specName.map(word => word[0] + word.substring(1).toLocaleLowerCase()).join(' ');
  }

  public getDoctorSchedule(): void {
    const min15 = 1000 * 60 * 15; // equivalent of 15 minutes in ms

    this.doctor.schedulesAppointments!.schedules.forEach(schedule => {
      const foundResult = this.doctorScheduleDays
        .find(day => day.day === schedule.startDateTime.toLocaleDateString())

      const doctorSchedule = foundResult ?? {
        day: schedule.startDateTime.toLocaleDateString(),
        dayName: dayNames[schedule.startDateTime.getDay()],
        hours: []
      } as DoctorScheduleDay;

      if (!foundResult)
        this.doctorScheduleDays.push(doctorSchedule);

      doctorSchedule.hours.push({
        date: schedule.startDateTime,
        displayHour: schedule.startDateTime.toLocaleTimeString()
      })

      // for (let i = 0; schedule.startDateTime.getTime() + (min15 * i) < schedule.endDateTime.getTime(); i++) {
      //   const scheduleDate = new Date(schedule.startDateTime.getTime() + (min15 * i));

      //   doctorSchedule.hours.push({
      //     date: scheduleDate,
      //     displayHour: scheduleDate.toLocaleTimeString()
      //   });
      // }
    });
  }
}