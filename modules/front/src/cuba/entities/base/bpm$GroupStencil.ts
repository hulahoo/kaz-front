import { Stencil } from "./bpm$Stencil";
export class GroupStencil extends Stencil {
  static NAME = "bpm$GroupStencil";
}
export type GroupStencilViewName = "_minimal" | "_local" | "_base";
export type GroupStencilView<
  V extends GroupStencilViewName
> = V extends "_minimal"
  ? Pick<GroupStencil, "id" | "title">
  : V extends "_base"
  ? Pick<GroupStencil, "id" | "title">
  : never;
