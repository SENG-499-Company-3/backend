const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const classSizePredictionSchema = new Schema(
  {
    courses: [{
      course: { type: String, required: true, unique: true },
      prereq: { type: Array, default: [] },
      coreq: { type: Array, default: [] },
      pastEnrol: [
        {
          year: { type: Number, required: true },
          term: { type: String, required: true },
          size: { type: Number, required: true }
        }
      ]
    }]
  },
  { timestamps: true, unique: true }
);

module.exports = mongoose.model('class_size_prediction', classSizePredictionSchema);
