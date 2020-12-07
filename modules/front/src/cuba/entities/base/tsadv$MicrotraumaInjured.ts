import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonExt } from "./base$PersonExt";
import { InjuredOrgan } from "./tsadv$InjuredOrgan";
import { Microtraum } from "./tsadv$Microtraum";
export class MicrotraumaInjured extends AbstractParentEntity {
  static NAME = "tsadv$MicrotraumaInjured";
  person?: PersonExt | null;
  organ?: InjuredOrgan[] | null;
  correctiveActions?: string | null;
  noteMicrotraumaToAccident?: string | null;
  microtraum?: Microtraum | null;
}
export type MicrotraumaInjuredViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "microtraumaInjured-view";
export type MicrotraumaInjuredView<
  V extends MicrotraumaInjuredViewName
> = V extends "_local"
  ? Pick<
      MicrotraumaInjured,
      | "id"
      | "correctiveActions"
      | "noteMicrotraumaToAccident"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      MicrotraumaInjured,
      | "id"
      | "correctiveActions"
      | "noteMicrotraumaToAccident"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "microtraumaInjured-view"
  ? Pick<
      MicrotraumaInjured,
      | "id"
      | "person"
      | "correctiveActions"
      | "noteMicrotraumaToAccident"
      | "organ"
    >
  : never;
