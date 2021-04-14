import { StandardEntity } from "./sys$StandardEntity";
import { OrgStructureRequest } from "./tsadv_OrgStructureRequest";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { GradeGroup } from "./tsadv$GradeGroup";
export class OrgStructureRequestDetail extends StandardEntity {
  static NAME = "tsadv_OrgStructureRequestDetail";
  orgStructureRequest?: OrgStructureRequest | null;
  parent?: OrgStructureRequestDetail | null;
  changeType?: any | null;
  organizationNameRu?: string | null;
  organizationNameEn?: string | null;
  positionNameRu?: string | null;
  positionNameEn?: string | null;
  organizationGroup?: OrganizationGroupExt | null;
  parentOrganizationGroup?: OrganizationGroupExt | null;
  positionGroup?: PositionGroupExt | null;
  elementType?: any | null;
  gradeGroup?: GradeGroup | null;
  headCount?: any | null;
}
export type OrgStructureRequestDetailViewName = "_base" | "_local" | "_minimal";
export type OrgStructureRequestDetailView<
  V extends OrgStructureRequestDetailViewName
> = V extends "_base"
  ? Pick<
      OrgStructureRequestDetail,
      | "id"
      | "changeType"
      | "organizationNameRu"
      | "organizationNameEn"
      | "positionNameRu"
      | "positionNameEn"
      | "elementType"
      | "headCount"
    >
  : V extends "_local"
  ? Pick<
      OrgStructureRequestDetail,
      | "id"
      | "changeType"
      | "organizationNameRu"
      | "organizationNameEn"
      | "positionNameRu"
      | "positionNameEn"
      | "elementType"
      | "headCount"
    >
  : never;
