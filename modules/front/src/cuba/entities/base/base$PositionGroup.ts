import { AbstractGroup } from "./AbstractGroup";
export class PositionGroup extends AbstractGroup {
  static NAME = "base$PositionGroup";
}
export type PositionGroupViewName = "_minimal" | "_local" | "_base";
export type PositionGroupView<
  V extends PositionGroupViewName
> = V extends "_minimal"
  ? Pick<PositionGroup, "id">
  : V extends "_local"
  ? Pick<
      PositionGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      PositionGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : never;
