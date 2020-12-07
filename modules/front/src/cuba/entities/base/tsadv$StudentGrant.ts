import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicLearningForm } from "./tsadv$DicLearningForm";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class StudentGrant extends AbstractParentEntity {
  static NAME = "tsadv$StudentGrant";
  numberContract?: string | null;
  dateContract?: any | null;
  learningCenter?: string | null;
  specialization?: string | null;
  learningForm?: DicLearningForm | null;
  learnEndDate?: any | null;
  reason?: string | null;
  orderRequisition?: string | null;
  personGroup?: PersonGroupExt | null;
}
export type StudentGrantViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "studentGrant.browse";
export type StudentGrantView<
  V extends StudentGrantViewName
> = V extends "_local"
  ? Pick<
      StudentGrant,
      | "id"
      | "numberContract"
      | "dateContract"
      | "learningCenter"
      | "specialization"
      | "learnEndDate"
      | "reason"
      | "orderRequisition"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      StudentGrant,
      | "id"
      | "numberContract"
      | "dateContract"
      | "learningCenter"
      | "specialization"
      | "learnEndDate"
      | "reason"
      | "orderRequisition"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "studentGrant.browse"
  ? Pick<
      StudentGrant,
      | "id"
      | "numberContract"
      | "dateContract"
      | "learningCenter"
      | "specialization"
      | "learnEndDate"
      | "reason"
      | "orderRequisition"
      | "personGroup"
      | "learningForm"
    >
  : never;
