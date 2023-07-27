const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const courseListchema = new Schema(
  {
    location: { type: String, required: true},
    capacity: { type: Number, required: true},
    equipment: { type: Array, required: false}
  },
  { timestamps: true, unique: true }
);

module.exports = mongoose.model('course_list_schema', courseListchema);



 
