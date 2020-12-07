import { StandardEntity } from "./sys$StandardEntity";
import { FileDescriptor } from "./sys$FileDescriptor";
export class TalentProgram extends StandardEntity {
  static NAME = "tsadv$TalentProgram";
  programNameLang1?: string | null;
  essayRequirementLang1?: string | null;
  essayRequirementLang2?: string | null;
  essayRequirementLang3?: string | null;
  essayRequirementLang?: string | null;
  programNameLang?: string | null;
  bannerLang?: FileDescriptor | null;
  participationRuleLang?: string | null;
  programNameLang2?: string | null;
  programNameLang3?: string | null;
  isActive?: boolean | null;
  startDate?: any | null;
  endDate?: any | null;
  participationRuleLang1?: string | null;
  participationRuleLang2?: string | null;
  participationRuleLang3?: string | null;
  bannerLang1?: FileDescriptor | null;
  bannerLang2?: FileDescriptor | null;
  bannerLang3?: FileDescriptor | null;
  webLink?: string | null;
  questionOfEssayRu?: string | null;
  questionOfEssayKz?: string | null;
  questionOfEssayEn?: string | null;
  questionOfEssay?: string | null;
}
export type TalentProgramViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "talentProgram-view"
  | "talentProgram-view_1";
export type TalentProgramView<
  V extends TalentProgramViewName
> = V extends "_minimal"
  ? Pick<TalentProgram, "id" | "programNameLang">
  : V extends "_local"
  ? Pick<
      TalentProgram,
      | "id"
      | "programNameLang1"
      | "essayRequirementLang1"
      | "essayRequirementLang2"
      | "essayRequirementLang3"
      | "programNameLang2"
      | "programNameLang3"
      | "isActive"
      | "startDate"
      | "endDate"
      | "participationRuleLang1"
      | "participationRuleLang2"
      | "participationRuleLang3"
      | "webLink"
      | "questionOfEssayRu"
      | "questionOfEssayKz"
      | "questionOfEssayEn"
      | "questionOfEssay"
    >
  : V extends "_base"
  ? Pick<
      TalentProgram,
      | "id"
      | "programNameLang"
      | "programNameLang1"
      | "essayRequirementLang1"
      | "essayRequirementLang2"
      | "essayRequirementLang3"
      | "programNameLang2"
      | "programNameLang3"
      | "isActive"
      | "startDate"
      | "endDate"
      | "participationRuleLang1"
      | "participationRuleLang2"
      | "participationRuleLang3"
      | "webLink"
      | "questionOfEssayRu"
      | "questionOfEssayKz"
      | "questionOfEssayEn"
      | "questionOfEssay"
    >
  : V extends "talentProgram-view"
  ? Pick<
      TalentProgram,
      | "id"
      | "programNameLang1"
      | "essayRequirementLang1"
      | "essayRequirementLang2"
      | "essayRequirementLang3"
      | "programNameLang2"
      | "programNameLang3"
      | "isActive"
      | "startDate"
      | "endDate"
      | "participationRuleLang1"
      | "participationRuleLang2"
      | "participationRuleLang3"
      | "webLink"
      | "questionOfEssayRu"
      | "questionOfEssayKz"
      | "questionOfEssayEn"
      | "questionOfEssay"
      | "programNameLang"
      | "bannerLang"
      | "participationRuleLang"
      | "bannerLang1"
      | "bannerLang2"
      | "bannerLang3"
    >
  : V extends "talentProgram-view_1"
  ? Pick<
      TalentProgram,
      | "id"
      | "programNameLang1"
      | "essayRequirementLang1"
      | "essayRequirementLang2"
      | "essayRequirementLang3"
      | "programNameLang2"
      | "programNameLang3"
      | "isActive"
      | "startDate"
      | "endDate"
      | "participationRuleLang1"
      | "participationRuleLang2"
      | "participationRuleLang3"
      | "webLink"
      | "questionOfEssayRu"
      | "questionOfEssayKz"
      | "questionOfEssayEn"
      | "questionOfEssay"
      | "essayRequirementLang"
      | "programNameLang"
      | "bannerLang"
      | "participationRuleLang"
      | "bannerLang1"
      | "bannerLang2"
      | "bannerLang3"
    >
  : never;
