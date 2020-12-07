import { AbstractParentEntity } from "./AbstractParentEntity";
import { TechnicalStatusDictionary } from "./tsadv$TechnicalStatusDictionary";
import { Buildings } from "./tsadv$Buildings";
export class TechnicalStatus extends AbstractParentEntity {
  static NAME = "tsadv$TechnicalStatus";
  buildTechnicalStatus?: TechnicalStatusDictionary | null;
  technicalStatusDate?: any | null;
  technicalStatusBuildstructures?: TechnicalStatusDictionary | null;
  buildings?: Buildings | null;
}
export type TechnicalStatusViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "technicalStatus-view";
export type TechnicalStatusView<
  V extends TechnicalStatusViewName
> = V extends "_local"
  ? Pick<
      TechnicalStatus,
      | "id"
      | "technicalStatusDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      TechnicalStatus,
      | "id"
      | "technicalStatusDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "technicalStatus-view"
  ? Pick<
      TechnicalStatus,
      | "id"
      | "buildTechnicalStatus"
      | "technicalStatusBuildstructures"
      | "technicalStatusDate"
    >
  : never;
