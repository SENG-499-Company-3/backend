import { Document } from 'mongodb';

export interface IUser extends Document {
  email: string;
  password?: string;
  name: string;
  userrole: string;
  token?: string;
}
