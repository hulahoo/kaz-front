import { AbstractParentEntity } from "./AbstractParentEntity";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { JobGroup } from "./tsadv$JobGroup";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicCity } from "./base$DicCity";
import { DicEmploymentType } from "./tsadv$DicEmploymentType";
import { RequisitionCompetence } from "./tsadv$RequisitionCompetence";
import { RequisitionPostingChannel } from "./tsadv$RequisitionPostingChannel";
import { RequisitionHiringStep } from "./tsadv$RequisitionHiringStep";
import { RequisitionMember } from "./tsadv$RequisitionMember";
import { JobRequest } from "./tsadv$JobRequest";
import { RequisitionQuestionnaire } from "./tsadv$RequisitionQuestionnaire";
import { DicCostCenter } from "./tsadv$DicCostCenter";
import { RequisitionRequirement } from "./tsadv$RequisitionRequirement";
export class Requisition extends AbstractParentEntity {
  static NAME = "tsadv$Requisition";
  code?: string | null;
  expected_salary?: any | null;
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
  competences?: RequisitionCompetence[] | null;
  postingChannels?: RequisitionPostingChannel[] | null;
  hiringSteps?: RequisitionHiringStep[] | null;
  members?: RequisitionMember[] | null;
  jobRequests?: JobRequest[] | null;
  questionnaires?: RequisitionQuestionnaire[] | null;
  finalCollectDate?: any | null;
  reason?: string | null;
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
  substitutableDescription?: string | null;
  costCenter?: DicCostCenter | null;
  managerDescriptionLang1?: string | null;
  managerDescriptionLang2?: string | null;
  managerDescriptionLang3?: string | null;
  managerDescriptionLang4?: string | null;
  managerDescriptionLang5?: string | null;
  viewCount?: any | null;
  requisitionRequirements?: RequisitionRequirement[] | null;
  descriptionLang?: string | null;
  nameForSiteLang?: string | null;
}
export type RequisitionViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "requisition.view"
  | "requisition.widget"
  | "requisition.open.widget"
  | "recruitmentServiceBeanJava.view"
  | "requisition.rest"
  | "requisition-for-selfservice-browse"
  | "requisition-for-selfservice-detail"
  | "requisition.for.self.new"
  | "requisition.for.self.new.edit";
export type RequisitionView<
  V extends RequisitionViewName
> = V extends "_minimal"
  ? Pick<Requisition, "id" | "code">
  : V extends "_local"
  ? Pick<
      Requisition,
      | "id"
      | "code"
      | "expected_salary"
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
      | "substitutableDescription"
      | "managerDescriptionLang1"
      | "managerDescriptionLang2"
      | "managerDescriptionLang3"
      | "managerDescriptionLang4"
      | "managerDescriptionLang5"
      | "viewCount"
      | "descriptionLang"
      | "nameForSiteLang"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      Requisition,
      | "id"
      | "code"
      | "expected_salary"
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
      | "substitutableDescription"
      | "managerDescriptionLang1"
      | "managerDescriptionLang2"
      | "managerDescriptionLang3"
      | "managerDescriptionLang4"
      | "managerDescriptionLang5"
      | "viewCount"
      | "descriptionLang"
      | "nameForSiteLang"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "requisition.view"
  ? Pick<
      Requisition,
      | "id"
      | "code"
      | "expected_salary"
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
      | "substitutableDescription"
      | "managerDescriptionLang1"
      | "managerDescriptionLang2"
      | "managerDescriptionLang3"
      | "managerDescriptionLang4"
      | "managerDescriptionLang5"
      | "viewCount"
      | "descriptionLang"
      | "nameForSiteLang"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requisitionTemplate"
      | "organizationGroup"
      | "jobGroup"
      | "positionGroup"
      | "managerPersonGroup"
      | "location"
      | "employmentType"
      | "competences"
      | "postingChannels"
      | "hiringSteps"
      | "members"
      | "jobRequests"
      | "questionnaires"
      | "descriptionLang"
      | "createdBy"
      | "substitutablePersonGroup"
      | "costCenter"
      | "createTs"
      | "recruiterPersonGroup"
      | "requisitionRequirements"
    >
  : V extends "requisition.widget"
  ? Pick<
      Requisition,
      | "id"
      | "code"
      | "requisitionType"
      | "startDate"
      | "endDate"
      | "organizationGroup"
      | "jobGroup"
      | "positionGroup"
      | "managerPersonGroup"
      | "openedPositionsCount"
      | "requisitionStatus"
      | "jobRequests"
    >
  : V extends "requisition.open.widget"
  ? Pick<
      Requisition,
      | "id"
      | "code"
      | "requisitionType"
      | "startDate"
      | "endDate"
      | "organizationGroup"
      | "jobGroup"
      | "positionGroup"
      | "location"
      | "employmentType"
      | "openedPositionsCount"
      | "requisitionStatus"
      | "finalCollectDate"
      | "competences"
      | "withoutOffer"
    >
  : V extends "recruitmentServiceBeanJava.view"
  ? Pick<
      Requisition,
      | "id"
      | "code"
      | "expected_salary"
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
      | "substitutableDescription"
      | "managerDescriptionLang1"
      | "managerDescriptionLang2"
      | "managerDescriptionLang3"
      | "managerDescriptionLang4"
      | "managerDescriptionLang5"
      | "viewCount"
      | "descriptionLang"
      | "nameForSiteLang"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "managerPersonGroup"
      | "recruiterPersonGroup"
      | "organizationGroup"
      | "jobRequests"
      | "jobGroup"
    >
  : V extends "requisition.rest"
  ? Pick<
      Requisition,
      | "id"
      | "code"
      | "expected_salary"
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
      | "substitutableDescription"
      | "managerDescriptionLang1"
      | "managerDescriptionLang2"
      | "managerDescriptionLang3"
      | "managerDescriptionLang4"
      | "managerDescriptionLang5"
      | "viewCount"
      | "descriptionLang"
      | "nameForSiteLang"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "managerPersonGroup"
      | "recruiterPersonGroup"
      | "jobGroup"
    >
  : V extends "requisition-for-selfservice-browse"
  ? Pick<
      Requisition,
      | "id"
      | "code"
      | "jobGroup"
      | "location"
      | "requisitionStatus"
      | "finalCollectDate"
    >
  : V extends "requisition-for-selfservice-detail"
  ? Pick<
      Requisition,
      | "id"
      | "code"
      | "endDate"
      | "jobGroup"
      | "location"
      | "employmentType"
      | "descriptionLang"
    >
  : V extends "requisition.for.self.new"
  ? Pick<
      Requisition,
      | "id"
      | "code"
      | "startDate"
      | "endDate"
      | "jobGroup"
      | "recruiterPersonGroup"
      | "location"
      | "openedPositionsCount"
      | "requisitionStatus"
      | "jobRequests"
      | "finalCollectDate"
      | "nameForSiteLang1"
      | "nameForSiteLang2"
      | "nameForSiteLang3"
      | "nameForSiteLang4"
      | "nameForSiteLang5"
      | "nameForSiteLang"
    >
  : V extends "requisition.for.self.new.edit"
  ? Pick<
      Requisition,
      | "id"
      | "code"
      | "startDate"
      | "endDate"
      | "organizationGroup"
      | "jobGroup"
      | "managerPersonGroup"
      | "recruiterPersonGroup"
      | "finalCollectDate"
      | "reason"
      | "nameForSiteLang1"
      | "nameForSiteLang2"
      | "nameForSiteLang3"
      | "nameForSiteLang4"
      | "nameForSiteLang5"
      | "descriptionLang1"
      | "descriptionLang2"
      | "descriptionLang3"
      | "descriptionLang4"
      | "descriptionLang5"
      | "viewCount"
      | "descriptionLang"
      | "nameForSiteLang"
      | "location"
      | "requisitionStatus"
      | "openedPositionsCount"
      | "positionGroup"
      | "jobRequests"
    >
  : never;
