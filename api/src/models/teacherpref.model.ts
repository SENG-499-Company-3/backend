import { Schema, model } from 'mongoose';
import type { Preference } from '../schemagen/types/preference';

const coursePreferences = new Schema({
  courseId: Number,
  ability: String,
  willingness: String
})

const term = new Schema({
      termId: Number,
      year: Number,
      month: Number,
});

const availability = new Schema({
    term: term,
    isAvailable: Boolean,
})

export const teacherPrefSchema = new Schema<Preference>({
  professorId: String,
  coursePreferences: coursePreferences,
  additionalDetailes: String,
  availability: [availability],
  load: Number,
});

module.exports = model('TeacherPref', teacherPrefSchema);
