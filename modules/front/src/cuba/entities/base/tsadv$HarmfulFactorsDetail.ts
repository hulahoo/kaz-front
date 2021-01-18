import { AbstractParentEntity } from "./AbstractParentEntity";
import { HarmfulFactorType } from "./tsadv$HarmfulFactorType";
import { HarmfullFactors } from "./tsadv$HarmfullFactors";
export class HarmfulFactorsDetail extends AbstractParentEntity {
  static NAME = "tsadv$HarmfulFactorsDetail";
  harmfulFactorType?: HarmfulFactorType | null;
  totalSamples?: any | null;
  maxPermisConcentration?: any | null;
  maxSingleConcentration?: any | null;
  harmfullFactors?: HarmfullFactors | null;
}
export type HarmfulFactorsDetailViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "harmfulFactorsDetail-view";
export type HarmfulFactorsDetailView<
  V extends HarmfulFactorsDetailViewName
> = V extends "_base"
  ? Pick<
      HarmfulFactorsDetail,
      | "id"
      | "totalSamples"
      | "maxPermisConcentration"
      | "maxSingleConcentration"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      HarmfulFactorsDetail,
      | "id"
      | "totalSamples"
      | "maxPermisConcentration"
      | "maxSingleConcentration"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "harmfulFactorsDetail-view"
  ? Pick<
      HarmfulFactorsDetail,
      | "id"
      | "harmfulFactorType"
      | "totalSamples"
      | "maxPermisConcentration"
      | "maxSingleConcentration"
    >
  : never;
