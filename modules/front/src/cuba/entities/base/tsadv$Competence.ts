import { AbstractTimeBasedEntity } from "./AbstractTimeBasedEntity";
import { DicCompetenceType } from "./tsadv$DicCompetenceType";
import { Scale } from "./tsadv$Scale";
import { CompetenceGroup } from "./tsadv$CompetenceGroup";
import { FileDescriptor } from "./sys$FileDescriptor";
export class Competence extends AbstractTimeBasedEntity {
  static NAME = "tsadv$Competence";
  competenceName?: string | null;
  competenceNameLang1?: string | null;
  competenceNameLang2?: string | null;
  competenceNameLang3?: string | null;
  competenceNameLang4?: string | null;
  competenceNameLang5?: string | null;
  competeceType?: DicCompetenceType | null;
  scale?: Scale | null;
  group?: CompetenceGroup | null;
  attachment?: FileDescriptor | null;
  isRcAvailable?: boolean | null;
}
export type CompetenceViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "competence-view"
  | "competence.edit";
export type CompetenceView<V extends CompetenceViewName> = V extends "_minimal"
  ? Pick<Competence, "id" | "competenceName">
  : V extends "_local"
  ? Pick<
      Competence,
      | "id"
      | "competenceNameLang1"
      | "competenceNameLang2"
      | "competenceNameLang3"
      | "competenceNameLang4"
      | "competenceNameLang5"
      | "isRcAvailable"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "_base"
  ? Pick<
      Competence,
      | "id"
      | "competenceName"
      | "competenceNameLang1"
      | "competenceNameLang2"
      | "competenceNameLang3"
      | "competenceNameLang4"
      | "competenceNameLang5"
      | "isRcAvailable"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "competence-view"
  ? Pick<
      Competence,
      | "id"
      | "competenceName"
      | "scale"
      | "attachment"
      | "isRcAvailable"
      | "competenceNameLang1"
      | "competenceNameLang2"
      | "competenceNameLang3"
      | "competenceNameLang4"
      | "competenceNameLang5"
      | "competeceType"
    >
  : V extends "competence.edit"
  ? Pick<
      Competence,
      | "id"
      | "competenceNameLang1"
      | "competenceNameLang2"
      | "competenceNameLang3"
      | "competenceNameLang4"
      | "competenceNameLang5"
      | "isRcAvailable"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
      | "scale"
      | "group"
      | "attachment"
      | "competenceName"
      | "competeceType"
    >
  : never;
