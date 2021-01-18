import { StandardEntity } from "./sys$StandardEntity";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { DicCurrency } from "./base$DicCurrency";
export class OrganizationProperties extends StandardEntity {
  static NAME = "tsadv$OrganizationProperties";
  organization?: OrganizationGroupExt | null;
  functionalCurrency?: DicCurrency | null;
}
export type OrganizationPropertiesViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "organizationProperties-view";
export type OrganizationPropertiesView<
  V extends OrganizationPropertiesViewName
> = V extends "_base"
  ? Pick<OrganizationProperties, "id" | "organization">
  : V extends "_minimal"
  ? Pick<OrganizationProperties, "id" | "organization">
  : V extends "organizationProperties-view"
  ? Pick<OrganizationProperties, "id" | "organization" | "functionalCurrency">
  : never;
