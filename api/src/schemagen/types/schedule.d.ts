/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface Schedule {
  assignments: number[][];
  valid: boolean;
  complete: boolean;
  reward: {
    [k: string]: unknown;
  };
  iterations: number;
  c_hat: {
    [k: string]: unknown;
  };
  quality: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
}