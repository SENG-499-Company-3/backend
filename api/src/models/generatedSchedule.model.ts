const mongoose = require('mongoose');
const Schema = mongoose.Schema;


export const generatedScheduleSchema = new Schema(
  {
    assignments: [{ type: Array, required: true, default: [],  }],
    valid: { type: Boolean, required: true },
    complete: { type: Boolean, required: true },
    reward: { type: Number, required: true },
    iterations: { type: Number, required: true },
    c_hat: { type: Number, required: true },
    quality: { type: Number, required: true },
  },
  { timestamps: true, unique: true }
);

module.exports = mongoose.model('generated_schedule_schema', generatedScheduleSchema);
