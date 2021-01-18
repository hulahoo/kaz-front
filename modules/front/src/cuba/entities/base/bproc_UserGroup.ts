import { StandardEntity } from "./sys$StandardEntity";
import { User } from "./sec$User";
import { Role } from "./sec$Role";
export class UserGroup extends StandardEntity {
  static NAME = "bproc_UserGroup";
  name?: string | null;
  code?: string | null;
  description?: string | null;
  users?: User[] | null;
  roles?: Role[] | null;
  type?: any | null;
}
export type UserGroupViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "userGroup-edit";
export type UserGroupView<V extends UserGroupViewName> = V extends "_base"
  ? Pick<UserGroup, "id" | "name" | "code" | "description" | "type">
  : V extends "_local"
  ? Pick<UserGroup, "id" | "name" | "code" | "description" | "type">
  : V extends "_minimal"
  ? Pick<UserGroup, "id" | "name">
  : V extends "userGroup-edit"
  ? Pick<
      UserGroup,
      "id" | "name" | "code" | "description" | "type" | "users" | "roles"
    >
  : never;
