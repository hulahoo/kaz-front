import { AbstractGroup } from "./AbstractGroup";
import { Contract } from "./tsadv$Contract";
export class ContractGroup extends AbstractGroup {
  static NAME = "tsadv$ContractGroup";
  list?: Contract[] | null;
  contract?: Contract | null;
}
export type ContractGroupViewName = "_minimal" | "_local" | "_base";
export type ContractGroupView<
  V extends ContractGroupViewName
> = V extends "_minimal"
  ? Pick<ContractGroup, "id">
  : V extends "_local"
  ? Pick<
      ContractGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      ContractGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : never;
