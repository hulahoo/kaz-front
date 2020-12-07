import { AbstractParentEntity } from "./AbstractParentEntity";
import { JobGroup } from "./tsadv$JobGroup";
import { DicProtectionEquipment } from "./tsadv$DicProtectionEquipment";
export class JobProtectionEquipment extends AbstractParentEntity {
  static NAME = "tsadv$JobProtectionEquipment";
  jobGroup?: JobGroup | null;
  personalProtectionEquipment?: DicProtectionEquipment | null;
  normPerYear?: number | null;
  startDate?: any | null;
  endDate?: any | null;
}
export type JobProtectionEquipmentViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "jobProtectionEquipment.edit";
export type JobProtectionEquipmentView<
  V extends JobProtectionEquipmentViewName
> = V extends "_local"
  ? Pick<
      JobProtectionEquipment,
      | "id"
      | "normPerYear"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      JobProtectionEquipment,
      | "id"
      | "normPerYear"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "jobProtectionEquipment.edit"
  ? Pick<
      JobProtectionEquipment,
      | "id"
      | "normPerYear"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "jobGroup"
      | "personalProtectionEquipment"
    >
  : never;
