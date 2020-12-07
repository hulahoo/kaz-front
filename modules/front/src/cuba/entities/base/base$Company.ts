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
export type CompanyViewName = "_minimal" | "_local" | "_base";
export type CompanyView<V extends CompanyViewName> = V extends "_minimal"
  ? Pick<Company, "id" | "companyName">
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
  : V extends "_base"
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
  : never;
