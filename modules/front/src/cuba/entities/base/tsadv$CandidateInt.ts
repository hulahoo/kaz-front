import { AbstractEntityInt } from "./tsadv$AbstractEntityInt";
export class CandidateInt extends AbstractEntityInt {
  static NAME = "tsadv$CandidateInt";
  requisitionId?: any | null;
  userExtId?: any | null;
}
export type CandidateIntViewName = "_minimal" | "_local" | "_base";
export type CandidateIntView<
  V extends CandidateIntViewName
> = V extends "_minimal"
  ? Pick<CandidateInt, "id">
  : V extends "_base"
  ? Pick<CandidateInt, "id">
  : never;
