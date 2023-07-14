import { Document } from 'mongodb';

export interface IUser extends Document {
  email: string;
  password?: string;
  name: string;
  role: UserRoles;
  token?: string;
}

export type UserRoles = 'TEACHER' | 'ADMIN';
