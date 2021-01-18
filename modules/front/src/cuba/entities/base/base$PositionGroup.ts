import { AbstractGroup } from "./AbstractGroup";
export class PositionGroup extends AbstractGroup {
  static NAME = "base$PositionGroup";
}
export type PositionGroupViewName = "_base" | "_local" | "_minimal";
export type PositionGroupView<
  V extends PositionGroupViewName
> = V extends "_base"
  ? Pick<
      PositionGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PositionGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<PositionGroup, "id">
  : never;
