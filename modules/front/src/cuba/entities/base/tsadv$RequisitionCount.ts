import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class RequisitionCount extends BaseUuidEntity {
  static NAME = "tsadv$RequisitionCount";
  personGroup?: PersonGroupExt | null;
  countRequisition?: any | null;
  countJobRequest?: any | null;
}
export type RequisitionCountViewName = "_base" | "_local" | "_minimal";
export type RequisitionCountView<V extends RequisitionCountViewName> = never;
