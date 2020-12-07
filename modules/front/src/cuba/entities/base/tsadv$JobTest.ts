import { AbstractParentEntity } from "./AbstractParentEntity";
import { JobGroup } from "./tsadv$JobGroup";
import { Test } from "./tsadv$Test";
export class JobTest extends AbstractParentEntity {
  static NAME = "tsadv$JobTest";
  jobGroup?: JobGroup | null;
  test?: Test | null;
  purpose?: any | null;
  startDate?: any | null;
  endDate?: any | null;
}
export type JobTestViewName = "_minimal" | "_local" | "_base" | "jobTest.edit";
export type JobTestView<V extends JobTestViewName> = V extends "_local"
  ? Pick<
      JobTest,
      | "id"
      | "purpose"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      JobTest,
      | "id"
      | "purpose"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "jobTest.edit"
  ? Pick<
      JobTest,
      | "id"
      | "purpose"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "jobGroup"
    >
  : never;
