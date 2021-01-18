import { StandardEntity } from "./sys$StandardEntity";
import { TalentProgramStep } from "./tsadv$TalentProgramStep";
import { DicTalentProgramSkill } from "./tsadv$DicTalentProgramSkill";
export class TalentProgramStepSkill extends StandardEntity {
  static NAME = "tsadv$TalentProgramStepSkill";
  orderNumber?: number | null;
  talentProgramStep?: TalentProgramStep | null;
  skill?: DicTalentProgramSkill | null;
}
export type TalentProgramStepSkillViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "talentProgramStepSkill-view";
export type TalentProgramStepSkillView<
  V extends TalentProgramStepSkillViewName
> = V extends "_base"
  ? Pick<TalentProgramStepSkill, "id" | "talentProgramStep" | "orderNumber">
  : V extends "_local"
  ? Pick<TalentProgramStepSkill, "id" | "orderNumber">
  : V extends "_minimal"
  ? Pick<TalentProgramStepSkill, "id" | "talentProgramStep">
  : V extends "talentProgramStepSkill-view"
  ? Pick<
      TalentProgramStepSkill,
      "id" | "orderNumber" | "talentProgramStep" | "skill"
    >
  : never;
