import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class PersonException extends AbstractParentEntity {
  static NAME = "tsadv_PersonException";
  personGroup?: PersonGroupExt | null;
  maxBonus?: any | null;
}
export type PersonExceptionViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "personException.edit";
export type PersonExceptionView<
  V extends PersonExceptionViewName
> = V extends "_base"
  ? Pick<
      PersonException,
      | "id"
      | "maxBonus"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PersonException,
      | "id"
      | "maxBonus"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "personException.edit"
  ? Pick<
      PersonException,
      | "id"
      | "maxBonus"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personGroup"
    >
  : never;
