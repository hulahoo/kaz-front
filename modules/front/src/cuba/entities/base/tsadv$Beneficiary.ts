import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicRelationshipType } from "./tsadv$DicRelationshipType";
export class Beneficiary extends AbstractParentEntity {
  static NAME = "tsadv$Beneficiary";
  personGroupParent?: PersonGroupExt | null;
  personGroupChild?: PersonGroupExt | null;
  dateFrom?: any | null;
  dateTo?: any | null;
  getAlimony?: boolean | null;
  relationshipType?: DicRelationshipType | null;
}
export type BeneficiaryViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "beneficiaryView";
export type BeneficiaryView<
  V extends BeneficiaryViewName
> = V extends "_minimal"
  ? Pick<Beneficiary, "id" | "personGroupChild" | "personGroupParent">
  : V extends "_local"
  ? Pick<
      Beneficiary,
      | "id"
      | "dateFrom"
      | "dateTo"
      | "getAlimony"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      Beneficiary,
      | "id"
      | "personGroupChild"
      | "personGroupParent"
      | "dateFrom"
      | "dateTo"
      | "getAlimony"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "beneficiaryView"
  ? Pick<
      Beneficiary,
      | "id"
      | "dateFrom"
      | "dateTo"
      | "getAlimony"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personGroupParent"
      | "personGroupChild"
      | "relationshipType"
    >
  : never;
