import { AbstractGroup } from "./AbstractGroup";
import { Contract } from "./tsadv$Contract";
export class ContractGroup extends AbstractGroup {
  static NAME = "tsadv$ContractGroup";
  list?: Contract[] | null;
  contract?: Contract | null;
}
export type ContractGroupViewName = "_base" | "_local" | "_minimal";
export type ContractGroupView<
  V extends ContractGroupViewName
> = V extends "_base"
  ? Pick<
      ContractGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      ContractGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<ContractGroup, "id">
  : never;
