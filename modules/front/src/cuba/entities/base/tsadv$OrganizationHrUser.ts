import { AbstractParentEntity } from "./AbstractParentEntity";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { DicHrRole } from "./tsadv$DicHrRole";
import { TsadvUserExt } from "./tsadv$UserExt";
export class OrganizationHrUser extends AbstractParentEntity {
  static NAME = "tsadv$OrganizationHrUser";
  organizationGroup?: OrganizationGroupExt | null;
  hrRole?: DicHrRole | null;
  user?: TsadvUserExt | null;
  dateFrom?: any | null;
  dateTo?: any | null;
  requestedTs?: any | null;
  counter?: number | null;
}
export type OrganizationHrUserViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "organizationHrUser.view";
export type OrganizationHrUserView<
  V extends OrganizationHrUserViewName
> = V extends "_base"
  ? Pick<
      OrganizationHrUser,
      | "id"
      | "dateFrom"
      | "dateTo"
      | "requestedTs"
      | "counter"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      OrganizationHrUser,
      | "id"
      | "dateFrom"
      | "dateTo"
      | "requestedTs"
      | "counter"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<OrganizationHrUser, "id">
  : V extends "organizationHrUser.view"
  ? Pick<
      OrganizationHrUser,
      | "id"
      | "dateFrom"
      | "dateTo"
      | "requestedTs"
      | "counter"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "organizationGroup"
      | "user"
      | "hrRole"
    >
  : never;
