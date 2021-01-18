import { AbstractParentEntity } from "./AbstractParentEntity";
import { MessageTemplate } from "./base$MessageTemplate";
export class Dispatch extends AbstractParentEntity {
  static NAME = "base$Dispatch";
  name?: string | null;
  code?: string | null;
  description?: string | null;
  type?: any | null;
  entity?: string | null;
  messageTemplate?: MessageTemplate | null;
  dataJpql?: string | null;
  dataSql?: string | null;
  entityCaption?: string | null;
}
export type DispatchViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "dispatch.browse"
  | "dispatch.edit"
  | "dispatch.send";
export type DispatchView<V extends DispatchViewName> = V extends "_base"
  ? Pick<
      Dispatch,
      | "id"
      | "name"
      | "code"
      | "description"
      | "type"
      | "entity"
      | "dataJpql"
      | "dataSql"
      | "entityCaption"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Dispatch,
      | "id"
      | "name"
      | "code"
      | "description"
      | "type"
      | "entity"
      | "dataJpql"
      | "dataSql"
      | "entityCaption"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<Dispatch, "id" | "name">
  : V extends "dispatch.browse"
  ? Pick<
      Dispatch,
      | "id"
      | "name"
      | "messageTemplate"
      | "code"
      | "description"
      | "type"
      | "entity"
    >
  : V extends "dispatch.edit"
  ? Pick<
      Dispatch,
      | "id"
      | "name"
      | "code"
      | "description"
      | "type"
      | "entity"
      | "dataJpql"
      | "dataSql"
      | "entityCaption"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "messageTemplate"
    >
  : V extends "dispatch.send"
  ? Pick<
      Dispatch,
      | "id"
      | "name"
      | "code"
      | "description"
      | "type"
      | "entity"
      | "dataJpql"
      | "dataSql"
      | "entityCaption"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "messageTemplate"
    >
  : never;
