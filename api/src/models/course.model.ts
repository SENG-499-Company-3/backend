const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const courseSchema = new Schema({
  Subj: { type: String, required: true },
  Num: { type: Number, required: true },
  Section: { type: String, required: true },
  Title: { type: String, required: true },
  SchedType: { type: String, required: true },
  Type: { type: String, required: true },
  Cap: { type: Number, required: true }
});

module.exports = mongoose.model('Course', courseSchema);
