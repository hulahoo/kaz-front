import { StandardEntity } from "./sys$StandardEntity";
import { TalentProgram } from "./tsadv$TalentProgram";
import { DicTalentProgramRequestStatus } from "./tsadv$DicTalentProgramRequestStatus";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicTalentProgramStep } from "./tsadv$DicTalentProgramStep";
export class TalentProgramRequest extends StandardEntity {
  static NAME = "tsadv$TalentProgramRequest";
  talentProgram?: TalentProgram | null;
  status?: DicTalentProgramRequestStatus | null;
  personGroup?: PersonGroupExt | null;
  requestDate?: any | null;
  essay?: string | null;
  currentStep?: DicTalentProgramStep | null;
  currentStepStatus?: DicTalentProgramRequestStatus | null;
}
export type TalentProgramRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "all-talentProgramRequest-view"
  | "talentProgramRequest-view";
export type TalentProgramRequestView<
  V extends TalentProgramRequestViewName
> = V extends "_base"
  ? Pick<TalentProgramRequest, "id" | "talentProgram" | "requestDate" | "essay">
  : V extends "_local"
  ? Pick<TalentProgramRequest, "id" | "requestDate" | "essay">
  : V extends "_minimal"
  ? Pick<TalentProgramRequest, "id" | "talentProgram">
  : V extends "all-talentProgramRequest-view"
  ? Pick<
      TalentProgramRequest,
      | "id"
      | "requestDate"
      | "essay"
      | "personGroup"
      | "talentProgram"
      | "status"
      | "currentStep"
      | "currentStepStatus"
    >
  : V extends "talentProgramRequest-view"
  ? Pick<
      TalentProgramRequest,
      | "id"
      | "requestDate"
      | "essay"
      | "talentProgram"
      | "status"
      | "personGroup"
      | "currentStep"
      | "currentStepStatus"
    >
  : never;
