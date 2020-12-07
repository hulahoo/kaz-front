import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { GroupStencil } from "./bpm$GroupStencil";
export class Stencil extends BaseUuidEntity {
  static NAME = "bpm$Stencil";
  stencilId?: string | null;
  title?: string | null;
  description?: string | null;
  editable?: boolean | null;
  orderNo?: number | null;
  parentGroup?: GroupStencil | null;
}
export type StencilViewName = "_minimal" | "_local" | "_base";
export type StencilView<V extends StencilViewName> = V extends "_minimal"
  ? Pick<Stencil, "id" | "title">
  : V extends "_base"
  ? Pick<Stencil, "id" | "title">
  : never;
