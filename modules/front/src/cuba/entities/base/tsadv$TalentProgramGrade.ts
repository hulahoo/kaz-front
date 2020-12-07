import { StandardEntity } from "./sys$StandardEntity";
import { TalentProgram } from "./tsadv$TalentProgram";
import { GradeGroup } from "./tsadv$GradeGroup";
export class TalentProgramGrade extends StandardEntity {
  static NAME = "tsadv$TalentProgramGrade";
  talentProgram?: TalentProgram | null;
  gradeGroup?: GradeGroup | null;
}
export type TalentProgramGradeViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "talentProgramGrade-view";
export type TalentProgramGradeView<
  V extends TalentProgramGradeViewName
> = V extends "_minimal"
  ? Pick<TalentProgramGrade, "id" | "talentProgram">
  : V extends "_base"
  ? Pick<TalentProgramGrade, "id" | "talentProgram">
  : V extends "talentProgramGrade-view"
  ? Pick<TalentProgramGrade, "id" | "talentProgram" | "gradeGroup">
  : never;
