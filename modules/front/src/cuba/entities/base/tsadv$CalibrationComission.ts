import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { CalibrationSession } from "./tsadv$CalibrationSession";
export class CalibrationComission extends AbstractParentEntity {
  static NAME = "tsadv$CalibrationComission";
  person?: PersonGroupExt | null;
  calibrationSession?: CalibrationSession | null;
}
export type CalibrationComissionViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "calibrationComission.edit";
export type CalibrationComissionView<
  V extends CalibrationComissionViewName
> = V extends "_local"
  ? Pick<
      CalibrationComission,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      CalibrationComission,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "calibrationComission.edit"
  ? Pick<CalibrationComission, "id" | "person" | "calibrationSession">
  : never;
