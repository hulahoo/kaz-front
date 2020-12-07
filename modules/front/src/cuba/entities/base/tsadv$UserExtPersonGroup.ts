import { AbstractParentEntity } from "./AbstractParentEntity";
import { UserExt } from "./base$UserExt";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class UserExtPersonGroup extends AbstractParentEntity {
  static NAME = "tsadv$UserExtPersonGroup";
  userExt?: UserExt | null;
  personGroup?: PersonGroupExt | null;
  fullName?: string | null;
}
export type UserExtPersonGroupViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "userExtPersonGroup.edit"
  | "userExtPersonGroup-for-jobRequest";
export type UserExtPersonGroupView<
  V extends UserExtPersonGroupViewName
> = V extends "_local"
  ? Pick<
      UserExtPersonGroup,
      | "id"
      | "fullName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      UserExtPersonGroup,
      | "id"
      | "fullName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "userExtPersonGroup.edit"
  ? Pick<
      UserExtPersonGroup,
      | "id"
      | "fullName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "userExt"
      | "personGroup"
      | "fullName"
    >
  : V extends "userExtPersonGroup-for-jobRequest"
  ? Pick<
      UserExtPersonGroup,
      | "id"
      | "fullName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "userExt"
      | "personGroup"
    >
  : never;
