import { StandardEntity } from "./sys$StandardEntity";
import { DicRelationshipType } from "./tsadv$DicRelationshipType";
import { InsuranceContract } from "./tsadv$InsuranceContract";
export class ContractConditions extends StandardEntity {
  static NAME = "tsadv$ContractConditions";
  relationshipType?: DicRelationshipType | null;
  ageMin?: number | null;
  ageMax?: number | null;
  isFree?: boolean | null;
  costInKzt?: any | null;
  insuranceContract?: InsuranceContract | null;
}
export type ContractConditionsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "contractConditions-browseView"
  | "contractConditions-editView";
export type ContractConditionsView<
  V extends ContractConditionsViewName
> = V extends "_base"
  ? Pick<
      ContractConditions,
      "id" | "ageMin" | "ageMax" | "isFree" | "costInKzt"
    >
  : V extends "_local"
  ? Pick<
      ContractConditions,
      "id" | "ageMin" | "ageMax" | "isFree" | "costInKzt"
    >
  : V extends "_minimal"
  ? Pick<ContractConditions, "id">
  : V extends "contractConditions-browseView"
  ? Pick<
      ContractConditions,
      "id" | "ageMin" | "ageMax" | "isFree" | "costInKzt" | "relationshipType"
    >
  : V extends "contractConditions-editView"
  ? Pick<
      ContractConditions,
      "id" | "ageMin" | "ageMax" | "isFree" | "costInKzt" | "relationshipType"
    >
  : never;
