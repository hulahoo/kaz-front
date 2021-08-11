import { AbstractBprocRequest } from "./base/AbstractBprocRequest";
import { PersonGroup } from "./base/base$PersonGroup";
import { DicPositionsOverlappingType } from "./kzm$DicPositionsOverlappingType";
import { OrganizationGroup } from "./base/base$OrganizationGroup";
import { FileDescriptor } from "./base/sys$FileDescriptor";
export class PositionOverlappingRequest extends AbstractBprocRequest {
  static NAME = "kzm$PositionOverlappingRequest";
  personGroup?: PersonGroup | null;
  type?: DicPositionsOverlappingType | null;
  department?: OrganizationGroup | null;
  file?: FileDescriptor | null;
}
export type PositionOverlappingRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "positionOverlappingRequest-edit";
export type PositionOverlappingRequestView<
  V extends PositionOverlappingRequestViewName
> = V extends "_base"
  ? Pick<
      PositionOverlappingRequest,
      | "id"
      | "requestNumber"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestDate"
      | "comment"
    >
  : V extends "_local"
  ? Pick<
      PositionOverlappingRequest,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
    >
  : V extends "_minimal"
  ? Pick<PositionOverlappingRequest, "id" | "requestNumber">
  : V extends "positionOverlappingRequest-edit"
  ? Pick<
      PositionOverlappingRequest,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "personGroup"
      | "type"
      | "department"
      | "status"
    >
  : never;
