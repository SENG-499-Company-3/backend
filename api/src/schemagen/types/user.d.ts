/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type User = {
  email: string;
  /**
   * password hashed in db
   */
  password: string;
  [k: string]: unknown;
} & {
  name: string;
  /**
   * User roles
   */
  userrole: 'ADMIN' | 'TEACHER';
  [k: string]: unknown;
};
