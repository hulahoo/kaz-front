import { AbstractDictionary } from "./AbstractDictionary";
import { TalentProgramStepSkill } from "./tsadv$TalentProgramStepSkill";
export class DicTalentProgramSkill extends AbstractDictionary {
  static NAME = "tsadv$DicTalentProgramSkill";
  talentProgramStepSkill?: TalentProgramStepSkill | null;
}
export type DicTalentProgramSkillViewName = "_base" | "_local" | "_minimal";
export type DicTalentProgramSkillView<
  V extends DicTalentProgramSkillViewName
> = V extends "_base"
  ? Pick<
      DicTalentProgramSkill,
      | "id"
      | "langValue"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "langValue1"
      | "description1"
      | "langValue2"
      | "description2"
      | "langValue3"
      | "description3"
      | "langValue4"
      | "description4"
      | "langValue5"
      | "description5"
      | "startDate"
      | "endDate"
      | "code"
      | "isSystemRecord"
      | "active"
      | "isDefault"
      | "order"
    >
  : V extends "_local"
  ? Pick<
      DicTalentProgramSkill,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "langValue1"
      | "description1"
      | "langValue2"
      | "description2"
      | "langValue3"
      | "description3"
      | "langValue4"
      | "description4"
      | "langValue5"
      | "description5"
      | "startDate"
      | "endDate"
      | "code"
      | "isSystemRecord"
      | "active"
      | "isDefault"
      | "order"
    >
  : V extends "_minimal"
  ? Pick<DicTalentProgramSkill, "id" | "langValue">
  : never;
