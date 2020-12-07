import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { CalibrationComission } from "./tsadv$CalibrationComission";
import { AssessmentTemplate } from "./tsadv$AssessmentTemplate";
export class CalibrationSession extends AbstractParentEntity {
  static NAME = "tsadv$CalibrationSession";
  name?: string | null;
  date?: any | null;
  administrator?: PersonGroupExt | null;
  status?: string | null;
  comissions?: CalibrationComission[] | null;
  template?: AssessmentTemplate | null;
}
export type CalibrationSessionViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "calibrationSession.browse";
export type CalibrationSessionView<
  V extends CalibrationSessionViewName
> = V extends "_local"
  ? Pick<
      CalibrationSession,
      | "id"
      | "name"
      | "date"
      | "status"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      CalibrationSession,
      | "id"
      | "name"
      | "date"
      | "status"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "calibrationSession.browse"
  ? Pick<
      CalibrationSession,
      | "id"
      | "name"
      | "date"
      | "administrator"
      | "status"
      | "comissions"
      | "template"
    >
  : never;
