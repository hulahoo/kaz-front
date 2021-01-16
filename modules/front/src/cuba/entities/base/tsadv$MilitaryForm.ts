import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicMilitaryDocumentType } from "./tsadv$DicMilitaryDocumentType";
import { DicUdo } from "./tsadv$DicUdo";
import { DicMilitaryType } from "./tsadv$DicMilitaryType";
import { DicAttitudeToMilitary } from "./tsadv$DicAttitudeToMilitary";
import { DicTroopsStructure } from "./tsadv$DicTroopsStructure";
import { DicMilitaryRank } from "./tsadv$DicMilitaryRank";
import { DicOfficerType } from "./tsadv$DicOfficerType";
import { DicSuitabilityToMilitary } from "./tsadv$DicSuitabilityToMilitary";
import { DicRegisterGroup } from "./tsadv$DicRegisterGroup";
import { DicRegisterCategory } from "./tsadv$DicRegisterCategory";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { FileDescriptor } from "./sys$FileDescriptor";
export class MilitaryForm extends AbstractParentEntity {
  static NAME = "tsadv$MilitaryForm";
  date_from?: any | null;
  date_to?: any | null;
  military_document_type?: DicMilitaryDocumentType | null;
  militaryDocumentTypeName?: string | null;
  udo?: DicUdo | null;
  document_number?: string | null;
  military_type?: DicMilitaryType | null;
  militaryTypeName?: string | null;
  attitude_to_military?: DicAttitudeToMilitary | null;
  attitudeToMilitaryName?: string | null;
  troops_structure?: DicTroopsStructure | null;
  compositionMilitaryRegistration?: string | null;
  military_rank?: DicMilitaryRank | null;
  militaryRankName?: string | null;
  officer_type?: DicOfficerType | null;
  officerTypeName?: string | null;
  suitability_to_military?: DicSuitabilityToMilitary | null;
  specialization?: string | null;
  issueDocDate?: any | null;
  issuingAuthority?: string | null;
  dely?: boolean | null;
  dely_description?: string | null;
  register_group?: DicRegisterGroup | null;
  register_category?: DicRegisterCategory | null;
  date_post?: any | null;
  personGroup?: PersonGroupExt | null;
  startDateHistory?: any | null;
  endDateHistory?: any | null;
  attachments?: FileDescriptor[] | null;
}
export type MilitaryFormViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "militaryForm-view";
export type MilitaryFormView<V extends MilitaryFormViewName> = V extends "_base"
  ? Pick<
      MilitaryForm,
      | "id"
      | "date_from"
      | "date_to"
      | "militaryDocumentTypeName"
      | "document_number"
      | "militaryTypeName"
      | "attitudeToMilitaryName"
      | "compositionMilitaryRegistration"
      | "militaryRankName"
      | "officerTypeName"
      | "specialization"
      | "issueDocDate"
      | "issuingAuthority"
      | "dely"
      | "dely_description"
      | "date_post"
      | "startDateHistory"
      | "endDateHistory"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      MilitaryForm,
      | "id"
      | "date_from"
      | "date_to"
      | "militaryDocumentTypeName"
      | "document_number"
      | "militaryTypeName"
      | "attitudeToMilitaryName"
      | "compositionMilitaryRegistration"
      | "militaryRankName"
      | "officerTypeName"
      | "specialization"
      | "issueDocDate"
      | "issuingAuthority"
      | "dely"
      | "dely_description"
      | "date_post"
      | "startDateHistory"
      | "endDateHistory"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "militaryForm-view"
  ? Pick<
      MilitaryForm,
      | "id"
      | "date_from"
      | "date_to"
      | "militaryDocumentTypeName"
      | "document_number"
      | "militaryTypeName"
      | "attitudeToMilitaryName"
      | "compositionMilitaryRegistration"
      | "militaryRankName"
      | "officerTypeName"
      | "specialization"
      | "issueDocDate"
      | "issuingAuthority"
      | "dely"
      | "dely_description"
      | "date_post"
      | "startDateHistory"
      | "endDateHistory"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "military_document_type"
      | "military_type"
      | "attitude_to_military"
      | "troops_structure"
      | "military_rank"
      | "officer_type"
      | "suitability_to_military"
      | "register_group"
      | "register_category"
      | "udo"
    >
  : never;
