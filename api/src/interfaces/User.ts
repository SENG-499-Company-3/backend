import { Document } from 'mongodb';

export interface IUser extends Document {
  email: string;
  password?: string;
  name: string;
  userrole: UserRoles;
  token?: string;
  preferencesSubmitted: boolean;
}

export type UserRoles = 'TEACHER' | 'ADMIN';
