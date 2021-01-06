import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { DicEducationLevel } from "./tsadv$DicEducationLevel";
export class RequisitionSearchCandidate extends BaseUuidEntity {
  static NAME = "tsadv$RequisitionSearchCandidate";
  reserve?: boolean | null;
  employee?: boolean | null;
  student?: boolean | null;
  externalCandidate?: boolean | null;
  experience?: any | null;
  levelEducation?: DicEducationLevel | null;
  readRelocation?: boolean | null;
  reservedCandidate?: boolean | null;
}
export type RequisitionSearchCandidateViewName =
  | "_base"
  | "_local"
  | "_minimal";
export type RequisitionSearchCandidateView<
  V extends RequisitionSearchCandidateViewName
> = never;
