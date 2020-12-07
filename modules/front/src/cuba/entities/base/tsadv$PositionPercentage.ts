import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { PositionExt } from "./base$PositionExt";
import { OrganizationExt } from "./base$OrganizationExt";
import { DicLocation } from "./base$DicLocation";
export class PositionPercentage extends BaseUuidEntity {
  static NAME = "tsadv$PositionPercentage";
  position?: PositionExt | null;
  organization?: OrganizationExt | null;
  location?: DicLocation | null;
  allCount?: number | null;
  count?: number | null;
  match?: number | null;
}
export type PositionPercentageViewName = "_minimal" | "_local" | "_base";
export type PositionPercentageView<
  V extends PositionPercentageViewName
> = never;
