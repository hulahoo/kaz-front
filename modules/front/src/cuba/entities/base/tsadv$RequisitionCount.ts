import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class RequisitionCount extends BaseUuidEntity {
  static NAME = "tsadv$RequisitionCount";
  personGroup?: PersonGroupExt | null;
  countRequisition?: any | null;
  countJobRequest?: any | null;
}
export type RequisitionCountViewName = "_minimal" | "_local" | "_base";
export type RequisitionCountView<V extends RequisitionCountViewName> = never;
