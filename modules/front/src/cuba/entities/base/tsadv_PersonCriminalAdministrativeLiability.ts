import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicCriminalLiabilityType } from "./tsadv_DicCriminalLiabilityType";
export class PersonCriminalAdministrativeLiability extends AbstractParentEntity {
  static NAME = "tsadv_PersonCriminalAdministrativeLiability";
  personGroup?: PersonGroupExt | null;
  type?: DicCriminalLiabilityType | null;
  startDateHistory?: any | null;
  endDateHistory?: any | null;
  haveLiability?: any | null;
  reasonPeriod?: string | null;
}
export type PersonCriminalAdministrativeLiabilityViewName =
  | "_base"
  | "_local"
  | "_minimal";
export type PersonCriminalAdministrativeLiabilityView<
  V extends PersonCriminalAdministrativeLiabilityViewName
> = V extends "_base"
  ? Pick<
      PersonCriminalAdministrativeLiability,
      | "id"
      | "startDateHistory"
      | "endDateHistory"
      | "haveLiability"
      | "reasonPeriod"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PersonCriminalAdministrativeLiability,
      | "id"
      | "startDateHistory"
      | "endDateHistory"
      | "haveLiability"
      | "reasonPeriod"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
