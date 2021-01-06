import { AbstractParentEntity } from "./AbstractParentEntity";
import { Course } from "./tsadv$Course";
export class Certification extends AbstractParentEntity {
  static NAME = "tsadv$Certification";
  name?: string | null;
  course?: Course | null;
  notifyDay?: number | null;
  lifeDay?: number | null;
  calculateType?: any | null;
  period?: any | null;
}
export type CertificationViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "certification.browse";
export type CertificationView<
  V extends CertificationViewName
> = V extends "_base"
  ? Pick<
      Certification,
      | "id"
      | "name"
      | "notifyDay"
      | "lifeDay"
      | "calculateType"
      | "period"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Certification,
      | "id"
      | "name"
      | "notifyDay"
      | "lifeDay"
      | "calculateType"
      | "period"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "certification.browse"
  ? Pick<
      Certification,
      | "id"
      | "course"
      | "notifyDay"
      | "lifeDay"
      | "calculateType"
      | "period"
      | "name"
    >
  : never;
