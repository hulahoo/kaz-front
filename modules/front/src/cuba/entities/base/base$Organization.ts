import { AbstractTimeBasedEntity } from "./AbstractTimeBasedEntity";
import { DicLocation } from "./base$DicLocation";
import { DicOrgType } from "./base$DicOrgType";
export class Organization extends AbstractTimeBasedEntity {
  static NAME = "base$Organization";
  organizationName?: string | null;
  organizationNameLang1?: string | null;
  organizationNameLang2?: string | null;
  organizationNameLang3?: string | null;
  organizationNameLang4?: string | null;
  organizationNameLang5?: string | null;
  location?: DicLocation | null;
  type?: DicOrgType | null;
}
export type OrganizationViewName = "_base" | "_local" | "_minimal";
export type OrganizationView<V extends OrganizationViewName> = V extends "_base"
  ? Pick<
      Organization,
      | "id"
      | "organizationName"
      | "organizationNameLang1"
      | "organizationNameLang2"
      | "organizationNameLang3"
      | "organizationNameLang4"
      | "organizationNameLang5"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "_local"
  ? Pick<
      Organization,
      | "id"
      | "organizationNameLang1"
      | "organizationNameLang2"
      | "organizationNameLang3"
      | "organizationNameLang4"
      | "organizationNameLang5"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "_minimal"
  ? Pick<Organization, "id" | "organizationName">
  : never;
