import { AbstractParentEntity } from "./AbstractParentEntity";
export class DicCompany extends AbstractParentEntity {
  static NAME = "base_DicCompany";
  langValue1?: string | null;
  description1?: string | null;
  langValue2?: string | null;
  description2?: string | null;
  langValue3?: string | null;
  description3?: string | null;
  langValue4?: string | null;
  description4?: string | null;
  langValue5?: string | null;
  description5?: string | null;
  startDate?: any | null;
  endDate?: any | null;
  code?: string | null;
  isSystemRecord?: boolean | null;
  active?: boolean | null;
  isDefault?: boolean | null;
  order?: number | null;
  langValue?: string | null;
  description?: string | null;
}
export type DicCompanyViewName = "_base" | "_local" | "_minimal";
export type DicCompanyView<V extends DicCompanyViewName> = V extends "_base"
  ? Pick<
      DicCompany,
      | "id"
      | "langValue"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
      | "code"
      | "startDate"
      | "endDate"
      | "description1"
      | "description2"
      | "description3"
      | "description4"
      | "description5"
      | "isSystemRecord"
      | "active"
      | "isDefault"
      | "order"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      DicCompany,
      | "id"
      | "langValue1"
      | "description1"
      | "langValue2"
      | "description2"
      | "langValue3"
      | "description3"
      | "langValue4"
      | "description4"
      | "langValue5"
      | "description5"
      | "startDate"
      | "endDate"
      | "code"
      | "isSystemRecord"
      | "active"
      | "isDefault"
      | "order"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<
      DicCompany,
      | "id"
      | "langValue"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
      | "code"
      | "startDate"
      | "endDate"
    >
  : never;
