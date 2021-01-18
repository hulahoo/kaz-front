import { StandardEntity } from "./sys$StandardEntity";
import { AwardProgram } from "./tsadv$AwardProgram";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class SelectedPersonAward extends StandardEntity {
  static NAME = "tsadv$SelectedPersonAward";
  awardProgram?: AwardProgram | null;
  descriptionLangValue1?: string | null;
  descriptionLangValue2?: string | null;
  descriptionLangValue3?: string | null;
  descriptionLangValue4?: string | null;
  descriptionLangValue5?: string | null;
  personGroup?: PersonGroupExt | null;
  awarded?: boolean | null;
}
export type SelectedPersonAwardViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "selectedPersonAward.edit";
export type SelectedPersonAwardView<
  V extends SelectedPersonAwardViewName
> = V extends "_base"
  ? Pick<
      SelectedPersonAward,
      | "id"
      | "descriptionLangValue1"
      | "descriptionLangValue2"
      | "descriptionLangValue3"
      | "descriptionLangValue4"
      | "descriptionLangValue5"
      | "awarded"
    >
  : V extends "_local"
  ? Pick<
      SelectedPersonAward,
      | "id"
      | "descriptionLangValue1"
      | "descriptionLangValue2"
      | "descriptionLangValue3"
      | "descriptionLangValue4"
      | "descriptionLangValue5"
      | "awarded"
    >
  : V extends "selectedPersonAward.edit"
  ? Pick<
      SelectedPersonAward,
      | "id"
      | "descriptionLangValue1"
      | "descriptionLangValue2"
      | "descriptionLangValue3"
      | "descriptionLangValue4"
      | "descriptionLangValue5"
      | "awarded"
      | "awardProgram"
      | "personGroup"
    >
  : never;
