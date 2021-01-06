import { AbstractParentEntity } from "./AbstractParentEntity";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { InspectionType } from "./tsadv$InspectionType";
import { HarmfullFactors } from "./tsadv$HarmfullFactors";
export class PreAndPostShiftInspection extends AbstractParentEntity {
  static NAME = "tsadv$PreAndPostShiftInspection";
  organization?: OrganizationGroupExt | null;
  entryDate?: any | null;
  inspectionType?: InspectionType | null;
  inspectedNumber?: any | null;
  passedPreShiftInspection?: any | null;
  passedPostShiftInspection?: any | null;
  harmfullFactors?: HarmfullFactors | null;
}
export type PreAndPostShiftInspectionViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "preAndPostShiftInspection-view";
export type PreAndPostShiftInspectionView<
  V extends PreAndPostShiftInspectionViewName
> = V extends "_base"
  ? Pick<
      PreAndPostShiftInspection,
      | "id"
      | "entryDate"
      | "inspectedNumber"
      | "passedPreShiftInspection"
      | "passedPostShiftInspection"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PreAndPostShiftInspection,
      | "id"
      | "entryDate"
      | "inspectedNumber"
      | "passedPreShiftInspection"
      | "passedPostShiftInspection"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "preAndPostShiftInspection-view"
  ? Pick<
      PreAndPostShiftInspection,
      | "id"
      | "organization"
      | "entryDate"
      | "inspectionType"
      | "inspectedNumber"
      | "passedPreShiftInspection"
      | "passedPostShiftInspection"
    >
  : never;
