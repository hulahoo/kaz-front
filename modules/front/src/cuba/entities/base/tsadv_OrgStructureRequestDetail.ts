import { StandardEntity } from "./sys$StandardEntity";
import { OrgStructureRequest } from "./tsadv_OrgStructureRequest";
import { DicChangeType } from "./tsadv_DicChangeType";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { GradeGroup } from "./tsadv$GradeGroup";
import { Grade } from "./tsadv$Grade";
export class OrgStructureRequestDetail extends StandardEntity {
  static NAME = "tsadv_OrgStructureRequestDetail";
  orgStructureRequest?: OrgStructureRequest | null;
  changeType?: DicChangeType | null;
  currentOrganizationGroup?: OrganizationGroupExt | null;
  currentPositionGroup?: PositionGroupExt | null;
  currentGradeGroup?: GradeGroup | null;
  currentHeadCount?: number | null;
  currentBaseSalary?: any | null;
  currentMonthlyPayroll?: any | null;
  currentMonthlyTotalPayroll?: any | null;
  parentOrganizationGroup?: OrganizationGroupExt | null;
  parentPositionGroup?: PositionGroupExt | null;
  newOrganization?: OrganizationGroupExt | null;
  newPositionGroup?: PositionGroupExt | null;
  newGrade?: Grade | null;
  newHeadCount?: any | null;
  newBaseSalary?: any | null;
  newMonthlyPayroll?: any | null;
  newMonthlyTotalPayroll?: any | null;
  differenceOrganizationGroup?: OrganizationGroupExt | null;
  differencePositionGroup?: PositionGroupExt | null;
  differenceGradeGroup?: GradeGroup | null;
  differenceHeadCount?: number | null;
  differenceBaseSalary?: any | null;
  differenceMonthlyPayroll?: any | null;
  differenceMonthlyTotalPayroll?: any | null;
}
export type OrgStructureRequestDetailViewName = "_base" | "_local" | "_minimal";
export type OrgStructureRequestDetailView<
  V extends OrgStructureRequestDetailViewName
> = V extends "_base"
  ? Pick<
      OrgStructureRequestDetail,
      | "id"
      | "currentHeadCount"
      | "currentBaseSalary"
      | "currentMonthlyPayroll"
      | "currentMonthlyTotalPayroll"
      | "newHeadCount"
      | "newBaseSalary"
      | "newMonthlyPayroll"
      | "newMonthlyTotalPayroll"
      | "differenceHeadCount"
      | "differenceBaseSalary"
      | "differenceMonthlyPayroll"
      | "differenceMonthlyTotalPayroll"
    >
  : V extends "_local"
  ? Pick<
      OrgStructureRequestDetail,
      | "id"
      | "currentHeadCount"
      | "currentBaseSalary"
      | "currentMonthlyPayroll"
      | "currentMonthlyTotalPayroll"
      | "newHeadCount"
      | "newBaseSalary"
      | "newMonthlyPayroll"
      | "newMonthlyTotalPayroll"
      | "differenceHeadCount"
      | "differenceBaseSalary"
      | "differenceMonthlyPayroll"
      | "differenceMonthlyTotalPayroll"
    >
  : never;
