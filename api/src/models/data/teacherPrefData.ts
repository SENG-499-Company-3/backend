import type { Preference } from '../../schemagen/types/preference';
export const teacherPrefData: Preference[] = [
  {
    email: 'raltawy@uvic.ca',
    coursePreferences: [
      {
        courseName: 'CSC 110',
        courseYear: 1,
        ability: 'ABLE',
        willingness: 'WILLING'
      }
    ],
    additionalDetailes: 'nothing',
    availability: [
      {
        term: {
          termId: 1,
          year: 2023,
          month: 5
        },
        isAvailable: false
      }
    ],
    load: 2
  },
  {
    email: 'datkinso@uvic.ca',
    coursePreferences: [
      {
        courseName: 'ECE 111',
        courseYear: 1,
        ability: 'ABLE',
        willingness: 'WILLING'
      }
    ],
    additionalDetailes: 'something',
    availability: [
      {
        term: {
          termId: 2,
          year: 2023,
          month: 9
        },
        isAvailable: true
      }
    ],
    load: 2
  }
];
