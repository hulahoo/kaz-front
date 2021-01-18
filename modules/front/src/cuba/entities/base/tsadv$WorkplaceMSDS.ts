import { AbstractParentEntity } from "./AbstractParentEntity";
import { FileDescriptor } from "./sys$FileDescriptor";
import { StatusMsds } from "./tsadv$StatusMsds";
import { WorkPlace } from "./tsadv$WorkPlace";
export class WorkplaceMSDS extends AbstractParentEntity {
  static NAME = "tsadv$WorkplaceMSDS";
  developPlanDate?: any | null;
  developFactDate?: any | null;
  msds?: FileDescriptor | null;
  document?: FileDescriptor | null;
  status?: StatusMsds | null;
  donePlanDate?: any | null;
  doneFactDate?: any | null;
  workPlace?: WorkPlace | null;
}
export type WorkplaceMSDSViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "workplaceMSDS-view";
export type WorkplaceMSDSView<
  V extends WorkplaceMSDSViewName
> = V extends "_base"
  ? Pick<
      WorkplaceMSDS,
      | "id"
      | "developPlanDate"
      | "developFactDate"
      | "donePlanDate"
      | "doneFactDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      WorkplaceMSDS,
      | "id"
      | "developPlanDate"
      | "developFactDate"
      | "donePlanDate"
      | "doneFactDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "workplaceMSDS-view"
  ? Pick<
      WorkplaceMSDS,
      | "id"
      | "msds"
      | "document"
      | "status"
      | "developPlanDate"
      | "developFactDate"
      | "donePlanDate"
      | "doneFactDate"
    >
  : never;
