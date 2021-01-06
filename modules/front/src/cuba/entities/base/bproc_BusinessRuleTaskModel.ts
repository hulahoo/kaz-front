import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { ExecutionListenerModel } from "./bproc_ExecutionListenerModel";
import { FieldModel } from "./bproc_FieldModel";
export class BusinessRuleTaskModel extends BaseUuidEntity {
  static NAME = "bproc_BusinessRuleTaskModel";
  businessId?: string | null;
  name?: string | null;
  async?: boolean | null;
  documentation?: string | null;
  executionListeners?: ExecutionListenerModel | null;
  fields?: FieldModel | null;
}
export type BusinessRuleTaskModelViewName = "_base" | "_local" | "_minimal";
export type BusinessRuleTaskModelView<
  V extends BusinessRuleTaskModelViewName
> = V extends "_base"
  ? Pick<BusinessRuleTaskModel, "id" | "name" | "businessId">
  : V extends "_minimal"
  ? Pick<BusinessRuleTaskModel, "id" | "name" | "businessId">
  : never;
