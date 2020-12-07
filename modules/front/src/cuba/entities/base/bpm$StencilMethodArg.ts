import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { ServiceTaskStencil } from "./bpm$ServiceTaskStencil";
export class StencilMethodArg extends BaseUuidEntity {
  static NAME = "bpm$StencilMethodArg";
  propertyPackageTitle?: string | null;
  type?: string | null;
  defaultValue?: string | null;
  stencil?: ServiceTaskStencil | null;
  simpleTypeName?: string | null;
}
export type StencilMethodArgViewName = "_minimal" | "_local" | "_base";
export type StencilMethodArgView<V extends StencilMethodArgViewName> = never;
