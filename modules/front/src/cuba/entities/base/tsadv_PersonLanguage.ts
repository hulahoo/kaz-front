import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicLanguage } from "./base$DicLanguage";
import { DicLanguageLevel } from "./tsadv_DicLanguageLevel";
export class PersonLanguage extends AbstractParentEntity {
  static NAME = "tsadv_PersonLanguage";
  personGroup?: PersonGroupExt | null;
  language?: DicLanguage | null;
  languageLevel?: DicLanguageLevel | null;
}
export type PersonLanguageViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "personLanguage.edit";
export type PersonLanguageView<
  V extends PersonLanguageViewName
> = V extends "_base"
  ? Pick<
      PersonLanguage,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PersonLanguage,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "personLanguage.edit"
  ? Pick<
      PersonLanguage,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personGroup"
      | "language"
      | "languageLevel"
    >
  : never;
