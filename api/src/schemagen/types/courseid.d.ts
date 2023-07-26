/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface Courseid {
  /**
   * Course subject, e.g. SENG, CSC
   */
  subject: string;
  /**
   * Course code, e.g. 499,310
   */
  code: string;
  term: {
    termId: number;
    year: number;
    month: number;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
