import { StandardEntity } from "./sys$StandardEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { InsuranceContract } from "./tsadv$InsuranceContract";
export class InsuranceContractAdministrator extends StandardEntity {
  static NAME = "tsadv$InsuranceContractAdministrator";
  notifyAboutNewAttachments?: boolean | null;
  employee?: PersonGroupExt | null;
  insuranceContract?: InsuranceContract | null;
}
export type InsuranceContractAdministratorViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "insuranceContractAdministrator-browseView"
  | "insuranceContractAdministrator-editView";
export type InsuranceContractAdministratorView<
  V extends InsuranceContractAdministratorViewName
> = V extends "_base"
  ? Pick<InsuranceContractAdministrator, "id" | "notifyAboutNewAttachments">
  : V extends "_local"
  ? Pick<InsuranceContractAdministrator, "id" | "notifyAboutNewAttachments">
  : V extends "_minimal"
  ? Pick<InsuranceContractAdministrator, "id">
  : V extends "insuranceContractAdministrator-browseView"
  ? Pick<
      InsuranceContractAdministrator,
      "id" | "notifyAboutNewAttachments" | "employee"
    >
  : V extends "insuranceContractAdministrator-editView"
  ? Pick<
      InsuranceContractAdministrator,
      "id" | "notifyAboutNewAttachments" | "employee"
    >
  : never;
