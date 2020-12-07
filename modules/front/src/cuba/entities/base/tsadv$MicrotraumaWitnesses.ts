import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonExt } from "./base$PersonExt";
import { Microtraum } from "./tsadv$Microtraum";
export class MicrotraumaWitnesses extends AbstractParentEntity {
  static NAME = "tsadv$MicrotraumaWitnesses";
  person?: PersonExt | null;
  microtraum?: Microtraum | null;
}
export type MicrotraumaWitnessesViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "microtraumaWitnesses-view";
export type MicrotraumaWitnessesView<
  V extends MicrotraumaWitnessesViewName
> = V extends "_local"
  ? Pick<
      MicrotraumaWitnesses,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      MicrotraumaWitnesses,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "microtraumaWitnesses-view"
  ? Pick<MicrotraumaWitnesses, "id" | "person">
  : never;
