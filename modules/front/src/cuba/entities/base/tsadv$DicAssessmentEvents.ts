import { AbstractDictionary } from "./AbstractDictionary";
export class DicAssessmentEvents extends AbstractDictionary {
  static NAME = "tsadv$DicAssessmentEvents";
}
export type DicAssessmentEventsViewName = "_minimal" | "_local" | "_base";
export type DicAssessmentEventsView<
  V extends DicAssessmentEventsViewName
> = V extends "_minimal"
  ? Pick<DicAssessmentEvents, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      DicAssessmentEvents,
      | "id"
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
  : V extends "_base"
  ? Pick<
      DicAssessmentEvents,
      | "id"
      | "langValue"
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
