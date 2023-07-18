import { Document } from 'mongodb';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: UserRoles;
  token?: string;
  preferencesSubmitted: boolean;
}

export type UserRoles = 'TEACHER' | 'ADMIN';
