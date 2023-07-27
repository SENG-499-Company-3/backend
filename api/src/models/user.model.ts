import {Schema, model } from 'mongoose';
import type { User } from '../schemagen/types/user';

export const userRoleSchema = { type: String, enum: ['TEACHER', 'ADMIN'], default: 'TEACHER', required: true };

export const userSchema = new Schema<User>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    userrole: { type: String, required: true },
    token: { type: String, default: '' }
  }
);

module.exports = model('User', userSchema);
