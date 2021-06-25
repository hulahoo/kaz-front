import { AbstractParentEntity } from "./AbstractParentEntity";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { Course } from "./tsadv$Course";
export class PositionCourse extends AbstractParentEntity {
  static NAME = "tsadv_PositionCourse";
  positionGroup?: PositionGroupExt | null;
  course?: Course | null;
  startDate?: any | null;
  endDate?: any | null;
}
export type PositionCourseViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "positionCourse-edit"
  | "positionCourse-matrix-browse";
export type PositionCourseView<
  V extends PositionCourseViewName
> = V extends "_base"
  ? Pick<
      PositionCourse,
      | "id"
      | "positionGroup"
      | "course"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PositionCourse,
      | "id"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<PositionCourse, "id" | "positionGroup" | "course">
  : V extends "positionCourse-edit"
  ? Pick<
      PositionCourse,
      | "id"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "positionGroup"
      | "course"
    >
  : V extends "positionCourse-matrix-browse"
  ? Pick<
      PositionCourse,
      "id" | "positionGroup" | "course" | "course" | "startDate" | "endDate"
    >
  : never;
