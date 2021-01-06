import { StandardEntity } from "./sys$StandardEntity";
import { PersonAward } from "./tsadv$PersonAward";
export class AwardProgram extends StandardEntity {
  static NAME = "tsadv$AwardProgram";
  name?: string | null;
  year?: number | null;
  personAwards?: PersonAward[] | null;
  active?: boolean | null;
  order?: number | null;
}
export type AwardProgramViewName = "_base" | "_local" | "_minimal";
export type AwardProgramView<V extends AwardProgramViewName> = V extends "_base"
  ? Pick<AwardProgram, "id" | "name" | "year" | "active" | "order">
  : V extends "_local"
  ? Pick<AwardProgram, "id" | "name" | "year" | "active" | "order">
  : V extends "_minimal"
  ? Pick<AwardProgram, "id" | "name">
  : never;
