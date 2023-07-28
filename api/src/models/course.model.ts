const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const courseSchema = new Schema({
  Subj: { type: String, required: true },
  Num: { type: Number, required: true },
  Title: { type: String, required: true },
  CourseYear: { type: Number, required: true },
  Cap: { type: Number, required: true },
  Enrolled: { type: Number, required: true }
});

module.exports = mongoose.model('Course', courseSchema);
