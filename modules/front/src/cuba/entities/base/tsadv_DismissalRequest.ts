import {AbstractBprocRequest} from "./AbstractBprocRequest";
import {FileDescriptor} from "./sys$FileDescriptor";
import {PersonGroupExt} from "./base$PersonGroupExt";

export class DismissalRequest extends AbstractBprocRequest {
  static NAME = "tsadv_DismissalRequest";
  employeeName?: string | null;
  staffUnit?: string | null;
  position?: string | null;
  subdivision?: string | null;
  dateOfReceipt?: any | null;
  reasonForDismissal?: string | null;
  dateOfDismissal?: any | null;
  employeeFile?: FileDescriptor | null;
  personGroup?: PersonGroupExt | null;
}

export type DismissalApplicationViewName = "_base" | "_local" | "_minimal" ;
