import { AbstractParentEntity } from "./AbstractParentEntity";
import { FileDescriptor } from "./sys$FileDescriptor";
export class LearningObject extends AbstractParentEntity {
  static NAME = "tsadv$LearningObject";
  objectName?: string | null;
  description?: string | null;
  url?: string | null;
  contentType?: any | null;
  file?: FileDescriptor | null;
  html?: string | null;
  text?: string | null;
}
export type LearningObjectViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "learningObject.browse";
export type LearningObjectView<
  V extends LearningObjectViewName
> = V extends "_base"
  ? Pick<
      LearningObject,
      | "id"
      | "objectName"
      | "description"
      | "url"
      | "contentType"
      | "html"
      | "text"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      LearningObject,
      | "id"
      | "objectName"
      | "description"
      | "url"
      | "contentType"
      | "html"
      | "text"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "learningObject.browse"
  ? Pick<
      LearningObject,
      | "id"
      | "objectName"
      | "description"
      | "url"
      | "contentType"
      | "html"
      | "text"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "file"
    >
  : never;
