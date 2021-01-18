import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicReasonBenifit } from "./tsadv_DicReasonBenifit";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class PersonBenefit extends AbstractParentEntity {
  static NAME = "tsadv_PersonBenefit";
  reason?: DicReasonBenifit | null;
  combatant?: any | null;
  certificateFromDate?: string | null;
  documentNumber?: string | null;
  radiationRiskZone?: any | null;
  startDateHistory?: any | null;
  endDateHistory?: any | null;
  personGroup?: PersonGroupExt | null;
}
export type PersonBenefitViewName = "_base" | "_local" | "_minimal";
export type PersonBenefitView<
  V extends PersonBenefitViewName
> = V extends "_base"
  ? Pick<
      PersonBenefit,
      | "id"
      | "combatant"
      | "certificateFromDate"
      | "documentNumber"
      | "radiationRiskZone"
      | "startDateHistory"
      | "endDateHistory"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PersonBenefit,
      | "id"
      | "combatant"
      | "certificateFromDate"
      | "documentNumber"
      | "radiationRiskZone"
      | "startDateHistory"
      | "endDateHistory"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
