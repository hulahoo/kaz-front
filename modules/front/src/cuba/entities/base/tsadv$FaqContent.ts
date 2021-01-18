import { AbstractParentEntity } from "./AbstractParentEntity";
export class FaqContent extends AbstractParentEntity {
  static NAME = "tsadv$FaqContent";
  langValue1?: string | null;
  langValue2?: string | null;
  langValue3?: string | null;
  langValue4?: string | null;
  langValue5?: string | null;
  langValue?: string | null;
}
export type FaqContentViewName = "_base" | "_local" | "_minimal";
export type FaqContentView<V extends FaqContentViewName> = V extends "_base"
  ? Pick<
      FaqContent,
      | "id"
      | "langValue"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      FaqContent,
      | "id"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
      | "langValue"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<FaqContent, "id" | "langValue">
  : never;
