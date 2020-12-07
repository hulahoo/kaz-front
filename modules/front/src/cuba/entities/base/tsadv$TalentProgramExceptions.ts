import { StandardEntity } from "./sys$StandardEntity";
import { TalentProgram } from "./tsadv$TalentProgram";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class TalentProgramExceptions extends StandardEntity {
  static NAME = "tsadv$TalentProgramExceptions";
  talentProgram?: TalentProgram | null;
  personGroup?: PersonGroupExt | null;
}
export type TalentProgramExceptionsViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "talentProgramExceptions-view";
export type TalentProgramExceptionsView<
  V extends TalentProgramExceptionsViewName
> = V extends "_minimal"
  ? Pick<TalentProgramExceptions, "id" | "talentProgram">
  : V extends "_base"
  ? Pick<TalentProgramExceptions, "id" | "talentProgram">
  : V extends "talentProgramExceptions-view"
  ? Pick<TalentProgramExceptions, "id" | "talentProgram" | "personGroup">
  : never;
