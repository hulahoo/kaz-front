import { AbstractEntityInt } from "./tsadv$AbstractEntityInt";
export class PersonAttachmentInt extends AbstractEntityInt {
  static NAME = "tsadv$PersonAttachmentInt";
  category?: any | null;
  categoryName?: string | null;
  filename?: string | null;
  file?: any | null;
  description?: string | null;
}
export type PersonAttachmentIntViewName = "_base" | "_local" | "_minimal";
export type PersonAttachmentIntView<
  V extends PersonAttachmentIntViewName
> = V extends "_base"
  ? Pick<PersonAttachmentInt, "id">
  : V extends "_minimal"
  ? Pick<PersonAttachmentInt, "id">
  : never;
