import { AutoCompleteItem, LocationSearchItem } from "../../model/entities/AutoComplete";
import { MedicalOfferItem, MedicalOfferItemCategoryType } from "../../model/entities/MedicalOffer";

export const cities: LocationSearchItem[] = [
  {
    name: 'Krakow',
    code: 'KR',
    addresses: [
      { name: "ul. Krowoderska 63", code: "KR1" }, { name: "ul. Karmelicka 27", code: "KR2" }, { name: "ul. Szlak 77", code: "KR3" }, { name: "ul. Wrocławska 5", code: "KR4" }, { name: "ul. Rakowicka 18", code: "KR5" }
    ]
  },
  {
    name: 'Warszawa',
    code: 'WW',
    addresses: [{ name: "ul. Marszałkowska 84/92", code: "WA1" }, { name: "ul. Grzybowska 87", code: "WA2" }, { name: "ul. Żelazna 59", code: "WA3" }, { name: "ul. Wspólna 47/49", code: "WA4" }, { name: "ul. Chmielna 25", code: "WA5" }]
  },
  {
    name: 'Poznan',
    code: 'PO',
    addresses: [{ name: "ul. Głogowska 115", code: "PO1" }, { name: "ul. Wojskowa 4", code: "PO2" }, { name: "ul. Grunwaldzka 182", code: "PO3" }, { name: "ul. Święty Marcin 80/82", code: "PO4" }, { name: "ul. Garbary 59", code: "PO5" }]
  },
  {
    name: 'Wrocław',
    code: 'WR',
    addresses: [{ name: "al. Grunwaldzka 141/143", code: "GD1" }, { name: "ul. Długa 47/48", code: "GD2" }, { name: "ul. Partyzantów 74/76", code: "GD3" }, { name: "al. Zwycięstwa 256/258", code: "GD4" }, { name: "ul. Słowackiego 19", code: "GD5" }]
  },
  {
    name: 'Gdańsk',
    code: 'GD',
    addresses: [{ name: "ul.Piłsudskiego 100", code: "WR1" }, { name: "ul.Kościuszki 9-13", code: "WR2" }, { name: "ul.Kiełbaśnicza 23-25", code: "WR3" }, { name: "ul.Swobodna 1-3", code: "WR4" }, { name: "ul.Kazimierza Wielkiego 118", code: "WR5" }]
  }
]

export const medicalOfferItems: MedicalOfferItem[] = [
  {
    name: 'Wizyta u lekarza rodzinengo',
    id: '1',
    code: 'WULR',
    category: MedicalOfferItemCategoryType.Test,
    price: 100
  },
  {
    name: 'Badanie krwi',
    id: '2',
    code: 'BK',
    category: MedicalOfferItemCategoryType.Appointment,
    price: 50
  },
  {
    name: 'Wizyta u specjalisty',
    id: '3',
    code: 'WUS',
    category: MedicalOfferItemCategoryType.Test,
    price: 150
  },
  {
    name: 'Badanie moczu',
    id: '4',
    code: 'BM',
    category: MedicalOfferItemCategoryType.Appointment,
    price: 30
  },
  {
    name: 'Wizyta u dentysty',
    id: '5',
    code: 'WUD',
    category: MedicalOfferItemCategoryType.Test,
    price: 200
  },
  {
    name: 'Badanie USG jamy brzusznej',
    id: '6',
    code: 'BUSGJB',
    category: MedicalOfferItemCategoryType.Appointment,
    price: 80
  },
  {
    name: 'Badanie EKG serca',
    id: '7',
    code: 'BEKGSC',
    category: MedicalOfferItemCategoryType.Appointment,
    price: 70
  },
  {
    name: 'Badanie RTG płuc',
    id: '8',
    code: 'BRTGP',
    category: MedicalOfferItemCategoryType.Appointment,
    price: 60
  },
  {
    name: 'Wizyta u okulisty',
    id: '9',
    code: 'WUO',
    category: MedicalOfferItemCategoryType.Test,
    price: 250
  },
  {
    name: 'Badanie USG tarczycy',
    id: '10',
    code: 'BUSGT',
    category: MedicalOfferItemCategoryType.Appointment,
    price: 120
  },
  {
    name: 'Wizyta u ginekologa',
    id: '11',
    code: 'WUG',
    category: MedicalOfferItemCategoryType.Test,
    price: 300
  },
  {
    name: 'Badanie USG piersi',
    id: '12',
    code: 'BUSGP',
    category: MedicalOfferItemCategoryType.Appointment,
    price: 150
  },
  {
    name: 'Wizyta u psychiatry',
    id: '13',
    code: 'WUP',
    category: MedicalOfferItemCategoryType.Test,
    price: 350
  },
  {
    name: "Badanie EEG mózgu",
    id: "14",
    code: "BEEGM",
    category: MedicalOfferItemCategoryType.Appointment,
    price: 200
  },
  {
    name: "Wizyta u dermatologa",
    id: "15",
    code: "WUDM",
    category: MedicalOfferItemCategoryType.Test,
    price: 300
  }
]