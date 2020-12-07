import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { PersonExt } from "./base$PersonExt";
export class RequisitionSearchCandidateResult extends BaseUuidEntity {
  static NAME = "tsadv$RequisitionSearchCandidateResult";
  person?: PersonExt | null;
  match?: any | null;
  clickCount?: any | null;
  personTypeOrder?: number | null;
  positionName?: string | null;
  organizationName?: string | null;
  isReserved?: boolean | null;
}
export type RequisitionSearchCandidateResultViewName =
  | "_minimal"
  | "_local"
  | "_base";
export type RequisitionSearchCandidateResultView<
  V extends RequisitionSearchCandidateResultViewName
> = never;
