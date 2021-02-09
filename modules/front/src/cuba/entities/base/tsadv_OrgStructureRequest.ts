import { StandardEntity } from "./sys$StandardEntity";
import { OrgStructureRequestDetail } from "./tsadv_OrgStructureRequestDetail";
import { DicRequestStatus } from "./tsadv$DicRequestStatus";
import { FileDescriptor } from "./sys$FileDescriptor";
import { DicCompany } from "./tsadv$DicCompany";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class OrgStructureRequest extends StandardEntity {
  static NAME = "tsadv_OrgStructureRequest";
  orgStructureDetail?: OrgStructureRequestDetail[] | null;
  requestNumber?: any | null;
  requestDate?: any | null;
  requestStatus?: DicRequestStatus | null;
  file?: FileDescriptor[] | null;
  company?: DicCompany | null;
  department?: OrganizationGroupExt | null;
  author?: PersonGroupExt | null;
}
export type OrgStructureRequestViewName = "_base" | "_local" | "_minimal";
export type OrgStructureRequestView<
  V extends OrgStructureRequestViewName
> = V extends "_base"
  ? Pick<OrgStructureRequest, "id" | "requestNumber" | "requestDate">
  : V extends "_local"
  ? Pick<OrgStructureRequest, "id" | "requestNumber" | "requestDate">
  : never;
