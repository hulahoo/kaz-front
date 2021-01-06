import { AbstractParentEntity } from "./AbstractParentEntity";
import { MicrotraumaInjured } from "./tsadv$MicrotraumaInjured";
export class InjuredOrgan extends AbstractParentEntity {
  static NAME = "tsadv$InjuredOrgan";
  injuredOrgan?: string | null;
  microtraumaInjured?: MicrotraumaInjured | null;
}
export type InjuredOrganViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "injuredOrgan-view";
export type InjuredOrganView<V extends InjuredOrganViewName> = V extends "_base"
  ? Pick<
      InjuredOrgan,
      | "id"
      | "injuredOrgan"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      InjuredOrgan,
      | "id"
      | "injuredOrgan"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "injuredOrgan-view"
  ? Pick<InjuredOrgan, "id" | "injuredOrgan">
  : never;
