import { AbstractEntityInt } from "./tsadv$AbstractEntityInt";
export class CandidateInt extends AbstractEntityInt {
  static NAME = "tsadv$CandidateInt";
  requisitionId?: any | null;
  userExtId?: any | null;
}
export type CandidateIntViewName = "_base" | "_local" | "_minimal";
export type CandidateIntView<V extends CandidateIntViewName> = V extends "_base"
  ? Pick<CandidateInt, "id">
  : V extends "_minimal"
  ? Pick<CandidateInt, "id">
  : never;
