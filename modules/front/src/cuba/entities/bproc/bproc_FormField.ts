import {BprocFormFieldProperty} from "./bproc_FormFieldProperty";

export class BprocFormField {
  static NAME = "bproc_FormField";

  id?: string | null;
  caption?: string | null;
  type?: string | null;
  editable?: boolean | true;
  required?: boolean | false;
  value?: any | null;
  properties?: BprocFormFieldProperty[] | null;
  enumValues?: any[] | null;
}