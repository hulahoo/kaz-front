import { AbstractTimeBasedEntity } from "./AbstractTimeBasedEntity";
export class EmptyTBE extends AbstractTimeBasedEntity {
  static NAME = "base$EmptyTBE";
}
export type EmptyTBEViewName = "_minimal" | "_local" | "_base";
export type EmptyTBEView<V extends EmptyTBEViewName> = V extends "_local"
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
  : V extends "_base"
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
