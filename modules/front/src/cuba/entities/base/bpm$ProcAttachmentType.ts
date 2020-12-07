import { StandardEntity } from "./sys$StandardEntity";
export class ProcAttachmentType extends StandardEntity {
  static NAME = "bpm$ProcAttachmentType";
  name?: string | null;
  code?: string | null;
}
export type ProcAttachmentTypeViewName = "_minimal" | "_local" | "_base";
export type ProcAttachmentTypeView<
  V extends ProcAttachmentTypeViewName
> = V extends "_minimal"
  ? Pick<ProcAttachmentType, "id" | "name">
  : V extends "_local"
  ? Pick<ProcAttachmentType, "id" | "name" | "code">
  : V extends "_base"
  ? Pick<ProcAttachmentType, "id" | "name" | "code">
  : never;
