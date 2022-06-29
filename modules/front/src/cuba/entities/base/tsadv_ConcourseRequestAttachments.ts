import { StandardEntity } from "./sys$StandardEntity";
import { FileDescriptor } from "./sys$FileDescriptor";
export class ConcourseRequestAttachments extends StandardEntity {
  static NAME = "tsadv_ConcourseRequestAttachments";
  comments?: string | null;
  attachment?: FileDescriptor | null;
  concourseRequestNumber?: string | null;
}
export type ConcourseRequestAttachmentsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "concourseRequestAttachments-view";
export type ConcourseRequestAttachmentsView<
  V extends ConcourseRequestAttachmentsViewName
> = V extends "_base"
  ? Pick<
      ConcourseRequestAttachments,
      "id" | "comments" | "concourseRequestNumber"
    >
  : V extends "_local"
  ? Pick<
      ConcourseRequestAttachments,
      "id" | "comments" | "concourseRequestNumber"
    >
  : V extends "concourseRequestAttachments-view"
  ? Pick<
      ConcourseRequestAttachments,
      "id" | "comments" | "concourseRequestNumber" | "attachment"
    >
  : never;
