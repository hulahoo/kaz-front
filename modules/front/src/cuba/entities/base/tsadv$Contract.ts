import { AbstractParentEntity } from "./AbstractParentEntity";
import { ContractGroup } from "./tsadv$ContractGroup";
export class Contract extends AbstractParentEntity {
  static NAME = "tsadv$Contract";
  group?: ContractGroup | null;
}
export type ContractViewName = "_minimal" | "_local" | "_base";
export type ContractView<V extends ContractViewName> = V extends "_minimal"
  ? Pick<Contract, "id">
  : V extends "_local"
  ? Pick<
      Contract,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      Contract,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : never;
