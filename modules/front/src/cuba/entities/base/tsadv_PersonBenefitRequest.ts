import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicReasonBenifit } from "./tsadv_DicReasonBenifit";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicRequestStatus } from "./tsadv$DicRequestStatus";
import { FileDescriptor } from "./sys$FileDescriptor";
import { PersonBenefit } from "./tsadv_PersonBenefit";
export class PersonBenefitRequest extends AbstractParentEntity {
  static NAME = "tsadv_PersonBenefitRequest";
  reason?: DicReasonBenifit | null;
  combatant?: any | null;
  certificateFromDate?: string | null;
  documentNumber?: string | null;
  radiationRiskZone?: any | null;
  personGroup?: PersonGroupExt | null;
  requestStatus?: DicRequestStatus | null;
  file?: FileDescriptor | null;
  personBenefit?: PersonBenefit | null;
}
export type PersonBenefitRequestViewName = "_base" | "_local" | "_minimal";
export type PersonBenefitRequestView<
  V extends PersonBenefitRequestViewName
> = V extends "_base"
  ? Pick<
      PersonBenefitRequest,
      | "id"
      | "combatant"
      | "certificateFromDate"
      | "documentNumber"
      | "radiationRiskZone"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PersonBenefitRequest,
      | "id"
      | "combatant"
      | "certificateFromDate"
      | "documentNumber"
      | "radiationRiskZone"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
