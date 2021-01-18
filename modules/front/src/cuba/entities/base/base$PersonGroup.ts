import { AbstractGroup } from "./AbstractGroup";
export class PersonGroup extends AbstractGroup {
  static NAME = "base$PersonGroup";
}
export type PersonGroupViewName = "_base" | "_local" | "_minimal";
export type PersonGroupView<V extends PersonGroupViewName> = V extends "_base"
  ? Pick<
      PersonGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PersonGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<PersonGroup, "id">
  : never;
