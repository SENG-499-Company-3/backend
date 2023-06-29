const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const predictScheduleSchema = new Schema(
  {
    courses: {type: String, required: true, unique: true},
    csc_to_seng_ratio: {type: String, required: true, unique: true},
    class_year_split: {type: String, required: true, unique: true}
  },
  {timestamps: true, unique: true}
);

module.exports = mongoose.model('class_size_prediction', predictScheduleSchema);
