export interface LocationData {
  province: string;
  districts: {
    name: string;
    municipalities: {
      name: string;
      wards: number[];
      popularAreas: string[];
    }[];
  }[];
}

export const NEPAL_LOCATIONS: LocationData[] = [
  {
    province: 'Bagmati Province',
    districts: [
      {
        name: 'Kathmandu',
        municipalities: [
          {
            name: 'Kathmandu Metropolitan City',
            wards: Array.from({ length: 32 }, (_, i) => i + 1),
            popularAreas: ['Baneshwor', 'Baluwatar', 'Lazimpat', 'Bhanimandal', 'Kalanki', 'Koteshwor', 'Chabahil', 'Maharajgunj', 'Naxal', 'Thamel', 'New Road', 'Samakhusi', 'Basundhara']
          },
          {
            name: 'Budhanilkantha Municipality',
            wards: Array.from({ length: 13 }, (_, i) => i + 1),
            popularAreas: ['Hattigauda', 'Golfutar', 'Golfutar Heights', 'Mandikhatar', 'Chapakali']
          },
          {
            name: 'Tokha Municipality',
            wards: Array.from({ length: 11 }, (_, i) => i + 1),
            popularAreas: ['Grandee Area', 'Dhapasi', 'Jor Pati', 'Tokha Old Town']
          },
          {
            name: 'Kirtipur Municipality',
            wards: Array.from({ length: 10 }, (_, i) => i + 1),
            popularAreas: ['TU Gate', 'Panga', 'Chobhar', 'Tyanglaphat']
          }
        ]
      },
      {
        name: 'Lalitpur',
        municipalities: [
          {
            name: 'Lalitpur Metropolitan City',
            wards: Array.from({ length: 29 }, (_, i) => i + 1),
            popularAreas: ['Jhamsikhel', 'Sanepa', 'Bakhundole', 'Pulchowk', 'Jawalakhel', 'Kupondole', 'Balkhu Bridge', 'Khumaltar', 'Imadol', 'Dhapakhel', 'Gwarkho']
          },
          {
            name: 'Mahalaxmi Municipality',
            wards: Array.from({ length: 10 }, (_, i) => i + 1),
            popularAreas: ['Lubhu', 'Tikathali', 'Lamatar', 'Sanovaryang']
          }
        ]
      },
      {
        name: 'Bhaktapur',
        municipalities: [
          {
            name: 'Bhaktapur Municipality',
            wards: Array.from({ length: 10 }, (_, i) => i + 1),
            popularAreas: ['Durbar Square', 'Byasi', 'Kamalbinayak', 'Sallaghari']
          },
          {
            name: 'Suryabinayak Municipality',
            wards: Array.from({ length: 10 }, (_, i) => i + 1),
            popularAreas: ['Katunse', 'Balkot', 'Sipadol', 'Thimi Border']
          },
          {
            name: 'Madhyapur Thimi Municipality',
            wards: Array.from({ length: 9 }, (_, i) => i + 1),
            popularAreas: ['Gatthaghar', 'Lokanthali', 'Sanothimi', 'Bode']
          }
        ]
      }
    ]
  },
  {
    province: 'Gandaki Province',
    districts: [
      {
        name: 'Kaski',
        municipalities: [
          {
            name: 'Pokhara Metropolitan City',
            wards: Array.from({ length: 33 }, (_, i) => i + 1),
            popularAreas: ['Lakeside', 'Lame-Ahal', 'New Road Pokhara', 'Chipledhunga', 'Prithvi Chowk', 'Birauta', 'Matepani', 'Batulechaur', 'Kaharapani', 'Rambazar']
          }
        ]
      }
    ]
  }
];
