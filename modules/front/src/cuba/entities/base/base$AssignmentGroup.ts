import { AbstractGroup } from "./AbstractGroup";
export class AssignmentGroup extends AbstractGroup {
  static NAME = "base$AssignmentGroup";
}
export type AssignmentGroupViewName = "_minimal" | "_local" | "_base";
export type AssignmentGroupView<
  V extends AssignmentGroupViewName
> = V extends "_minimal"
  ? Pick<AssignmentGroup, "id">
  : V extends "_local"
  ? Pick<
      AssignmentGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      AssignmentGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : never;
