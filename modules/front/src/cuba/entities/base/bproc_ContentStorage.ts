import { StandardEntity } from "./sys$StandardEntity";
import { User } from "./sec$User";
export class ContentStorage extends StandardEntity {
  static NAME = "bproc_ContentStorage";
  name?: string | null;
  content?: any | null;
  type?: string | null;
  author?: User | null;
}
export type ContentStorageViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "contentStorage-edit"
  | "contentStorage-lookup";
export type ContentStorageView<
  V extends ContentStorageViewName
> = V extends "_base"
  ? Pick<ContentStorage, "id" | "name" | "content" | "type">
  : V extends "_local"
  ? Pick<ContentStorage, "id" | "name" | "content" | "type">
  : V extends "contentStorage-edit"
  ? Pick<
      ContentStorage,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "name"
      | "author"
      | "content"
    >
  : V extends "contentStorage-lookup"
  ? Pick<
      ContentStorage,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "name"
      | "author"
    >
  : never;
