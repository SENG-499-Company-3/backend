import { Schema, model } from 'mongoose';
import type { Preference } from '../schemagen/types/preference';

const coursePreferences = new Schema({
  courseId: Number,
  ability: String,
  willingness: String
}, {
  _id: false, // Set _id to false to remove it for the nested schema
});

const term = new Schema({
  termId: Number,
  year: Number,
  month: Number
}, {
  _id: false, // Set _id to false to remove it for the nested schema
});

const availability = new Schema({
  term: term,
  isAvailable: Boolean
}, {
  _id: false, // Set _id to false to remove it for the nested schema
});

export const teacherPrefSchema = new Schema<Preference>({
  email: String,
  professorId: String,
  coursePreferences: [coursePreferences],
  additionalDetailes: String,
  availability: [availability],
  load: Number
});

module.exports = model('TeacherPref', teacherPrefSchema);
