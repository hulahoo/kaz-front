import {PersonGroup} from "./base$PersonGroup";
import {FileDescriptor} from "./sys$FileDescriptor";
import {AbstractParentEntity} from "./AbstractParentEntity";

export class PersonPayslip extends AbstractParentEntity {
  static NAME = "tsadv_PersonPayslip";
  personGroup?: PersonGroup | null;
  period?: any | null;
  file?: FileDescriptor | null;
}

export type PersonPayslipViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "portal.personPayslip-list";
export type PersonPayslipView<V extends PersonPayslipViewName> = V extends "_base"
  ? Pick<PersonPayslip, "id" | "period">
  : V extends "_local"
    ? Pick<PersonPayslip, "id" | "period">
    : V extends "portal.personPayslip-list"
      ? Pick<PersonPayslip, "id" | "period" | "personGroup" | "file">
      : never;
