import { StandardEntity } from "./sys$StandardEntity";
import { FileDescriptor } from "./sys$FileDescriptor";
import { Agreement } from "./tsadv$Agreement";
export class AgreementDocument extends StandardEntity {
  static NAME = "tsadv$AgreementDocument";
  file?: FileDescriptor | null;
  description?: string | null;
  agreement?: Agreement | null;
}
export type AgreementDocumentViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "agreementDocument.view";
export type AgreementDocumentView<
  V extends AgreementDocumentViewName
> = V extends "_local"
  ? Pick<AgreementDocument, "id" | "description">
  : V extends "_base"
  ? Pick<AgreementDocument, "id" | "description">
  : V extends "agreementDocument.view"
  ? Pick<AgreementDocument, "id" | "description" | "file" | "agreement">
  : never;
