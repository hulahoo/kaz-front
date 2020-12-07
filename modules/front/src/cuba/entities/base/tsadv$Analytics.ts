import { AbstractParentEntity } from "./AbstractParentEntity";
export class Analytics extends AbstractParentEntity {
  static NAME = "tsadv$Analytics";
  analyticsType?: string | null;
  dataType?: any | null;
  active?: boolean | null;
  organization?: boolean | null;
  job?: boolean | null;
  grade?: boolean | null;
  position?: boolean | null;
  jobCategory?: boolean | null;
  personCategory?: boolean | null;
}
export type AnalyticsViewName = "_minimal" | "_local" | "_base";
export type AnalyticsView<V extends AnalyticsViewName> = V extends "_minimal"
  ? Pick<Analytics, "id" | "analyticsType">
  : V extends "_local"
  ? Pick<
      Analytics,
      | "id"
      | "analyticsType"
      | "dataType"
      | "active"
      | "organization"
      | "job"
      | "grade"
      | "position"
      | "jobCategory"
      | "personCategory"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      Analytics,
      | "id"
      | "analyticsType"
      | "dataType"
      | "active"
      | "organization"
      | "job"
      | "grade"
      | "position"
      | "jobCategory"
      | "personCategory"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
