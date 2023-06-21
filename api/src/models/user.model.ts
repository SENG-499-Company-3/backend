const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const userRoleSchema = { type: String, enum: ['TEACHER', 'ADMIN'], default: 'TEACHER', required: true };

export const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: userRoleSchema,
    token: { type: String, default: '' }
  },
  { timestamps: true, unique: true }
);

module.exports = mongoose.model('User', userSchema);
