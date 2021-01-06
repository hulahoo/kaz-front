import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { CalibrationSession } from "./tsadv$CalibrationSession";
export class CalibrationMember extends AbstractParentEntity {
  static NAME = "tsadv$CalibrationMember";
  person?: PersonGroupExt | null;
  potencial?: number | null;
  performance?: number | null;
  riskOfLoss?: number | null;
  impactOfLoss?: number | null;
  competenceOverall?: number | null;
  goalOverall?: number | null;
  session?: CalibrationSession | null;
}
export type CalibrationMemberViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "calibrationMember.browse";
export type CalibrationMemberView<
  V extends CalibrationMemberViewName
> = V extends "_base"
  ? Pick<
      CalibrationMember,
      | "id"
      | "potencial"
      | "performance"
      | "riskOfLoss"
      | "impactOfLoss"
      | "competenceOverall"
      | "goalOverall"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      CalibrationMember,
      | "id"
      | "potencial"
      | "performance"
      | "riskOfLoss"
      | "impactOfLoss"
      | "competenceOverall"
      | "goalOverall"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "calibrationMember.browse"
  ? Pick<
      CalibrationMember,
      | "id"
      | "person"
      | "potencial"
      | "performance"
      | "riskOfLoss"
      | "impactOfLoss"
      | "competenceOverall"
      | "goalOverall"
      | "session"
    >
  : never;
