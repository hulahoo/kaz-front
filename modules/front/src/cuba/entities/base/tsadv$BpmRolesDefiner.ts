import { StandardEntity } from "./sys$StandardEntity";
import { DicCompany } from "./base_DicCompany";
import { BpmRolesLink } from "./tsadv$BpmRolesLink";
export class BpmRolesDefiner extends StandardEntity {
  static NAME = "tsadv$BpmRolesDefiner";
  processDefinitionKey?: string | null;
  company?: DicCompany | null;
  links?: BpmRolesLink[] | null;
}
export type BpmRolesDefinerViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "bpmRolesDefiner-view";
export type BpmRolesDefinerView<
  V extends BpmRolesDefinerViewName
> = V extends "_base"
  ? Pick<BpmRolesDefiner, "id" | "processDefinitionKey">
  : V extends "_local"
  ? Pick<BpmRolesDefiner, "id" | "processDefinitionKey">
  : V extends "_minimal"
  ? Pick<BpmRolesDefiner, "id" | "processDefinitionKey">
  : V extends "bpmRolesDefiner-view"
  ? Pick<BpmRolesDefiner, "id" | "processDefinitionKey" | "company" | "links">
  : never;
