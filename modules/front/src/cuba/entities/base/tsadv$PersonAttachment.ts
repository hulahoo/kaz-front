import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicAttachmentCategory } from "./tsadv$DicAttachmentCategory";
import { FileDescriptor } from "./sys$FileDescriptor";
export class PersonAttachment extends AbstractParentEntity {
  static NAME = "tsadv$PersonAttachment";
  personGroup?: PersonGroupExt | null;
  category?: DicAttachmentCategory | null;
  filename?: string | null;
  description?: string | null;
  attachment?: FileDescriptor | null;
}
export type PersonAttachmentViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "personAttachment.view"
  | "personAttachment.full"
  | "personAttachment-view-for-requisitionjobrequest";
export type PersonAttachmentView<
  V extends PersonAttachmentViewName
> = V extends "_minimal"
  ? Pick<PersonAttachment, "id" | "filename">
  : V extends "_local"
  ? Pick<
      PersonAttachment,
      | "id"
      | "filename"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      PersonAttachment,
      | "id"
      | "filename"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "personAttachment.view"
  ? Pick<
      PersonAttachment,
      | "id"
      | "filename"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personGroup"
      | "category"
      | "attachment"
    >
  : V extends "personAttachment.full"
  ? Pick<
      PersonAttachment,
      | "id"
      | "filename"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personGroup"
      | "category"
      | "attachment"
    >
  : V extends "personAttachment-view-for-requisitionjobrequest"
  ? Pick<PersonAttachment, "id" | "filename" | "category" | "attachment">
  : never;
