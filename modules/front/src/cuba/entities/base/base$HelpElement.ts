import { AbstractParentEntity } from "./AbstractParentEntity";
export class HelpElement extends AbstractParentEntity {
  static NAME = "base$HelpElement";
  nameLang1?: string | null;
  nameLang2?: string | null;
  nameLang3?: string | null;
  nameLang4?: string | null;
  nameLang5?: string | null;
  contentLang1?: string | null;
  contentLang2?: string | null;
  contentLang3?: string | null;
  contentLang4?: string | null;
  contentLang5?: string | null;
  screen?: string | null;
  parent?: HelpElement | null;
  name?: string | null;
  content?: string | null;
}
export type HelpElementViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "helpElement.edit"
  | "helpElement.view";
export type HelpElementView<V extends HelpElementViewName> = V extends "_base"
  ? Pick<
      HelpElement,
      | "id"
      | "name"
      | "nameLang1"
      | "nameLang2"
      | "nameLang3"
      | "nameLang4"
      | "nameLang5"
      | "contentLang1"
      | "contentLang2"
      | "contentLang3"
      | "contentLang4"
      | "contentLang5"
      | "screen"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      HelpElement,
      | "id"
      | "nameLang1"
      | "nameLang2"
      | "nameLang3"
      | "nameLang4"
      | "nameLang5"
      | "contentLang1"
      | "contentLang2"
      | "contentLang3"
      | "contentLang4"
      | "contentLang5"
      | "screen"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<HelpElement, "id" | "name">
  : V extends "helpElement.edit"
  ? Pick<
      HelpElement,
      | "id"
      | "nameLang1"
      | "nameLang2"
      | "nameLang3"
      | "nameLang4"
      | "nameLang5"
      | "contentLang1"
      | "contentLang2"
      | "contentLang3"
      | "contentLang4"
      | "contentLang5"
      | "screen"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "parent"
    >
  : V extends "helpElement.view"
  ? Pick<
      HelpElement,
      | "id"
      | "nameLang1"
      | "nameLang2"
      | "nameLang3"
      | "nameLang4"
      | "nameLang5"
      | "contentLang1"
      | "contentLang2"
      | "contentLang3"
      | "contentLang4"
      | "contentLang5"
      | "screen"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "parent"
    >
  : never;
