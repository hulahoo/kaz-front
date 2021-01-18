import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class PersonRelativesHaveProperty extends AbstractParentEntity {
  static NAME = "tsadv_PersonRelativesHaveProperty";
  haveOrNot?: any | null;
  property?: string | null;
  personGroup?: PersonGroupExt | null;
}
export type PersonRelativesHavePropertyViewName =
  | "_base"
  | "_local"
  | "_minimal";
export type PersonRelativesHavePropertyView<
  V extends PersonRelativesHavePropertyViewName
> = V extends "_base"
  ? Pick<
      PersonRelativesHaveProperty,
      | "id"
      | "haveOrNot"
      | "property"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PersonRelativesHaveProperty,
      | "id"
      | "haveOrNot"
      | "property"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
