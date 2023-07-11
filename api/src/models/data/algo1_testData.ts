export const algo1_testData = [
  {
    rooms: {
      location: 'string',
      capacity: 0,
      equipment: ['string']
    },
    timeslots: {
      day: ['string'],
      length: 0,
      startTime: 0
    },
    courses: {
      coursename: 'string',
      noScheduleOverlap: ['string'],
      lecturesNumber: 0,
      labsNumber: 0,
      tutorialsNumber: 0,
      capacity: 0
    },
    professors: {
      name: 'string',
      courses: ['string'],
      timePreferences: ['string'],
      coursePreferences: ['string'],
      dayPreferences: ['string'],
      equipmentPreferences: ['string']
    },
    dimensions: [
      {
        courses: 0,
        times: 0,
        teachers: 0,
        rooms: 0
      }
    ],
    preferences: [[0]],
    loads: [[0]],
    availabilities: [[0]],
    p_tgt: 0
  }
];
