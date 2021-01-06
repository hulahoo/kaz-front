import { AbstractParentEntity } from "./AbstractParentEntity";
import { HiringStep } from "./tsadv$HiringStep";
import { DicHiringMemberType } from "./tsadv$DicHiringMemberType";
import { DicHrRole } from "./tsadv$DicHrRole";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class HiringStepMember extends AbstractParentEntity {
  static NAME = "tsadv$HiringStepMember";
  hiringStep?: HiringStep | null;
  hiringMemberType?: DicHiringMemberType | null;
  role?: DicHrRole | null;
  userPersonGroup?: PersonGroupExt | null;
  startDate?: any | null;
  endDate?: any | null;
  mainInterviewer?: boolean | null;
}
export type HiringStepMemberViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "hiringStepMember.view";
export type HiringStepMemberView<
  V extends HiringStepMemberViewName
> = V extends "_base"
  ? Pick<
      HiringStepMember,
      | "id"
      | "startDate"
      | "endDate"
      | "mainInterviewer"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      HiringStepMember,
      | "id"
      | "startDate"
      | "endDate"
      | "mainInterviewer"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<HiringStepMember, "id">
  : V extends "hiringStepMember.view"
  ? Pick<
      HiringStepMember,
      | "id"
      | "startDate"
      | "endDate"
      | "mainInterviewer"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "hiringMemberType"
      | "role"
      | "userPersonGroup"
    >
  : never;
