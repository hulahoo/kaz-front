import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
export class PersonalProtectionInspector extends AbstractParentEntity {
  static NAME = "tsadv$PersonalProtectionInspector";
  employee?: PersonGroupExt | null;
  organizationGroup?: OrganizationGroupExt | null;
  assignmentDate?: any | null;
  assignmentOrder?: string | null;
  employeeFullName?: string | null;
}
export type PersonalProtectionInspectorViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "personalProtectionInspector.edit";
export type PersonalProtectionInspectorView<
  V extends PersonalProtectionInspectorViewName
> = V extends "_local"
  ? Pick<
      PersonalProtectionInspector,
      | "id"
      | "assignmentDate"
      | "assignmentOrder"
      | "employeeFullName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      PersonalProtectionInspector,
      | "id"
      | "assignmentDate"
      | "assignmentOrder"
      | "employeeFullName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "personalProtectionInspector.edit"
  ? Pick<
      PersonalProtectionInspector,
      | "id"
      | "assignmentDate"
      | "assignmentOrder"
      | "employeeFullName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "employee"
      | "organizationGroup"
    >
  : never;
