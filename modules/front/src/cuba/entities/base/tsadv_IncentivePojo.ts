import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class IncentivePojo extends BaseUuidEntity {
  static NAME = "tsadv_IncentivePojo";
  organizationGroupId?: any | null;
  date?: any | null;
  organizationNameLang1?: string | null;
  organizationNameLang2?: string | null;
  organizationNameLang3?: string | null;
  result?: any | null;
  organizationName?: string | null;
}
export type IncentivePojoViewName = "_base" | "_local" | "_minimal";
export type IncentivePojoView<
  V extends IncentivePojoViewName
> = V extends "_base"
  ? Pick<IncentivePojo, "id" | "organizationName">
  : V extends "_minimal"
  ? Pick<IncentivePojo, "id" | "organizationName">
  : never;
