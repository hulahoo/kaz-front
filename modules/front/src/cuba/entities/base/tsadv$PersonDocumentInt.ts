import { AbstractEntityInt } from "./tsadv$AbstractEntityInt";
export class PersonDocumentInt extends AbstractEntityInt {
  static NAME = "tsadv$PersonDocumentInt";
  issueDate?: string | null;
  expiredDate?: string | null;
  issuedBy?: string | null;
  description?: string | null;
  documentType?: string | null;
  personLegacyId?: string | null;
  documentNumber?: string | null;
  status?: string | null;
  file?: string | null;
}
export type PersonDocumentIntViewName = "_minimal" | "_local" | "_base";
export type PersonDocumentIntView<
  V extends PersonDocumentIntViewName
> = V extends "_minimal"
  ? Pick<PersonDocumentInt, "id">
  : V extends "_base"
  ? Pick<PersonDocumentInt, "id">
  : never;
