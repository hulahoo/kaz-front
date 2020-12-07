import { StandardEntity } from "./sys$StandardEntity";
import { TalentProgram } from "./tsadv$TalentProgram";
import { DicTalentProgramStep } from "./tsadv$DicTalentProgramStep";
import { NotificationTemplate } from "./base$NotificationTemplate";
export class TalentProgramStep extends StandardEntity {
  static NAME = "tsadv$TalentProgramStep";
  talentProgram?: TalentProgram | null;
  orderNum?: number | null;
  step?: DicTalentProgramStep | null;
  notification?: NotificationTemplate | null;
}
export type TalentProgramStepViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "talentProgramStep-view";
export type TalentProgramStepView<
  V extends TalentProgramStepViewName
> = V extends "_minimal"
  ? Pick<TalentProgramStep, "id" | "step">
  : V extends "_local"
  ? Pick<TalentProgramStep, "id" | "orderNum">
  : V extends "_base"
  ? Pick<TalentProgramStep, "id" | "step" | "orderNum">
  : V extends "talentProgramStep-view"
  ? Pick<
      TalentProgramStep,
      "id" | "orderNum" | "talentProgram" | "step" | "notification"
    >
  : never;
