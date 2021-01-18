import { StandardEntity } from "./sys$StandardEntity";
import { Group } from "./sec$Group";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class SecurityPersonList extends StandardEntity {
  static NAME = "tsadv$SecurityPersonList";
  securityGroup?: Group | null;
  personGroup?: PersonGroupExt | null;
  transactionDate?: any | null;
}
export type SecurityPersonListViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "securityPersonList-edit"
  | "securityPersonList-view";
export type SecurityPersonListView<
  V extends SecurityPersonListViewName
> = V extends "_base"
  ? Pick<SecurityPersonList, "id" | "transactionDate">
  : V extends "_local"
  ? Pick<SecurityPersonList, "id" | "transactionDate">
  : V extends "securityPersonList-edit"
  ? Pick<
      SecurityPersonList,
      "id" | "securityGroup" | "personGroup" | "transactionDate"
    >
  : V extends "securityPersonList-view"
  ? Pick<
      SecurityPersonList,
      "id" | "securityGroup" | "personGroup" | "transactionDate"
    >
  : never;
