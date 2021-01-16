import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class PersonConviction extends AbstractParentEntity {
  static NAME = "tsadv_PersonConviction";
  personGroup?: PersonGroupExt | null;
  haveConviction?: any | null;
  reason?: string | null;
}
export type PersonConvictionViewName = "_base" | "_local" | "_minimal";
export type PersonConvictionView<
  V extends PersonConvictionViewName
> = V extends "_base"
  ? Pick<
      PersonConviction,
      | "id"
      | "haveConviction"
      | "reason"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PersonConviction,
      | "id"
      | "haveConviction"
      | "reason"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
