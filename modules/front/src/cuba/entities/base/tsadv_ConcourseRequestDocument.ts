import { AbstractBprocRequest } from "./AbstractBprocRequest";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { FileDescriptor } from "./sys$FileDescriptor";
export class ConcourseRequestDocument extends AbstractBprocRequest {
  static NAME = "tsadv_ConcourseRequestDocument";
  comment?: string | null;
  personGroup?: PersonGroupExt | null;
  attachment?: FileDescriptor | null;
  createDate?: any | null;
}
export type ConcourseRequestDocumentViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "concourseRequestDocument-edit"
  | "concourseRequestDocument-view";
export type ConcourseRequestDocumentView<
  V extends ConcourseRequestDocumentViewName
> = V extends "_base"
  ? Pick<
      ConcourseRequestDocument,
      | "id"
      | "personGroup"
      | "comment"
      | "createDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
    >
  : V extends "_local"
  ? Pick<
      ConcourseRequestDocument,
      | "id"
      | "comment"
      | "createDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
    >
  : V extends "_minimal"
  ? Pick<ConcourseRequestDocument, "id" | "personGroup">
  : V extends "concourseRequestDocument-edit"
  ? Pick<
      ConcourseRequestDocument,
      | "id"
      | "comment"
      | "createDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "attachment"
    >
  : V extends "concourseRequestDocument-view"
  ? Pick<
      ConcourseRequestDocument,
      | "id"
      | "comment"
      | "createDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "attachment"
    >
  : never;
