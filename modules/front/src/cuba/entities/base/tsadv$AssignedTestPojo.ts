import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class AssignedTestPojo extends BaseUuidEntity {
  static NAME = "tsadv$AssignedTestPojo";
  personGroupId?: any | null;
  personFullName?: string | null;
  position?: string | null;
  organization?: string | null;
  testId?: any | null;
  testName?: string | null;
  success?: boolean | null;
  attemptsCount?: any | null;
  score?: any | null;
  enrollmentId?: any | null;
  courseSectionId?: any | null;
  courseSectionName?: string | null;
  courseId?: any | null;
  enrollmentStatus?: any | null;
  organizationGroupId?: any | null;
  createdByLogin?: string | null;
}
export type AssignedTestPojoViewName = "_base" | "_local" | "_minimal";
export type AssignedTestPojoView<V extends AssignedTestPojoViewName> = never;
