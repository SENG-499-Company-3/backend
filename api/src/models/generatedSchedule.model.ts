const mongoose = require('mongoose');
const Schema = mongoose.Schema;


export const generatedScheduleSchema = new Schema(
  {
    assignments: [{ type: Array, required: true, default: [],  }],
    valid: { type: Boolean, required: true },
    complete: { type: Boolean, required: true },
  },
  { timestamps: true, unique: true }
);

module.exports = mongoose.model('generated_schedule_schema', generatedScheduleSchema);
