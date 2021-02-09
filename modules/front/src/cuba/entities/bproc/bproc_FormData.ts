import {BprocFormField} from "./bproc_FormField";
import {BprocFormOutputVariable} from "./bproc_FormOutputVariable";
import {BprocFormOutcome} from "./bproc_FormOutcome";
import {BprocFormParam} from "./bproc_FormParam";

export class BprocFormData {
  static NAME = "bprco_FormData";
  type?: string | null;
  screenId?: string | null;
  openMode?: string | null;
  businessKey?: string | null;
  allowedProcessKeys?: string[] | null;
  fields?: BprocFormField[] | null;
  outcomes?: BprocFormOutcome[] | null;
  formParams?: BprocFormParam[] | null;
  outputVariables?: BprocFormOutputVariable[] | null;
}