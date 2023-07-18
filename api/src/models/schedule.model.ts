const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const daysSchema = {
  type: [String],
  enum: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
  required: true
};

export const scheduleSchema = new Schema({
  term: { type: String, required: true },
  course: { type: String, required: true },
  section: { type: String, required: true },
  instructor: { type: String, required: true },
  bldg: { type: String, required: true },
  room: { type: String, required: true },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  days: { type: String, required: true },
  start_date: { type: String, required: true },
  end_date: { type: String, required: true },
  capacity: { type: String, required: true }
});

module.exports = mongoose.model('Schedule', scheduleSchema);
