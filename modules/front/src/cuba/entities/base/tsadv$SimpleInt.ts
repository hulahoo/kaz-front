import { AbstractEntityInt } from "./tsadv$AbstractEntityInt";
export class SimpleInt extends AbstractEntityInt {
  static NAME = "tsadv$SimpleInt";
  result?: string | null;
  errorMessage?: string | null;
}
export type SimpleIntViewName = "_base" | "_local" | "_minimal";
export type SimpleIntView<V extends SimpleIntViewName> = V extends "_base"
  ? Pick<SimpleInt, "id">
  : V extends "_minimal"
  ? Pick<SimpleInt, "id">
  : never;
