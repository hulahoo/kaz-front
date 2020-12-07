import { StandardEntity } from "./sys$StandardEntity";
import { FileDescriptor } from "./sys$FileDescriptor";
import { ProcAttachmentType } from "./bpm$ProcAttachmentType";
import { ProcInstance } from "./bpm$ProcInstance";
import { ProcTask } from "./bpm$ProcTask";
import { User } from "./sec$User";
export class ProcAttachment extends StandardEntity {
  static NAME = "bpm$ProcAttachment";
  file?: FileDescriptor | null;
  type?: ProcAttachmentType | null;
  comment?: string | null;
  procInstance?: ProcInstance | null;
  procTask?: ProcTask | null;
  author?: User | null;
}
export type ProcAttachmentViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "procAttachment-browse"
  | "procAttachment-edit";
export type ProcAttachmentView<
  V extends ProcAttachmentViewName
> = V extends "_local"
  ? Pick<ProcAttachment, "id" | "comment">
  : V extends "_base"
  ? Pick<ProcAttachment, "id" | "comment">
  : V extends "procAttachment-browse"
  ? Pick<ProcAttachment, "id" | "comment" | "file" | "type" | "author">
  : V extends "procAttachment-edit"
  ? Pick<ProcAttachment, "id" | "comment" | "type" | "author">
  : never;
