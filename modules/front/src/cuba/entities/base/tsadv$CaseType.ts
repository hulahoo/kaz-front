import { AbstractParentEntity } from "./AbstractParentEntity";
export class CaseType extends AbstractParentEntity {
  static NAME = "tsadv$CaseType";
  name?: string | null;
  code?: string | null;
  language?: string | null;
  question?: string | null;
}
export type CaseTypeViewName = "_base" | "_local" | "_minimal";
export type CaseTypeView<V extends CaseTypeViewName> = V extends "_base"
  ? Pick<
      CaseType,
      | "id"
      | "name"
      | "code"
      | "language"
      | "question"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      CaseType,
      | "id"
      | "name"
      | "code"
      | "language"
      | "question"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<CaseType, "id" | "name">
  : never;
