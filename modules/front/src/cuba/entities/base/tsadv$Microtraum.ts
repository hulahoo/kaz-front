import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonExt } from "./base$PersonExt";
import { MicrotraumaInjured } from "./tsadv$MicrotraumaInjured";
import { Attachment } from "./tsadv$Attachment";
import { MicrotraumaWitnesses } from "./tsadv$MicrotraumaWitnesses";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { WorkPlace } from "./tsadv$WorkPlace";
export class Microtraum extends AbstractParentEntity {
  static NAME = "tsadv$Microtraum";
  managerPerson?: PersonExt | null;
  injured?: MicrotraumaInjured[] | null;
  attachment?: Attachment[] | null;
  witnesses?: MicrotraumaWitnesses[] | null;
  reportedPerson?: PersonExt | null;
  organization?: OrganizationGroupExt | null;
  microtraumaDate?: any | null;
  microtraumaTime?: any | null;
  microtraumaReason?: string | null;
  micratraumaConditions?: string | null;
  shiftStart?: any | null;
  shiftEnd?: any | null;
  workPlace?: WorkPlace | null;
}
export type MicrotraumViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "microtraum-view";
export type MicrotraumView<V extends MicrotraumViewName> = V extends "_base"
  ? Pick<
      Microtraum,
      | "id"
      | "microtraumaDate"
      | "microtraumaTime"
      | "microtraumaReason"
      | "micratraumaConditions"
      | "shiftStart"
      | "shiftEnd"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Microtraum,
      | "id"
      | "microtraumaDate"
      | "microtraumaTime"
      | "microtraumaReason"
      | "micratraumaConditions"
      | "shiftStart"
      | "shiftEnd"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "microtraum-view"
  ? Pick<
      Microtraum,
      | "id"
      | "managerPerson"
      | "reportedPerson"
      | "organization"
      | "microtraumaDate"
      | "microtraumaTime"
      | "microtraumaReason"
      | "micratraumaConditions"
      | "shiftStart"
      | "shiftEnd"
      | "injured"
      | "attachment"
      | "witnesses"
      | "workPlace"
    >
  : never;
