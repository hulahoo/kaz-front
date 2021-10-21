import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicRelationshipType } from "./tsadv$DicRelationshipType";
import { RelationshipTypeBeneficiary } from "./tsadv$RelationshipTypeBeneficiary";
import { DicSocStatus } from "./tsadv_DicSocStatus";
import { DicAddressType } from "./tsadv$DicAddressType";
import { DicCountry } from "./base$DicCountry";
import { DicKato } from "./tsadv_DicKato";
import { DicStreetType } from "./tsadv_DicStreetType";
export class Beneficiary extends AbstractParentEntity {
  static NAME = "tsadv$Beneficiary";
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
  startDateHistory?: any | null;
  endDateHistory?: any | null;
  personGroup?: PersonGroupExt | null;
  relatedPersonGroup?: PersonGroupExt | null;
  relationDegree?: RelationshipTypeBeneficiary | null;
  socStatus?: DicSocStatus | null;
  beneficiaryAddress?: string | null;
  beneficiaryPlaceOfWork?: string | null;
  beneficiaryJob?: string | null;
  addressType?: DicAddressType | null;
  postalCode?: string | null;
  country?: DicCountry | null;
  addressKATOCode?: DicKato | null;
  streetType?: DicStreetType | null;
  streetName?: string | null;
  building?: string | null;
  block?: string | null;
  flat?: string | null;
  addressForExpats?: string | null;
}
export type BeneficiaryViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "beneficiaryView";
export type BeneficiaryView<V extends BeneficiaryViewName> = V extends "_base"
  ? Pick<
      Beneficiary,
      | "id"
      | "personGroupChild"
      | "personGroupParent"
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
      | "startDateHistory"
      | "endDateHistory"
      | "beneficiaryAddress"
      | "beneficiaryPlaceOfWork"
      | "beneficiaryJob"
      | "postalCode"
      | "streetName"
      | "building"
      | "block"
      | "flat"
      | "addressForExpats"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Beneficiary,
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
      | "startDateHistory"
      | "endDateHistory"
      | "beneficiaryAddress"
      | "beneficiaryPlaceOfWork"
      | "beneficiaryJob"
      | "postalCode"
      | "streetName"
      | "building"
      | "block"
      | "flat"
      | "addressForExpats"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<Beneficiary, "id" | "personGroupChild" | "personGroupParent">
  : V extends "beneficiaryView"
  ? Pick<
      Beneficiary,
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
      | "startDateHistory"
      | "endDateHistory"
      | "beneficiaryAddress"
      | "beneficiaryPlaceOfWork"
      | "beneficiaryJob"
      | "postalCode"
      | "streetName"
      | "building"
      | "block"
      | "flat"
      | "addressForExpats"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "streetType"
      | "addressKATOCode"
      | "country"
      | "addressType"
      | "personGroupParent"
      | "personGroupChild"
      | "relationshipType"
      | "socStatus"
    >
  : never;
