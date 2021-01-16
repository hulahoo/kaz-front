import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicRelationshipType } from "./tsadv$DicRelationshipType";
import { DicRequestStatus } from "./tsadv$DicRequestStatus";
import { Beneficiary } from "./tsadv$Beneficiary";
import { RelationshipTypeBeneficiary } from "./tsadv$RelationshipTypeBeneficiary";
export class BeneficiaryRequest extends AbstractParentEntity {
  static NAME = "tsadv_BeneficiaryRequest";
  personGroupParent?: PersonGroupExt | null;
  personGroupChild?: PersonGroupExt | null;
  dateFrom?: any | null;
  dateTo?: any | null;
  getAlimony?: boolean | null;
  relationshipType?: DicRelationshipType | null;
  lastName?: string | null;
  firstName?: string | null;
  middleName?: string | null;
  birthDate?: any | null;
  workLocation?: string | null;
  homeAddress?: string | null;
  additionalContact?: string | null;
  personGroup?: PersonGroupExt | null;
  requestStatus?: DicRequestStatus | null;
  beneficiary?: Beneficiary | null;
  relatedPersonGroup?: PersonGroupExt | null;
  relationDegree?: RelationshipTypeBeneficiary | null;
}
export type BeneficiaryRequestViewName = "_base" | "_local" | "_minimal";
export type BeneficiaryRequestView<
  V extends BeneficiaryRequestViewName
> = V extends "_base"
  ? Pick<
      BeneficiaryRequest,
      | "id"
      | "dateFrom"
      | "dateTo"
      | "getAlimony"
      | "lastName"
      | "firstName"
      | "middleName"
      | "birthDate"
      | "workLocation"
      | "homeAddress"
      | "additionalContact"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      BeneficiaryRequest,
      | "id"
      | "dateFrom"
      | "dateTo"
      | "getAlimony"
      | "lastName"
      | "firstName"
      | "middleName"
      | "birthDate"
      | "workLocation"
      | "homeAddress"
      | "additionalContact"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
