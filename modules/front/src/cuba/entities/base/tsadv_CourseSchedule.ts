import { AbstractParentEntity } from "./AbstractParentEntity";
import { Course } from "./tsadv$Course";
import { DicLearningCenter } from "./tsadv$DicLearningCenter";
export class CourseSchedule extends AbstractParentEntity {
  static NAME = "tsadv_CourseSchedule";
  course?: Course | null;
  name?: string | null;
  startDate?: any | null;
  endDate?: any | null;
  learningCenter?: DicLearningCenter | null;
  address?: string | null;
  maxNumberOfPeople?: number | null;
}
export type CourseScheduleViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "courseSchedule.edit";
export type CourseScheduleView<
  V extends CourseScheduleViewName
> = V extends "_base"
  ? Pick<
      CourseSchedule,
      | "id"
      | "name"
      | "startDate"
      | "endDate"
      | "address"
      | "maxNumberOfPeople"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      CourseSchedule,
      | "id"
      | "name"
      | "startDate"
      | "endDate"
      | "address"
      | "maxNumberOfPeople"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<CourseSchedule, "id" | "name">
  : V extends "courseSchedule.edit"
  ? Pick<
      CourseSchedule,
      | "id"
      | "name"
      | "startDate"
      | "endDate"
      | "address"
      | "maxNumberOfPeople"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "course"
      | "learningCenter"
    >
  : never;
