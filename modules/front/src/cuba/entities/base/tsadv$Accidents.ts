import { AbstractParentEntity } from "./AbstractParentEntity";
import { AccidentEvent } from "./tsadv$AccidentEvent";
import { AccidenInjured } from "./tsadv$AccidenInjured";
import { Witnesses } from "./tsadv$Witnesses";
import { Attachment } from "./tsadv$Attachment";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { Punishment } from "./tsadv$PunishmentTb";
import { InvestigationConducted } from "./tsadv$InvestigationConducted";
import { DirectReason } from "./tsadv$DirectReason";
import { Excavation } from "./tsadv$Excavation";
import { AccidentType } from "./tsadv$AccidentType";
import { WorkPlace } from "./tsadv$WorkPlace";
export class Accidents extends AbstractParentEntity {
  static NAME = "tsadv$Accidents";
  accidentTime?: any | null;
  event?: AccidentEvent[] | null;
  injured?: AccidenInjured[] | null;
  witnesses?: Witnesses[] | null;
  attachment?: Attachment[] | null;
  organization?: OrganizationGroupExt | null;
  punishment?: Punishment[] | null;
  investigationConducted?: InvestigationConducted | null;
  directReason?: DirectReason | null;
  excavation?: Excavation | null;
  accidentType?: AccidentType | null;
  accidentActNumber?: string | null;
  accidentActDate?: any | null;
  accidentConditions?: string | null;
  accidentDate?: any | null;
  workPlace?: WorkPlace | null;
}
export type AccidentsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "accidents-view";
export type AccidentsView<V extends AccidentsViewName> = V extends "_base"
  ? Pick<
      Accidents,
      | "id"
      | "accidentTime"
      | "accidentActNumber"
      | "accidentActDate"
      | "accidentConditions"
      | "accidentDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Accidents,
      | "id"
      | "accidentTime"
      | "accidentActNumber"
      | "accidentActDate"
      | "accidentConditions"
      | "accidentDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "accidents-view"
  ? Pick<
      Accidents,
      | "id"
      | "investigationConducted"
      | "directReason"
      | "excavation"
      | "accidentType"
      | "accidentTime"
      | "organization"
      | "accidentActNumber"
      | "accidentActDate"
      | "accidentConditions"
      | "accidentDate"
      | "event"
      | "injured"
      | "witnesses"
      | "attachment"
      | "punishment"
      | "workPlace"
    >
  : never;
