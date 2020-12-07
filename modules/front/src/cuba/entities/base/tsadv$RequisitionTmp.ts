import { AbstractParentEntity } from "./AbstractParentEntity";
import { Requisition } from "./tsadv$Requisition";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { JobGroup } from "./tsadv$JobGroup";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicCity } from "./base$DicCity";
import { DicEmploymentType } from "./tsadv$DicEmploymentType";
import { DicCostCenter } from "./tsadv$DicCostCenter";
export class RequisitionTmp extends AbstractParentEntity {
  static NAME = "tsadv$RequisitionTmp";
  requisition?: Requisition | null;
  code?: string | null;
  requisitionType?: any | null;
  requisitionTemplate?: Requisition | null;
  startDate?: any | null;
  endDate?: any | null;
  organizationGroup?: OrganizationGroupExt | null;
  jobGroup?: JobGroup | null;
  positionGroup?: PositionGroupExt | null;
  managerPersonGroup?: PersonGroupExt | null;
  recruiterPersonGroup?: PersonGroupExt | null;
  location?: DicCity | null;
  employmentType?: DicEmploymentType | null;
  openedPositionsCount?: any | null;
  requisitionStatus?: any | null;
  finalCollectDate?: any | null;
  nameForSiteLang1?: string | null;
  nameForSiteLang2?: string | null;
  nameForSiteLang3?: string | null;
  nameForSiteLang4?: string | null;
  nameForSiteLang5?: string | null;
  videoInterviewRequired?: boolean | null;
  withoutOffer?: boolean | null;
  descriptionLang1?: string | null;
  descriptionLang2?: string | null;
  descriptionLang3?: string | null;
  descriptionLang4?: string | null;
  descriptionLang5?: string | null;
  forSubstitution?: boolean | null;
  substitutablePersonGroup?: PersonGroupExt | null;
  costCenter?: DicCostCenter | null;
  managerDescriptionLang1?: string | null;
  managerDescriptionLang2?: string | null;
  managerDescriptionLang3?: string | null;
  managerDescriptionLang4?: string | null;
  managerDescriptionLang5?: string | null;
}
export type RequisitionTmpViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "requisitionTmp.full"
  | "requisitionTmp.view";
export type RequisitionTmpView<
  V extends RequisitionTmpViewName
> = V extends "_minimal"
  ? Pick<RequisitionTmp, "id">
  : V extends "_local"
  ? Pick<
      RequisitionTmp,
      | "id"
      | "code"
      | "requisitionType"
      | "startDate"
      | "endDate"
      | "openedPositionsCount"
      | "requisitionStatus"
      | "finalCollectDate"
      | "nameForSiteLang1"
      | "nameForSiteLang2"
      | "nameForSiteLang3"
      | "nameForSiteLang4"
      | "nameForSiteLang5"
      | "videoInterviewRequired"
      | "withoutOffer"
      | "descriptionLang1"
      | "descriptionLang2"
      | "descriptionLang3"
      | "descriptionLang4"
      | "descriptionLang5"
      | "forSubstitution"
      | "managerDescriptionLang1"
      | "managerDescriptionLang2"
      | "managerDescriptionLang3"
      | "managerDescriptionLang4"
      | "managerDescriptionLang5"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      RequisitionTmp,
      | "id"
      | "code"
      | "requisitionType"
      | "startDate"
      | "endDate"
      | "openedPositionsCount"
      | "requisitionStatus"
      | "finalCollectDate"
      | "nameForSiteLang1"
      | "nameForSiteLang2"
      | "nameForSiteLang3"
      | "nameForSiteLang4"
      | "nameForSiteLang5"
      | "videoInterviewRequired"
      | "withoutOffer"
      | "descriptionLang1"
      | "descriptionLang2"
      | "descriptionLang3"
      | "descriptionLang4"
      | "descriptionLang5"
      | "forSubstitution"
      | "managerDescriptionLang1"
      | "managerDescriptionLang2"
      | "managerDescriptionLang3"
      | "managerDescriptionLang4"
      | "managerDescriptionLang5"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "requisitionTmp.full"
  ? Pick<
      RequisitionTmp,
      | "id"
      | "code"
      | "requisitionType"
      | "startDate"
      | "endDate"
      | "openedPositionsCount"
      | "requisitionStatus"
      | "finalCollectDate"
      | "nameForSiteLang1"
      | "nameForSiteLang2"
      | "nameForSiteLang3"
      | "nameForSiteLang4"
      | "nameForSiteLang5"
      | "videoInterviewRequired"
      | "withoutOffer"
      | "descriptionLang1"
      | "descriptionLang2"
      | "descriptionLang3"
      | "descriptionLang4"
      | "descriptionLang5"
      | "forSubstitution"
      | "managerDescriptionLang1"
      | "managerDescriptionLang2"
      | "managerDescriptionLang3"
      | "managerDescriptionLang4"
      | "managerDescriptionLang5"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requisition"
      | "requisitionTemplate"
      | "organizationGroup"
      | "jobGroup"
      | "positionGroup"
      | "managerPersonGroup"
      | "recruiterPersonGroup"
      | "location"
      | "employmentType"
      | "substitutablePersonGroup"
      | "costCenter"
    >
  : V extends "requisitionTmp.view"
  ? Pick<
      RequisitionTmp,
      | "id"
      | "code"
      | "requisitionType"
      | "startDate"
      | "endDate"
      | "openedPositionsCount"
      | "requisitionStatus"
      | "finalCollectDate"
      | "nameForSiteLang1"
      | "nameForSiteLang2"
      | "nameForSiteLang3"
      | "nameForSiteLang4"
      | "nameForSiteLang5"
      | "videoInterviewRequired"
      | "withoutOffer"
      | "descriptionLang1"
      | "descriptionLang2"
      | "descriptionLang3"
      | "descriptionLang4"
      | "descriptionLang5"
      | "forSubstitution"
      | "managerDescriptionLang1"
      | "managerDescriptionLang2"
      | "managerDescriptionLang3"
      | "managerDescriptionLang4"
      | "managerDescriptionLang5"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requisition"
      | "requisitionTemplate"
      | "organizationGroup"
      | "jobGroup"
      | "positionGroup"
      | "managerPersonGroup"
      | "recruiterPersonGroup"
      | "location"
      | "employmentType"
      | "substitutablePersonGroup"
      | "costCenter"
    >
  : never;
