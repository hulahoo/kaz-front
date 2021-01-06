import { AbstractTimeBasedEntity } from "./AbstractTimeBasedEntity";
export class EmptyTBE extends AbstractTimeBasedEntity {
  static NAME = "base$EmptyTBE";
}
export type EmptyTBEViewName = "_base" | "_local" | "_minimal";
export type EmptyTBEView<V extends EmptyTBEViewName> = V extends "_base"
  ? Pick<
      EmptyTBE,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "_local"
  ? Pick<
      EmptyTBE,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : never;
