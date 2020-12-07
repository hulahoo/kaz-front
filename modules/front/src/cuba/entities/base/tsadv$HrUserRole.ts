import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicHrRole } from "./tsadv$DicHrRole";
import { UserExt } from "./base$UserExt";
export class HrUserRole extends AbstractParentEntity {
  static NAME = "tsadv$HrUserRole";
  role?: DicHrRole | null;
  user?: UserExt | null;
  dateFrom?: any | null;
  dateTo?: any | null;
}
export type HrUserRoleViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "hrUserRole.view";
export type HrUserRoleView<V extends HrUserRoleViewName> = V extends "_minimal"
  ? Pick<HrUserRole, "id">
  : V extends "_local"
  ? Pick<
      HrUserRole,
      | "id"
      | "dateFrom"
      | "dateTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      HrUserRole,
      | "id"
      | "dateFrom"
      | "dateTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "hrUserRole.view"
  ? Pick<
      HrUserRole,
      | "id"
      | "dateFrom"
      | "dateTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "role"
      | "user"
    >
  : never;
