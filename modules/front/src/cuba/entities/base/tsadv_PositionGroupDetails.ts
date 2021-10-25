import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class PositionGroupDetails extends BaseUuidEntity {
  static NAME = "tsadv_PositionGroupDetails";
  positionGroupName?: string | null;
  functionalManagerId?: string | null;
  functionalManagerName?: string | null;
  administrativeManagerId?: string | null;
  administrativeManagerName?: string | null;
  structuralOrganizationsTree?: string | null;
}
export type PositionGroupDetailsViewName = "_base" | "_local" | "_minimal";
export type PositionGroupDetailsView<
  V extends PositionGroupDetailsViewName
> = never;
