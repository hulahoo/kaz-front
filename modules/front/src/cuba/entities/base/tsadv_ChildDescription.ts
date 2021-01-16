import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class ChildDescription extends AbstractParentEntity {
  static NAME = "tsadv_ChildDescription";
  personGroup?: PersonGroupExt | null;
  haveDisabledChild?: any | null;
  haveLittleChild?: any | null;
}
export type ChildDescriptionViewName = "_base" | "_local" | "_minimal";
export type ChildDescriptionView<
  V extends ChildDescriptionViewName
> = V extends "_base"
  ? Pick<
      ChildDescription,
      | "id"
      | "haveDisabledChild"
      | "haveLittleChild"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      ChildDescription,
      | "id"
      | "haveDisabledChild"
      | "haveLittleChild"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
