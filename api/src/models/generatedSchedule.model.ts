const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const generatedScheduleSchema = new Schema(
  {
    //assignments: list of list that has index of [course, prof, timeslot, room]
    assignments: [
      {
        course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
        prof: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        timeslot: {
          days: { type: Array, required: true },
          length: { type: Number, required: true },
          startTime: { type: Number, required: true },
          index: { type: Number }
        },
        room: { type: Schema.Types.ObjectId, ref: 'Classroom', required: true }
      }
    ],
    valid: { type: Boolean, required: true },
    complete: { type: Boolean, required: true },
    reward: { type: Number, required: true },
    iterations: { type: Number, required: true },
    c_hat: { type: Number, required: true },
    quality: { type: Number, required: true },
    inputData: { type: Object, required: true },
    rawAssignments: { type: Object, required: true }
  },
  { timestamps: true, unique: true }
);

module.exports = mongoose.model('generated_schedule_schema', generatedScheduleSchema);
