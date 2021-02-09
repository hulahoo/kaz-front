import { StandardEntity } from "./sys$StandardEntity";
import { DicCompany } from "./base_DicCompany";
import { DicDocumentType } from "./tsadv$DicDocumentType";
import { DicAddressType } from "./tsadv$DicAddressType";
import { ContractConditions } from "./tsadv$ContractConditions";
import { InsuranceContractAdministrator } from "./tsadv$InsuranceContractAdministrator";
import { Attachment } from "./tsadv$Attachment";
export class InsuranceContract extends StandardEntity {
  static NAME = "tsadv$InsuranceContract";
  policyName?: string | null;
  contract?: string | null;
  signDate?: any | null;
  company?: DicCompany | null;
  insurer?: string | null;
  defaultDocumentType?: DicDocumentType | null;
  defaultAddress?: DicAddressType | null;
  year?: number | null;
  startDate?: any | null;
  expirationDate?: any | null;
  availabilityPeriodFrom?: any | null;
  availabilityPeriodTo?: any | null;
  insuranceProgram?: string | null;
  insurerContacts?: string | null;
  notificationDate?: any | null;
  attachingAnEmployee?: number | null;
  attachingFamily?: number | null;
  countOfFreeMembers?: number | null;
  programConditions?: ContractConditions[] | null;
  contractAdministrator?: InsuranceContractAdministrator[] | null;
  attachments?: Attachment[] | null;
}
export type InsuranceContractViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "insuranceContract-browseView"
  | "insuranceContract-editView";
export type InsuranceContractView<
  V extends InsuranceContractViewName
> = V extends "_base"
  ? Pick<
      InsuranceContract,
      | "id"
      | "contract"
      | "policyName"
      | "signDate"
      | "insurer"
      | "year"
      | "startDate"
      | "expirationDate"
      | "availabilityPeriodFrom"
      | "availabilityPeriodTo"
      | "insuranceProgram"
      | "insurerContacts"
      | "notificationDate"
      | "attachingAnEmployee"
      | "attachingFamily"
      | "countOfFreeMembers"
    >
  : V extends "_local"
  ? Pick<
      InsuranceContract,
      | "id"
      | "policyName"
      | "contract"
      | "signDate"
      | "insurer"
      | "year"
      | "startDate"
      | "expirationDate"
      | "availabilityPeriodFrom"
      | "availabilityPeriodTo"
      | "insuranceProgram"
      | "insurerContacts"
      | "notificationDate"
      | "attachingAnEmployee"
      | "attachingFamily"
      | "countOfFreeMembers"
    >
  : V extends "_minimal"
  ? Pick<InsuranceContract, "id" | "contract">
  : V extends "insuranceContract-browseView"
  ? Pick<
      InsuranceContract,
      | "id"
      | "policyName"
      | "contract"
      | "signDate"
      | "insurer"
      | "year"
      | "startDate"
      | "expirationDate"
      | "availabilityPeriodFrom"
      | "availabilityPeriodTo"
      | "insuranceProgram"
      | "insurerContacts"
      | "notificationDate"
      | "attachingAnEmployee"
      | "attachingFamily"
      | "countOfFreeMembers"
      | "company"
      | "defaultDocumentType"
      | "defaultAddress"
      | "programConditions"
      | "attachments"
      | "contractAdministrator"
    >
  : V extends "insuranceContract-editView"
  ? Pick<
      InsuranceContract,
      | "id"
      | "policyName"
      | "contract"
      | "signDate"
      | "insurer"
      | "year"
      | "startDate"
      | "expirationDate"
      | "availabilityPeriodFrom"
      | "availabilityPeriodTo"
      | "insuranceProgram"
      | "insurerContacts"
      | "notificationDate"
      | "attachingAnEmployee"
      | "attachingFamily"
      | "countOfFreeMembers"
      | "company"
      | "programConditions"
      | "contractAdministrator"
      | "attachments"
      | "defaultDocumentType"
      | "defaultAddress"
    >
  : never;
