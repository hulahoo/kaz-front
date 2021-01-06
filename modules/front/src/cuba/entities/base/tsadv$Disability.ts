import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicDisabilityType } from "./tsadv$DicDisabilityType";
import { DicDuration } from "./tsadv$DicDuration";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class Disability extends AbstractParentEntity {
  static NAME = "tsadv$Disability";
  disabilityType?: DicDisabilityType | null;
  attachmentName?: string | null;
  attachment?: any | null;
  duration?: DicDuration | null;
  dateFrom?: any | null;
  dateTo?: any | null;
  personGroupExt?: PersonGroupExt | null;
}
export type DisabilityViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "disability.all";
export type DisabilityView<V extends DisabilityViewName> = V extends "_base"
  ? Pick<
      Disability,
      | "id"
      | "attachmentName"
      | "attachment"
      | "dateFrom"
      | "dateTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Disability,
      | "id"
      | "attachmentName"
      | "attachment"
      | "dateFrom"
      | "dateTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "disability.all"
  ? Pick<
      Disability,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "attachmentName"
      | "attachment"
      | "dateFrom"
      | "dateTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "disabilityType"
      | "duration"
      | "personGroupExt"
    >
  : never;
