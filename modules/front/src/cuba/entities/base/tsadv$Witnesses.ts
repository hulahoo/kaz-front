import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonExt } from "./base$PersonExt";
import { AccidentPersonType } from "./tsadv$AccidentPersonType";
import { Accidents } from "./tsadv$Accidents";
export class Witnesses extends AbstractParentEntity {
  static NAME = "tsadv$Witnesses";
  person?: PersonExt | null;
  type?: AccidentPersonType | null;
  accidents?: Accidents | null;
}
export type WitnessesViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "witnesses-view";
export type WitnessesView<V extends WitnessesViewName> = V extends "_base"
  ? Pick<
      Witnesses,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Witnesses,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "witnesses-view"
  ? Pick<Witnesses, "id" | "person" | "type">
  : never;
