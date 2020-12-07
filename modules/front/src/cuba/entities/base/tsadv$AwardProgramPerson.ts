import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { PersonExt } from "./base$PersonExt";
import { AwardProgram } from "./tsadv$AwardProgram";
export class AwardProgramPerson extends BaseUuidEntity {
  static NAME = "tsadv$AwardProgramPerson";
  person?: PersonExt | null;
  awardProgram?: AwardProgram | null;
  count?: any | null;
}
export type AwardProgramPersonViewName = "_minimal" | "_local" | "_base";
export type AwardProgramPersonView<
  V extends AwardProgramPersonViewName
> = never;
