import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicPhoneType } from "./tsadv$DicPhoneType";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class PersonContact extends AbstractParentEntity {
  static NAME = "tsadv$PersonContact";
  contactValue?: string | null;
  endDate?: any | null;
  startDate?: any | null;
  type?: DicPhoneType | null;
  personGroup?: PersonGroupExt | null;
}
export type PersonContactViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "personContact.card"
  | "personContact.edit"
  | "personContact.full";
export type PersonContactView<
  V extends PersonContactViewName
> = V extends "_base"
  ? Pick<
      PersonContact,
      | "id"
      | "contactValue"
      | "endDate"
      | "startDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PersonContact,
      | "id"
      | "contactValue"
      | "endDate"
      | "startDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "personContact.card"
  ? Pick<
      PersonContact,
      "id" | "contactValue" | "endDate" | "startDate" | "type" | "personGroup"
    >
  : V extends "personContact.edit"
  ? Pick<
      PersonContact,
      | "id"
      | "contactValue"
      | "endDate"
      | "startDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "type"
      | "personGroup"
    >
  : V extends "personContact.full"
  ? Pick<
      PersonContact,
      | "id"
      | "contactValue"
      | "endDate"
      | "startDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "type"
      | "personGroup"
    >
  : never;
