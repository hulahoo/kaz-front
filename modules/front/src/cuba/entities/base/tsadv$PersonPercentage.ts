import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { AssignmentExt } from "./base$AssignmentExt";
import { OrganizationExt } from "./base$OrganizationExt";
import { PositionExt } from "./base$PositionExt";
export class PersonPercentage extends BaseUuidEntity {
  static NAME = "tsadv$PersonPercentage";
  assignment?: AssignmentExt | null;
  managerAssignment?: AssignmentExt | null;
  organization?: OrganizationExt | null;
  position?: PositionExt | null;
  matrix?: number | null;
  match?: number | null;
  location?: string | null;
}
export type PersonPercentageViewName = "_minimal" | "_local" | "_base";
export type PersonPercentageView<V extends PersonPercentageViewName> = never;
