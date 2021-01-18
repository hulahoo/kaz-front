import { AbstractParentEntity } from "./AbstractParentEntity";
export class EmptyAPE extends AbstractParentEntity {
  static NAME = "base$EmptyAPE";
}
export type EmptyAPEViewName = "_base" | "_local" | "_minimal";
export type EmptyAPEView<V extends EmptyAPEViewName> = V extends "_base"
  ? Pick<
      EmptyAPE,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      EmptyAPE,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : never;
