import { AbstractParentEntity } from "./AbstractParentEntity";
import { Requisition } from "./tsadv$Requisition";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class RequisitionMember extends AbstractParentEntity {
  static NAME = "tsadv$RequisitionMember";
  requisition?: Requisition | null;
  personGroup?: PersonGroupExt | null;
  accessLevel?: any | null;
}
export type RequisitionMemberViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "requisitionMember.view";
export type RequisitionMemberView<
  V extends RequisitionMemberViewName
> = V extends "_base"
  ? Pick<
      RequisitionMember,
      | "id"
      | "accessLevel"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      RequisitionMember,
      | "id"
      | "accessLevel"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<RequisitionMember, "id">
  : V extends "requisitionMember.view"
  ? Pick<
      RequisitionMember,
      | "id"
      | "accessLevel"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requisition"
      | "personGroup"
    >
  : never;
