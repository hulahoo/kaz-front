import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonExt } from "./base$PersonExt";
import { Attachment } from "./tsadv$Attachment";
import { InvestigationResult } from "./tsadv$InvestigationResult";
import { DisabilityGroup } from "./tsadv$DisabilityGroup";
import { TraumaLevel } from "./tsadv$TraumaLevel";
import { ReasonNoProductionConnection } from "./tsadv$ReasonNoProductionConnection";
import { ReabilitationType } from "./tsadv$ReabilitationType";
import { Accidents } from "./tsadv$Accidents";
export class AccidenInjured extends AbstractParentEntity {
  static NAME = "tsadv$AccidenInjured";
  person?: PersonExt | null;
  attachment?: Attachment[] | null;
  result?: InvestigationResult[] | null;
  disabilityGroup?: DisabilityGroup | null;
  traumaLevel?: TraumaLevel | null;
  inductionDate?: any | null;
  reIntroductoryDate?: any | null;
  knowledgeTestDate?: any | null;
  medicalExaminationDate?: any | null;
  workingHours?: any | null;
  physicalCondition?: string | null;
  diagnosis?: string | null;
  productionConnection?: boolean | null;
  reasonNoProductionConnection?: ReasonNoProductionConnection | null;
  specialOpinion?: boolean | null;
  employeeGuilt?: any | null;
  employerGuilt?: any | null;
  disabilityPercent?: any | null;
  sicknessStartDate?: any | null;
  sicknessEndDate?: any | null;
  retrainingProfession?: string | null;
  reabilitation?: ReabilitationType | null;
  sicknessDays?: any | null;
  startWorkDate?: any | null;
  accidents?: Accidents | null;
}
export type AccidenInjuredViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "accidenInjured-view";
export type AccidenInjuredView<
  V extends AccidenInjuredViewName
> = V extends "_local"
  ? Pick<
      AccidenInjured,
      | "id"
      | "inductionDate"
      | "reIntroductoryDate"
      | "knowledgeTestDate"
      | "medicalExaminationDate"
      | "workingHours"
      | "physicalCondition"
      | "diagnosis"
      | "productionConnection"
      | "specialOpinion"
      | "employeeGuilt"
      | "employerGuilt"
      | "disabilityPercent"
      | "sicknessStartDate"
      | "sicknessEndDate"
      | "retrainingProfession"
      | "sicknessDays"
      | "startWorkDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      AccidenInjured,
      | "id"
      | "inductionDate"
      | "reIntroductoryDate"
      | "knowledgeTestDate"
      | "medicalExaminationDate"
      | "workingHours"
      | "physicalCondition"
      | "diagnosis"
      | "productionConnection"
      | "specialOpinion"
      | "employeeGuilt"
      | "employerGuilt"
      | "disabilityPercent"
      | "sicknessStartDate"
      | "sicknessEndDate"
      | "retrainingProfession"
      | "sicknessDays"
      | "startWorkDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "accidenInjured-view"
  ? Pick<
      AccidenInjured,
      | "id"
      | "person"
      | "disabilityGroup"
      | "traumaLevel"
      | "inductionDate"
      | "reIntroductoryDate"
      | "knowledgeTestDate"
      | "medicalExaminationDate"
      | "workingHours"
      | "physicalCondition"
      | "diagnosis"
      | "productionConnection"
      | "specialOpinion"
      | "employeeGuilt"
      | "employerGuilt"
      | "disabilityPercent"
      | "sicknessStartDate"
      | "reasonNoProductionConnection"
      | "sicknessEndDate"
      | "sicknessDays"
      | "startWorkDate"
      | "attachment"
      | "result"
      | "retrainingProfession"
      | "reabilitation"
    >
  : never;
