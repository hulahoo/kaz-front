import { AbstractGroup } from "./AbstractGroup";
export class AssignmentGroup extends AbstractGroup {
  static NAME = "base$AssignmentGroup";
}
export type AssignmentGroupViewName = "_base" | "_local" | "_minimal";
export type AssignmentGroupView<
  V extends AssignmentGroupViewName
> = V extends "_base"
  ? Pick<
      AssignmentGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      AssignmentGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<AssignmentGroup, "id">
  : never;
