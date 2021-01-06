import { AbstractDictionary } from "./AbstractDictionary";
import { RequisitionPostingChannel } from "./tsadv$RequisitionPostingChannel";
export class DicPostingChannel extends AbstractDictionary {
  static NAME = "tsadv$DicPostingChannel";
  channalName?: string | null;
  userName?: string | null;
  password?: string | null;
  connectionURL?: string | null;
  requisitionPostingChannel?: RequisitionPostingChannel | null;
}
export type DicPostingChannelViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "dicPostingChannel-view";
export type DicPostingChannelView<
  V extends DicPostingChannelViewName
> = V extends "_base"
  ? Pick<
      DicPostingChannel,
      | "id"
      | "langValue"
      | "channalName"
      | "userName"
      | "password"
      | "connectionURL"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "langValue1"
      | "description1"
      | "langValue2"
      | "description2"
      | "langValue3"
      | "description3"
      | "langValue4"
      | "description4"
      | "langValue5"
      | "description5"
      | "startDate"
      | "endDate"
      | "code"
      | "isSystemRecord"
      | "active"
      | "isDefault"
      | "order"
    >
  : V extends "_local"
  ? Pick<
      DicPostingChannel,
      | "id"
      | "channalName"
      | "userName"
      | "password"
      | "connectionURL"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "langValue1"
      | "description1"
      | "langValue2"
      | "description2"
      | "langValue3"
      | "description3"
      | "langValue4"
      | "description4"
      | "langValue5"
      | "description5"
      | "startDate"
      | "endDate"
      | "code"
      | "isSystemRecord"
      | "active"
      | "isDefault"
      | "order"
    >
  : V extends "_minimal"
  ? Pick<DicPostingChannel, "id" | "langValue">
  : V extends "dicPostingChannel-view"
  ? Pick<
      DicPostingChannel,
      | "id"
      | "channalName"
      | "userName"
      | "password"
      | "connectionURL"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "langValue1"
      | "description1"
      | "langValue2"
      | "description2"
      | "langValue3"
      | "description3"
      | "langValue4"
      | "description4"
      | "langValue5"
      | "description5"
      | "startDate"
      | "endDate"
      | "code"
      | "isSystemRecord"
      | "active"
      | "isDefault"
      | "order"
    >
  : never;
