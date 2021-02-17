import {AbstractParentEntity} from "./AbstractParentEntity";

export class WindowProperty extends AbstractParentEntity {
  static NAME = "uactivity$WindowProperty";
  screenName?: string | null;
  viewName?: string | null;
  entityName?: string | null;

  static link(windowProperty: WindowProperty) {
    let entityName = windowProperty.entityName!;
    entityName = entityName.substring(Math.max(entityName!.indexOf("$"), entityName!.indexOf("_")) + 1);
    return entityName.charAt(0).toLocaleLowerCase() + entityName.substring(1);
  }
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
