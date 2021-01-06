import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class BeanMethodParamModel extends BaseUuidEntity {
  static NAME = "bproc_BeanMethodParamModel";
  name?: string | null;
  type?: string | null;
  isVariable?: boolean | null;
  value?: string | null;
}
export type BeanMethodParamModelViewName = "_base" | "_local" | "_minimal";
export type BeanMethodParamModelView<
  V extends BeanMethodParamModelViewName
> = never;
