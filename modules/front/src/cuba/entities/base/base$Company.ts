import { AbstractParty } from "./AbstractParty";
import { DicOrgLegalFormType } from "./base$DicOrgLegalFormType";
import { DicIndustry } from "./base$DicIndustry";
export class Company extends AbstractParty {
  static NAME = "base$Company";
  companyName?: string | null;
  webAddress?: string | null;
  legalForm?: DicOrgLegalFormType | null;
  industry?: DicIndustry | null;
  companyUpperName?: string | null;
  legalFullName?: string | null;
}
export type CompanyViewName = "_base" | "_local" | "_minimal";
export type CompanyView<V extends CompanyViewName> = V extends "_base"
  ? Pick<
      Company,
      | "id"
      | "companyName"
      | "webAddress"
      | "companyUpperName"
      | "legalFullName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Company,
      | "id"
      | "companyName"
      | "webAddress"
      | "companyUpperName"
      | "legalFullName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<Company, "id" | "companyName">
  : never;
