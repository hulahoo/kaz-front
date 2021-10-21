import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicAbsenceType } from "./tsadv$DicAbsenceType";
import { DicAbsencePurpose } from "./tsadv_DicAbsencePurpose";
export class AbsPurposeSetting extends AbstractParentEntity {
  static NAME = "tsadv_AbsPurposeSetting";
  absenceType?: DicAbsenceType | null;
  absencePurpose?: DicAbsencePurpose | null;
  orderNumber?: number | null;
}
export type AbsPurposeSettingViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "absPurposeSetting-absence";
export type AbsPurposeSettingView<
  V extends AbsPurposeSettingViewName
> = V extends "_base"
  ? Pick<
      AbsPurposeSetting,
      | "id"
      | "absenceType"
      | "absencePurpose"
      | "orderNumber"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      AbsPurposeSetting,
      | "id"
      | "orderNumber"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<AbsPurposeSetting, "id" | "absenceType" | "absencePurpose">
  : V extends "absPurposeSetting-absence"
  ? Pick<
      AbsPurposeSetting,
      "id" | "absenceType" | "absencePurpose" | "absenceType" | "absencePurpose"
    >
  : never;
