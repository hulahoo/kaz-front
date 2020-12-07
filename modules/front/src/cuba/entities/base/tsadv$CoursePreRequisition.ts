import { AbstractParentEntity } from "./AbstractParentEntity";
import { Course } from "./tsadv$Course";
export class CoursePreRequisition extends AbstractParentEntity {
  static NAME = "tsadv$CoursePreRequisition";
  course?: Course | null;
  requisitionCourse?: Course | null;
}
export type CoursePreRequisitionViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "coursePreRequisition.edit"
  | "coursePreRequisition.edit.new";
export type CoursePreRequisitionView<
  V extends CoursePreRequisitionViewName
> = V extends "_local"
  ? Pick<
      CoursePreRequisition,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      CoursePreRequisition,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "coursePreRequisition.edit"
  ? Pick<CoursePreRequisition, "id" | "requisitionCourse" | "course">
  : V extends "coursePreRequisition.edit.new"
  ? Pick<CoursePreRequisition, "id" | "course" | "requisitionCourse">
  : never;
