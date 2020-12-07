import { AbstractParentEntity } from "./AbstractParentEntity";
export class EmptyAPE extends AbstractParentEntity {
  static NAME = "base$EmptyAPE";
}
export type EmptyAPEViewName = "_minimal" | "_local" | "_base";
export type EmptyAPEView<V extends EmptyAPEViewName> = V extends "_local"
  ? Pick<
      EmptyAPE,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      EmptyAPE,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : never;
