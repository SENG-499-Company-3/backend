/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface Inputdata {
  rooms?: {
    location?: string;
    capacity?: number;
    equipment?: string[];
    [k: string]: unknown;
  }[];
  timeslots?: {
    day?: string[];
    length?: number;
    startTime?: number;
    [k: string]: unknown;
  }[];
  courses?: {
    coursename?: string;
    noScheduleOverlap?: string[];
    lecturesNumber?: number;
    labsNumber?: number;
    tutorialsNumber?: number;
    capacity?: number;
    [k: string]: unknown;
  }[];
  professors?: {
    name?: string;
    courses?: string[];
    timePreferences?: string[];
    coursePreferences?: string[];
    dayPreferences?: string[];
    equipmentPreferences?: string[];
    [k: string]: unknown;
  }[];
  dimensions?: {
    courses?: number;
    times?: number;
    teachers?: number;
    rooms?: number;
    [k: string]: unknown;
  };
  preferences?: number[][];
  loads?: number[];
  availabilities?: number[][];
  p_tgt?: number;
  max_iter?: number;
  [k: string]: unknown;
}
