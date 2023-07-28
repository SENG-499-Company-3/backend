const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const termSchema = new Schema({
  id: { type: Number, required: true },
  year: { type: Number, required: true },
  term: { type: String, required: true }
});

module.exports = mongoose.model('Term', termSchema);
