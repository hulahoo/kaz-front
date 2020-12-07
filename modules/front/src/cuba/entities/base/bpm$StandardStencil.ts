import { Stencil } from "./bpm$Stencil";
export class StandardStencil extends Stencil {
  static NAME = "bpm$StandardStencil";
}
export type StandardStencilViewName = "_minimal" | "_local" | "_base";
export type StandardStencilView<
  V extends StandardStencilViewName
> = V extends "_minimal"
  ? Pick<StandardStencil, "id" | "title">
  : V extends "_base"
  ? Pick<StandardStencil, "id" | "title">
  : never;
