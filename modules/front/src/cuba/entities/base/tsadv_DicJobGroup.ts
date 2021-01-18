import { AbstractParentEntity } from "./AbstractParentEntity";
import { JobGroup } from "./tsadv$JobGroup";
export class DicJobGroup extends AbstractParentEntity {
  static NAME = "tsadv_DicJobGroup";
  jobGroup?: JobGroup | null;
}
export type DicJobGroupViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "dicJobGroup.edit";
export type DicJobGroupView<V extends DicJobGroupViewName> = V extends "_base"
  ? Pick<
      DicJobGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      DicJobGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "dicJobGroup.edit"
  ? Pick<
      DicJobGroup,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "jobGroup"
    >
  : never;
