import { AbstractGroup } from "./AbstractGroup";
export class EmptyGroup extends AbstractGroup {
  static NAME = "base$EmptyGroup";
}
export type EmptyGroupViewName = "_minimal" | "_local" | "_base";
export type EmptyGroupView<V extends EmptyGroupViewName> = V extends "_local"
  ? Pick<
      EmptyGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      EmptyGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : never;
