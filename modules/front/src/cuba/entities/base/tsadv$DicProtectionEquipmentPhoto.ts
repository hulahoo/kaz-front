import { AbstractParentEntity } from "./AbstractParentEntity";
import { FileDescriptor } from "./sys$FileDescriptor";
import { DicProtectionEquipment } from "./tsadv$DicProtectionEquipment";
export class DicProtectionEquipmentPhoto extends AbstractParentEntity {
  static NAME = "tsadv$DicProtectionEquipmentPhoto";
  description?: string | null;
  attachment?: FileDescriptor | null;
  dicProtectionEquipment?: DicProtectionEquipment | null;
}
export type DicProtectionEquipmentPhotoViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "dicProtectionEquipmentPhoto.edit";
export type DicProtectionEquipmentPhotoView<
  V extends DicProtectionEquipmentPhotoViewName
> = V extends "_base"
  ? Pick<
      DicProtectionEquipmentPhoto,
      | "id"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      DicProtectionEquipmentPhoto,
      | "id"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<DicProtectionEquipmentPhoto, "id" | "description">
  : V extends "dicProtectionEquipmentPhoto.edit"
  ? Pick<
      DicProtectionEquipmentPhoto,
      | "id"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "attachment"
    >
  : never;
