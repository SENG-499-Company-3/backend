/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type ClassSizePrediction = {
  course: string;
  Term: number[];
  Year: number;
  pastEnrollment: {
    year: number;
    term: number;
    size: number;
    [k: string]: unknown;
  }[];
  [k: string]: unknown;
}[];
