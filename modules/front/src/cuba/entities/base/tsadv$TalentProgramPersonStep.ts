import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicTalentProgramStep } from "./tsadv$DicTalentProgramStep";
import { TalentProgramRequest } from "./tsadv$TalentProgramRequest";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicTalentProgramRequestStatus } from "./tsadv$DicTalentProgramRequestStatus";
import { FileDescriptor } from "./sys$FileDescriptor";
export class TalentProgramPersonStep extends AbstractParentEntity {
  static NAME = "tsadv$TalentProgramPersonStep";
  dicTalentProgramStep?: DicTalentProgramStep | null;
  talentProgramRequest?: TalentProgramRequest | null;
  personGroup?: PersonGroupExt | null;
  addressRu?: string | null;
  addressEn?: string | null;
  dateFrom?: any | null;
  dateTo?: any | null;
  status?: DicTalentProgramRequestStatus | null;
  comment?: string | null;
  result?: string | null;
  file?: FileDescriptor | null;
}
export type TalentProgramPersonStepViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "talentProgramPersonStep-view";
export type TalentProgramPersonStepView<
  V extends TalentProgramPersonStepViewName
> = V extends "_local"
  ? Pick<
      TalentProgramPersonStep,
      | "id"
      | "addressRu"
      | "addressEn"
      | "dateFrom"
      | "dateTo"
      | "comment"
      | "result"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      TalentProgramPersonStep,
      | "id"
      | "addressRu"
      | "addressEn"
      | "dateFrom"
      | "dateTo"
      | "comment"
      | "result"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "talentProgramPersonStep-view"
  ? Pick<
      TalentProgramPersonStep,
      | "id"
      | "addressRu"
      | "addressEn"
      | "dateFrom"
      | "dateTo"
      | "comment"
      | "result"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "dicTalentProgramStep"
      | "personGroup"
      | "status"
      | "file"
      | "talentProgramRequest"
    >
  : never;
