import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicGuardianType } from "./tsadv_DicGuardianType";
import { DicFieldOfActivity } from "./tsadv_DicFieldOfActivity";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class Guardian extends AbstractParentEntity {
  static NAME = "tsadv_Guardian";
  guardianType?: DicGuardianType | null;
  fieldOfActivity?: DicFieldOfActivity | null;
  personGroup?: PersonGroupExt | null;
}
export type GuardianViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "guardian.edit";
export type GuardianView<V extends GuardianViewName> = V extends "_base"
  ? Pick<
      Guardian,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Guardian,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "guardian.edit"
  ? Pick<
      Guardian,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "guardianType"
      | "fieldOfActivity"
      | "personGroup"
    >
  : never;
