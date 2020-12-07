import { AbstractTimeBasedEntity } from "./AbstractTimeBasedEntity";
import { DicLocation } from "./base$DicLocation";
export class Assignment extends AbstractTimeBasedEntity {
  static NAME = "base$Assignment";
  location?: DicLocation | null;
  assignDate?: any | null;
}
export type AssignmentViewName = "_minimal" | "_local" | "_base";
export type AssignmentView<V extends AssignmentViewName> = V extends "_minimal"
  ? Pick<Assignment, "id">
  : V extends "_local"
  ? Pick<
      Assignment,
      | "id"
      | "assignDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "_base"
  ? Pick<
      Assignment,
      | "id"
      | "assignDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : never;
