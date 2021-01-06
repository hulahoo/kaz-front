import { StandardEntity } from "./sys$StandardEntity";
import { DicRelationshipType } from "./tsadv$DicRelationshipType";
export class RelationshipTypeBeneficiary extends StandardEntity {
  static NAME = "tsadv$RelationshipTypeBeneficiary";
  parent?: DicRelationshipType | null;
  child?: DicRelationshipType | null;
}
export type RelationshipTypeBeneficiaryViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "relationshipTypeBeneficiaryView";
export type RelationshipTypeBeneficiaryView<
  V extends RelationshipTypeBeneficiaryViewName
> = V extends "_base"
  ? Pick<RelationshipTypeBeneficiary, "id" | "parent" | "child">
  : V extends "_minimal"
  ? Pick<RelationshipTypeBeneficiary, "id" | "parent" | "child">
  : V extends "relationshipTypeBeneficiaryView"
  ? Pick<RelationshipTypeBeneficiary, "id" | "parent" | "child">
  : never;
