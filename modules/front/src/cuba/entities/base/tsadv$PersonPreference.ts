import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicPersonPreferenceType } from "./tsadv$DicPersonPreferenceType";
export class PersonPreference extends AbstractParentEntity {
  static NAME = "tsadv$PersonPreference";
  personGroup?: PersonGroupExt | null;
  preferenceType?: DicPersonPreferenceType | null;
  description?: string | null;
  descriptionEn?: string | null;
  descriptionRu?: string | null;
}
export type PersonPreferenceViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "personPreference.edit";
export type PersonPreferenceView<
  V extends PersonPreferenceViewName
> = V extends "_base"
  ? Pick<
      PersonPreference,
      | "id"
      | "description"
      | "descriptionEn"
      | "descriptionRu"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PersonPreference,
      | "id"
      | "description"
      | "descriptionEn"
      | "descriptionRu"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "personPreference.edit"
  ? Pick<
      PersonPreference,
      | "id"
      | "description"
      | "descriptionEn"
      | "descriptionRu"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personGroup"
      | "preferenceType"
    >
  : never;
