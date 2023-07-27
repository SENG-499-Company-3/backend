const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const courseTerm = new Schema({
  course_id: { type: String, required: true },
  term_id: { type: String, required: true },
});

module.exports = mongoose.model('CourseTerm', courseTerm);
