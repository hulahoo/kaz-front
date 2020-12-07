import { AbstractParentEntity } from "./AbstractParentEntity";
import { JobGroup } from "./tsadv$JobGroup";
export class RcJobGroup extends AbstractParentEntity {
  static NAME = "tsadv$RcJobGroup";
  groupName?: string | null;
  jobs?: JobGroup[] | null;
}
export type RcJobGroupViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "rcJobGroup.browse"
  | "rcJobGroup.edit";
export type RcJobGroupView<V extends RcJobGroupViewName> = V extends "_minimal"
  ? Pick<RcJobGroup, "id" | "groupName">
  : V extends "_local"
  ? Pick<
      RcJobGroup,
      | "id"
      | "groupName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      RcJobGroup,
      | "id"
      | "groupName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "rcJobGroup.browse"
  ? Pick<
      RcJobGroup,
      | "id"
      | "groupName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "jobs"
    >
  : V extends "rcJobGroup.edit"
  ? Pick<
      RcJobGroup,
      | "id"
      | "groupName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "jobs"
    >
  : never;
