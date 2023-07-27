import type { Preference } from '../../schemagen/types/preference';
export const teacherPrefData: Preference[] = [
  {
    email: '124@gmail.com',
    professorId: 'abc',
    coursePreferences: [
      {
        courseId: 10,
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
        isAvailable: true
      }
    ],
    load: 2
  },
  {
    email: '125@gmail.com',
    professorId: 'bcd',
    coursePreferences: [
      {
        courseId: 11,
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
