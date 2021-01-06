import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class UnknownElementModel extends BaseUuidEntity {
  static NAME = "bproc_UnknownElementModel";
  businessId?: string | null;
  name?: string | null;
}
export type UnknownElementModelViewName = "_base" | "_local" | "_minimal";
export type UnknownElementModelView<
  V extends UnknownElementModelViewName
> = V extends "_base"
  ? Pick<UnknownElementModel, "id" | "name">
  : V extends "_minimal"
  ? Pick<UnknownElementModel, "id" | "name">
  : never;
