/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface Preference {
  email: string;
  coursePreferences: {
    courseId: number;
    ability: 'ABLE' | 'WITH_DIFFICULTY';
    willingness: 'WILLING' | 'UNWILLING' | 'VERY_WILLING';
    [k: string]: unknown;
  }[];
  additionalDetailes: string;
  availability: {
    term: {
      termId: number;
      year: number;
      month: number;
      [k: string]: unknown;
    };
    isAvailable: boolean;
    [k: string]: unknown;
  }[];
  load: number;
  [k: string]: unknown;
}
