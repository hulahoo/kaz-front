import { AbstractEntityInt } from "./tsadv$AbstractEntityInt";
export class DictionaryInt extends AbstractEntityInt {
  static NAME = "tsadv$DictionaryInt";
  code?: string | null;
  name?: string | null;
  competenceTypeCode?: string | null;
}
export type DictionaryIntViewName = "_minimal" | "_local" | "_base";
export type DictionaryIntView<
  V extends DictionaryIntViewName
> = V extends "_minimal"
  ? Pick<DictionaryInt, "id" | "code">
  : V extends "_base"
  ? Pick<DictionaryInt, "id" | "code">
  : never;
