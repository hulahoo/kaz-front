import { AbstractParentEntity } from "./AbstractParentEntity";
import { LookupType } from "./tsadv$LookupType";
export class LookupValue extends AbstractParentEntity {
  static NAME = "tsadv$LookupValue";
  lookupType?: LookupType | null;
  lookupTypeCode?: string | null;
  meaningLang1?: string | null;
  meaningLang2?: string | null;
  meaningLang3?: string | null;
  descriptionLang1?: string | null;
  descriptionLang2?: string | null;
  descriptionLang3?: string | null;
  enabledFlag?: boolean | null;
  startDate?: any | null;
  endDate?: any | null;
  tag?: string | null;
}
export type LookupValueViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "lookupValue.edit";
export type LookupValueView<V extends LookupValueViewName> = V extends "_local"
  ? Pick<
      LookupValue,
      | "id"
      | "lookupTypeCode"
      | "meaningLang1"
      | "meaningLang2"
      | "meaningLang3"
      | "descriptionLang1"
      | "descriptionLang2"
      | "descriptionLang3"
      | "enabledFlag"
      | "startDate"
      | "endDate"
      | "tag"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      LookupValue,
      | "id"
      | "lookupTypeCode"
      | "meaningLang1"
      | "meaningLang2"
      | "meaningLang3"
      | "descriptionLang1"
      | "descriptionLang2"
      | "descriptionLang3"
      | "enabledFlag"
      | "startDate"
      | "endDate"
      | "tag"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "lookupValue.edit"
  ? Pick<
      LookupValue,
      | "id"
      | "lookupTypeCode"
      | "meaningLang1"
      | "meaningLang2"
      | "meaningLang3"
      | "descriptionLang1"
      | "descriptionLang2"
      | "descriptionLang3"
      | "enabledFlag"
      | "startDate"
      | "endDate"
      | "tag"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "lookupType"
    >
  : never;
