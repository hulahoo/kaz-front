import { AbstractParentEntity } from "./AbstractParentEntity";
import { HealthDeterioration } from "./tsadv$HealthDeterioration";
export class Complaint extends AbstractParentEntity {
  static NAME = "tsadv$Complaint";
  complaints?: string | null;
  index?: string | null;
  healthDeterioration?: HealthDeterioration | null;
}
export type ComplaintViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "complaint-view";
export type ComplaintView<V extends ComplaintViewName> = V extends "_base"
  ? Pick<
      Complaint,
      | "id"
      | "complaints"
      | "index"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Complaint,
      | "id"
      | "complaints"
      | "index"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "complaint-view"
  ? Pick<Complaint, "id" | "complaints" | "index">
  : never;
