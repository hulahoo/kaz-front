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
export class MilitaryForm extends AbstractParentEntity {
  static NAME = "tsadv$MilitaryForm";
  date_from?: any | null;
  date_to?: any | null;
  military_document_type?: DicMilitaryDocumentType | null;
  udo?: DicUdo | null;
  document_number?: string | null;
  military_type?: DicMilitaryType | null;
  attitude_to_military?: DicAttitudeToMilitary | null;
  troops_structure?: DicTroopsStructure | null;
  military_rank?: DicMilitaryRank | null;
  officer_type?: DicOfficerType | null;
  suitability_to_military?: DicSuitabilityToMilitary | null;
  specialization?: string | null;
  dely?: boolean | null;
  dely_description?: string | null;
  register_group?: DicRegisterGroup | null;
  register_category?: DicRegisterCategory | null;
  date_post?: any | null;
  personGroup?: PersonGroupExt | null;
}
export type MilitaryFormViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "militaryForm-view";
export type MilitaryFormView<
  V extends MilitaryFormViewName
> = V extends "_local"
  ? Pick<
      MilitaryForm,
      | "id"
      | "date_from"
      | "date_to"
      | "document_number"
      | "specialization"
      | "dely"
      | "dely_description"
      | "date_post"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      MilitaryForm,
      | "id"
      | "date_from"
      | "date_to"
      | "document_number"
      | "specialization"
      | "dely"
      | "dely_description"
      | "date_post"
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
      | "document_number"
      | "specialization"
      | "dely"
      | "dely_description"
      | "date_post"
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
