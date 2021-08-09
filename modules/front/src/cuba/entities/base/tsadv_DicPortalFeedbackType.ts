import { AbstractDictionary } from "./AbstractDictionary";
export class DicPortalFeedbackType extends AbstractDictionary {
  static NAME = "tsadv_DicPortalFeedbackType";
  systemNotificationText1?: string | null;
  systemNotificationText2?: string | null;
  systemNotificationText3?: string | null;
  systemNotificationText?: string | null;
}
export type DicPortalFeedbackTypeViewName = "_base" | "_local" | "_minimal";
export type DicPortalFeedbackTypeView<
  V extends DicPortalFeedbackTypeViewName
> = V extends "_base"
  ? Pick<
      DicPortalFeedbackType,
      | "id"
      | "langValue"
      | "code"
      | "systemNotificationText1"
      | "systemNotificationText2"
      | "systemNotificationText3"
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
      | "isSystemRecord"
      | "active"
      | "isDefault"
      | "order"
    >
  : V extends "_local"
  ? Pick<
      DicPortalFeedbackType,
      | "id"
      | "systemNotificationText1"
      | "systemNotificationText2"
      | "systemNotificationText3"
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
  ? Pick<DicPortalFeedbackType, "id" | "langValue" | "code">
  : never;
