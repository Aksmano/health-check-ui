import { Component, Input } from '@angular/core';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { Department } from 'src/app/data/model/entities/Department';
import { Doctor, Specialization } from 'src/app/data/model/entities/Doctor';
import { MedicalOfferItem } from 'src/app/data/model/entities/MedicalOffer';
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
  selector: 'app-doctors-card',
  templateUrl: './doctors-card.component.html',
  styleUrls: ['./doctors-card.component.scss']
})
export class DoctorsCardComponent {
  @Input() doctor: Doctor = {
    id: 1,
    firstName: 'Mariusz',
    lastName: 'Pudzianowski',
    specialization: Specialization.MUSCULOSKELETAL,
    appointments: [],
    schedules: [
      {
        startDateTime: new Date(2023, 3, 4, 10, 0, 0),
        endDateTime: new Date(2023, 3, 4, 12, 0, 0)
      },
      {
        startDateTime: new Date(2023, 3, 4, 15, 0, 0),
        endDateTime: new Date(2023, 3, 4, 17, 0, 0)
      },
      {
        startDateTime: new Date(2023, 3, 5, 13, 0, 0),
        endDateTime: new Date(2023, 3, 5, 17, 0, 0)
      },
      {
        startDateTime: new Date(2023, 3, 6, 13, 0, 0),
        endDateTime: new Date(2023, 3, 6, 17, 0, 0)
      },
      {
        startDateTime: new Date(2023, 3, 7, 13, 0, 0),
        endDateTime: new Date(2023, 3, 7, 17, 0, 0)
      },
      {
        startDateTime: new Date(2023, 3, 8, 13, 0, 0),
        endDateTime: new Date(2023, 3, 8, 17, 0, 0)
      },
      {
        startDateTime: new Date(2023, 3, 9, 13, 0, 0),
        endDateTime: new Date(2023, 3, 9, 17, 0, 0)
      }
    ],
    department: {
      address: {
        apartmentNumber: '12',
        city: 'Krakow',
        county: 'Krakowskie',
        houseNumber: '15',
        postalCode: '30-668',
        id: 1,
        post: 'idk',
        province: 'malopolska',
        street: 'Florianska'
      },
      doctors: [],
      id: 1,
      name: 'Big medical facility'
    } as Department,
    rating: 4,
    numberOfRatings: 79
  };

  public doctorScheduleDays: DoctorScheduleDay[] = [];

  constructor(
    private readonly navigationService: NavigationService
  ) {
    this.getDoctorSchedule();
  }

  public redirectToOfferPage() {
    this.navigationService.toPatientsPortal(['doctors', `${this.doctor.id}`])
  }

  public getDoctorDepartmentAddress() {
    const address = this.doctor.department.address;
    return `${address.street} ${address.houseNumber}${!!address.apartmentNumber ? '/' + address.apartmentNumber : ''}, ${address.postalCode}, ${address.city}`;
  }

  public redirectToAppointmentForm() {
    console.log([...getPathnamesList(), `appointment-form`]);
    
    this.navigationService.toLocation([...getPathnamesList(), `appointment-form`]);
  }

  public getDoctorSpecialization() {
    const specName = Specialization[this.doctor.specialization].split('_');

    return specName.map(word => word[0] + word.substring(1).toLocaleLowerCase()).join(' ');
  }

  public getDoctorSchedule(): void {
    const min15 = 1000 * 60 * 15; // equivalent of 15 minutes in ms

    this.doctor.schedules.forEach(schedule => {
      const foundResult = this.doctorScheduleDays
        .find(day => day.day === schedule.startDateTime.toLocaleDateString())

      const doctorSchedule = foundResult ?? {
        day: schedule.startDateTime.toLocaleDateString(),
        dayName: dayNames[schedule.startDateTime.getDay()],
        hours: []
      } as DoctorScheduleDay;

      if (!foundResult)
        this.doctorScheduleDays.push(doctorSchedule);

      for (let i = 0; schedule.startDateTime.getTime() + (min15 * i) < schedule.endDateTime.getTime(); i++) {
        const scheduleDate = new Date(schedule.startDateTime.getTime() + (min15 * i));

        doctorSchedule.hours.push({
          date: scheduleDate,
          displayHour: scheduleDate.toLocaleTimeString()
        });
      }
    });
  }
}
