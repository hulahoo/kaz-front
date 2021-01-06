import { StandardEntity } from "./sys$StandardEntity";
import { Group } from "./sec$Group";
import { DicPersonType } from "./tsadv$DicPersonType";
export class SecurityPersonType extends StandardEntity {
  static NAME = "tsadv$SecurityPersonType";
  securityGroup?: Group | null;
  personType?: DicPersonType | null;
}
export type SecurityPersonTypeViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "securityPersonType-edit"
  | "securityPersonType-view";
export type SecurityPersonTypeView<
  V extends SecurityPersonTypeViewName
> = V extends "securityPersonType-edit"
  ? Pick<SecurityPersonType, "id" | "securityGroup" | "personType">
  : V extends "securityPersonType-view"
  ? Pick<SecurityPersonType, "id" | "securityGroup" | "personType">
  : never;
