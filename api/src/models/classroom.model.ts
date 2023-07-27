const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const classroomSchema = new Schema(
  {
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    equipment: { type: Array, required: false }
  },
  { timestamps: true, unique: true }
);

module.exports = mongoose.model('Classroom', classroomSchema);
