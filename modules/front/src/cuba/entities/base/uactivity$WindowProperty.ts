import {AbstractParentEntity} from "./AbstractParentEntity";

export class WindowProperty extends AbstractParentEntity {
  static NAME = "uactivity$WindowProperty";
  screenName?: string | null;
  viewName?: string | null;
  entityName?: string | null;
}

export type WindowPropertyViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "windowProperty.edit";
export type WindowPropertyView<V extends WindowPropertyViewName> = V extends "_base"
  ? Pick<WindowProperty,
    | "id"
    | "screenName"
    | "viewName"
    | "entityName"
    | "legacyId"
    | "organizationBin"
    | "integrationUserLogin">
  : V extends "_local"
    ? Pick<WindowProperty,
      | "id"
      | "screenName"
      | "viewName"
      | "entityName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin">
    : V extends "windowProperty.edit"
      ? Pick<WindowProperty,
        | "id"
        | "screenName"
        | "viewName"
        | "entityName"
        | "legacyId"
        | "organizationBin"
        | "integrationUserLogin">
      : never;
