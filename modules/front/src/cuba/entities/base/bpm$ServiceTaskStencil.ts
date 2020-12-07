import { Stencil } from "./bpm$Stencil";
import { FileDescriptor } from "./sys$FileDescriptor";
import { StencilMethodArg } from "./bpm$StencilMethodArg";
export class ServiceTaskStencil extends Stencil {
  static NAME = "bpm$ServiceTaskStencil";
  beanName?: string | null;
  methodName?: string | null;
  iconFileId?: any | null;
  iconFile?: FileDescriptor | null;
  methodArgs?: StencilMethodArg[] | null;
}
export type ServiceTaskStencilViewName = "_minimal" | "_local" | "_base";
export type ServiceTaskStencilView<
  V extends ServiceTaskStencilViewName
> = V extends "_minimal"
  ? Pick<ServiceTaskStencil, "id" | "title">
  : V extends "_base"
  ? Pick<ServiceTaskStencil, "id" | "title">
  : never;
