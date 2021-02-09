import { StandardEntity } from "./sys$StandardEntity";
import { DicMICAttachmentStatus } from "./tsadv$DicMICAttachmentStatus";
import { InsuranceContract } from "./tsadv$InsuranceContract";
import { DicCompany } from "./base_DicCompany";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicRelationshipType } from "./tsadv$DicRelationshipType";
import { JobGroup } from "./tsadv$JobGroup";
import { DicSex } from "./base$DicSex";
import { DicDocumentType } from "./tsadv$DicDocumentType";
import { DicRegion } from "./base$DicRegion";
import { Address } from "./tsadv$Address";
import { FileDescriptor } from "./sys$FileDescriptor";
export class InsuredPerson extends StandardEntity {
  static NAME = "tsadv$InsuredPerson";
  attachDate?: any | null;
  statusRequest?: DicMICAttachmentStatus | null;
  insuranceContract?: InsuranceContract | null;
  company?: DicCompany | null;
  employee?: PersonGroupExt | null;
  relative?: DicRelationshipType | null;
  firstName?: string | null;
  secondName?: string | null;
  middleName?: string | null;
  job?: JobGroup | null;
  jobMember?: string | null;
  sex?: DicSex | null;
  iin?: string | null;
  birthdate?: any | null;
  documentType?: DicDocumentType | null;
  documentNumber?: string | null;
  region?: DicRegion | null;
  addressType?: Address | null;
  address?: string | null;
  insuranceProgram?: string | null;
  file?: FileDescriptor[] | null;
  statementFile?: FileDescriptor | null;
  type?: any | null;
  amount?: any | null;
  totalAmount?: any | null;
  exclusionDate?: any | null;
  comment?: string | null;
}
export type InsuredPersonViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "insuredPerson-browseView"
  | "insuredPerson-bulkEditView"
  | "insuredPerson-editView"
  | "insuredPersonMember-editView";
export type InsuredPersonView<
  V extends InsuredPersonViewName
> = V extends "_base"
  ? Pick<
      InsuredPerson,
      | "id"
      | "firstName"
      | "attachDate"
      | "secondName"
      | "middleName"
      | "jobMember"
      | "iin"
      | "birthdate"
      | "documentNumber"
      | "address"
      | "insuranceProgram"
      | "type"
      | "amount"
      | "totalAmount"
      | "exclusionDate"
      | "comment"
    >
  : V extends "_local"
  ? Pick<
      InsuredPerson,
      | "id"
      | "attachDate"
      | "firstName"
      | "secondName"
      | "middleName"
      | "jobMember"
      | "iin"
      | "birthdate"
      | "documentNumber"
      | "address"
      | "insuranceProgram"
      | "type"
      | "amount"
      | "totalAmount"
      | "exclusionDate"
      | "comment"
    >
  : V extends "_minimal"
  ? Pick<InsuredPerson, "id" | "firstName">
  : V extends "insuredPerson-browseView"
  ? Pick<
      InsuredPerson,
      | "id"
      | "attachDate"
      | "firstName"
      | "secondName"
      | "middleName"
      | "jobMember"
      | "iin"
      | "birthdate"
      | "documentNumber"
      | "address"
      | "insuranceProgram"
      | "type"
      | "amount"
      | "totalAmount"
      | "exclusionDate"
      | "comment"
      | "statusRequest"
      | "employee"
      | "file"
      | "statementFile"
      | "relative"
      | "sex"
      | "documentType"
      | "insuranceContract"
      | "region"
      | "addressType"
      | "job"
      | "company"
    >
  : V extends "insuredPerson-bulkEditView"
  ? Pick<
      InsuredPerson,
      | "id"
      | "attachDate"
      | "firstName"
      | "secondName"
      | "middleName"
      | "jobMember"
      | "iin"
      | "birthdate"
      | "documentNumber"
      | "address"
      | "insuranceProgram"
      | "type"
      | "amount"
      | "totalAmount"
      | "exclusionDate"
      | "comment"
      | "statusRequest"
    >
  : V extends "insuredPerson-editView"
  ? Pick<
      InsuredPerson,
      | "id"
      | "attachDate"
      | "firstName"
      | "secondName"
      | "middleName"
      | "jobMember"
      | "iin"
      | "birthdate"
      | "documentNumber"
      | "address"
      | "insuranceProgram"
      | "type"
      | "amount"
      | "totalAmount"
      | "exclusionDate"
      | "comment"
      | "statusRequest"
      | "insuranceContract"
      | "company"
      | "employee"
      | "relative"
      | "job"
      | "sex"
      | "documentType"
      | "region"
      | "addressType"
      | "file"
      | "statementFile"
    >
  : V extends "insuredPersonMember-editView"
  ? Pick<
      InsuredPerson,
      | "id"
      | "attachDate"
      | "firstName"
      | "secondName"
      | "middleName"
      | "jobMember"
      | "iin"
      | "birthdate"
      | "documentNumber"
      | "address"
      | "insuranceProgram"
      | "type"
      | "amount"
      | "totalAmount"
      | "exclusionDate"
      | "comment"
      | "relative"
      | "statusRequest"
      | "insuranceContract"
      | "company"
      | "employee"
      | "job"
      | "sex"
      | "region"
      | "addressType"
      | "file"
      | "documentType"
    >
  : never;
