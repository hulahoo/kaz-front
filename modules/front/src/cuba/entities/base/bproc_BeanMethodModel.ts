import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { BeanMethodParamModel } from "./bproc_BeanMethodParamModel";
export class BeanMethodModel extends BaseUuidEntity {
  static NAME = "bproc_BeanMethodModel";
  beanName?: string | null;
  methodName?: string | null;
  methodParams?: BeanMethodParamModel | null;
}
export type BeanMethodModelViewName = "_base" | "_local" | "_minimal";
export type BeanMethodModelView<V extends BeanMethodModelViewName> = never;
