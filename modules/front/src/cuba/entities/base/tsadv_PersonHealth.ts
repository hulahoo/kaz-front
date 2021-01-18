import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class PersonHealth extends AbstractParentEntity {
  static NAME = "tsadv_PersonHealth";
  healthStatus?: string | null;
  contraindications?: string | null;
  personGroup?: PersonGroupExt | null;
  startDateHistory?: any | null;
  endDateHistory?: any | null;
}
export type PersonHealthViewName = "_base" | "_local" | "_minimal";
export type PersonHealthView<V extends PersonHealthViewName> = V extends "_base"
  ? Pick<
      PersonHealth,
      | "id"
      | "healthStatus"
      | "contraindications"
      | "startDateHistory"
      | "endDateHistory"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PersonHealth,
      | "id"
      | "healthStatus"
      | "contraindications"
      | "startDateHistory"
      | "endDateHistory"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
