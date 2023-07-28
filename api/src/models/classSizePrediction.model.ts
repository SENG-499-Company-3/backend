const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const classSizePredictionSchema = new Schema(
  {
    courses: [
      {
        course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
        term: { type: Schema.Types.ObjectId, ref: 'Term', required: true },
        size: { type: Number, required: true }
      }
    ]
  },
  { timestamps: true, unique: true }
);

module.exports = mongoose.model('class_size_prediction', classSizePredictionSchema);
