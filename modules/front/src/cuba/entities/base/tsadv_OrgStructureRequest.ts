import {StandardEntity} from "./sys$StandardEntity";
import {OrgStructureRequestDetail} from "./tsadv_OrgStructureRequestDetail";
import {DicRequestStatus} from "./tsadv$DicRequestStatus";
import {FileDescriptor} from "./sys$FileDescriptor";
import {DicCompany} from "./base_DicCompany";
import {OrganizationGroupExt} from "./base$OrganizationGroupExt";
import {PersonGroupExt} from "./base$PersonGroupExt";

export class OrgStructureRequest extends StandardEntity {
  static NAME = "tsadv_OrgStructureRequest";
  orgStructureDetail?: OrgStructureRequestDetail[] | null;
  modifyDate?: any | null;
  requestNumber?: any | null;
  requestDate?: any | null;
  requestStatus?: DicRequestStatus | null;
  file?: FileDescriptor[] | null;
  company?: DicCompany | null;
  department?: OrganizationGroupExt | null;
  author?: PersonGroupExt | null;
  comment?: string | null
}

export type OrgStructureRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "orgStructureRequest-edit";
export type OrgStructureRequestView<V extends OrgStructureRequestViewName> = V extends "_base"
  ? Pick<OrgStructureRequest,
    "id" | "modifyDate" | "requestNumber" | "requestDate">
  : V extends "_local"
    ? Pick<OrgStructureRequest,
      "id" | "modifyDate" | "requestNumber" | "requestDate">
    : V extends "orgStructureRequest-edit"
      ? Pick<OrgStructureRequest,
        | "id"
        | "modifyDate"
        | "requestNumber"
        | "requestDate"
        | "requestStatus"
        | "company"
        | "department"
        | "author">
      : V extends "orgStructureRequest-edit"
        ? Pick<OrgStructureRequest,
          | "id"
          | "modifyDate"
          | "requestNumber"
          | "requestDate"
          | "company"
          | "department"
          | "author">
        : never;
