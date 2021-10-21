import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicDocumentType } from "./tsadv$DicDocumentType";
import { FileDescriptor } from "./sys$FileDescriptor";
export class ListOfDocuments extends AbstractParentEntity {
  static NAME = "tsadv_ListOfDocuments";
  personGroup?: PersonGroupExt | null;
  type?: DicDocumentType | null;
  file?: FileDescriptor | null;
  date?: any | null;
}
export type ListOfDocumentsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "listOfDocuments.edit";
export type ListOfDocumentsView<
  V extends ListOfDocumentsViewName
> = V extends "_base"
  ? Pick<
      ListOfDocuments,
      "id" | "date" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      ListOfDocuments,
      "id" | "date" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "listOfDocuments.edit"
  ? Pick<
      ListOfDocuments,
      | "id"
      | "date"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personGroup"
      | "type"
      | "file"
    >
  : never;
