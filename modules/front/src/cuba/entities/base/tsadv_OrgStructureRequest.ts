import { AbstractBprocRequest } from "./AbstractBprocRequest";
import { OrgStructureRequestDetail } from "./tsadv_OrgStructureRequestDetail";
import { FileDescriptor } from "./sys$FileDescriptor";
import { DicCompany } from "./base_DicCompany";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class OrgStructureRequest extends AbstractBprocRequest {
  static NAME = "tsadv_OrgStructureRequest";
  static PROCESS_DEFINITION_KEY = "orgStructureRequest";

  orgStructureDetail?: OrgStructureRequestDetail[] | null;
  modifyDate?: any | null;
  file?: FileDescriptor[] | null;
  company?: DicCompany | null;
  department?: OrganizationGroupExt | null;
  author?: PersonGroupExt | null;
}
export type OrgStructureRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "orgStructureRequest-edit"
  | "orgStructureRequest-edit";
export type OrgStructureRequestView<
  V extends OrgStructureRequestViewName
> = V extends "_base"
  ? Pick<
      OrgStructureRequest,
      | "id"
      | "requestNumber"
      | "requestDate"
      | "modifyDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "comment"
    >
  : V extends "_local"
  ? Pick<
      OrgStructureRequest,
      | "id"
      | "modifyDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
    >
  : V extends "_minimal"
  ? Pick<OrgStructureRequest, "id" | "requestNumber" | "requestDate">
  : V extends "orgStructureRequest-edit"
  ? Pick<
      OrgStructureRequest,
      | "id"
      | "modifyDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "status"
      | "company"
      | "department"
      | "author"
    >
  : V extends "orgStructureRequest-edit"
  ? Pick<
      OrgStructureRequest,
      | "id"
      | "requestNumber"
      | "requestDate"
      | "modifyDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "comment"
      | "company"
      | "department"
      | "author"
    >
  : never;
