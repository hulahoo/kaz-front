import { AbstractParentEntity } from "./AbstractParentEntity";
import { Course } from "./tsadv$Course";
import { CompetenceGroup } from "./tsadv$CompetenceGroup";
import { ScaleLevel } from "./tsadv$ScaleLevel";
export class CourseCompetence extends AbstractParentEntity {
  static NAME = "tsadv$CourseCompetence";
  course?: Course | null;
  competenceGroup?: CompetenceGroup | null;
  scaleLevel?: ScaleLevel | null;
}
export type CourseCompetenceViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "courseCompetence.edit";
export type CourseCompetenceView<
  V extends CourseCompetenceViewName
> = V extends "_base"
  ? Pick<
      CourseCompetence,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      CourseCompetence,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "courseCompetence.edit"
  ? Pick<CourseCompetence, "id" | "course" | "competenceGroup" | "scaleLevel">
  : never;
