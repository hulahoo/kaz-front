import { AbstractGroup } from "./AbstractGroup";
export class OrganizationGroup extends AbstractGroup {
  static NAME = "base$OrganizationGroup";
}
export type OrganizationGroupViewName = "_base" | "_local" | "_minimal";
export type OrganizationGroupView<
  V extends OrganizationGroupViewName
> = V extends "_base"
  ? Pick<
      OrganizationGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      OrganizationGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<OrganizationGroup, "id">
  : never;
