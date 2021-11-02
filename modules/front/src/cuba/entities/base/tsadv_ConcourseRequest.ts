import { AbstractBprocRequest } from "./AbstractBprocRequest";
import { Concourse } from "./tsadv_Concourse";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { FileDescriptor } from "./sys$FileDescriptor";
export class ConcourseRequest extends AbstractBprocRequest {
  static NAME = "tsadv_ConcourseRequest";
  endDate?: any | null;
  concourse?: Concourse | null;
  scaleOfDistrubution?: any | null;
  projectManager?: PersonGroupExt | null;
  managerContactInfo?: string | null;
  managerPosition?: string | null;
  managerCompany?: string | null;
  projectExpert?: PersonGroupExt | null;
  expertPosition?: string | null;
  expertCompany?: string | null;
  expertContanctInfo?: string | null;
  shortProjectDescriptionRu?: string | null;
  shortProjectDescriptionEn?: string | null;
  requestTemplate?: FileDescriptor | null;
  requestAttachments?: FileDescriptor[] | null;
  personGroup?: PersonGroupExt | null;
  initiatorCompany?: string | null;
  initiatorPosition?: string | null;
  requestNameRu?: string | null;
  requestNameEn?: string | null;
  startDate?: any | null;
}
export type ConcourseRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "concourseRequest-edit"
  | "concourseRequest-view";
export type ConcourseRequestView<
  V extends ConcourseRequestViewName
> = V extends "_base"
  ? Pick<
      ConcourseRequest,
      | "id"
      | "requestNumber"
      | "endDate"
      | "scaleOfDistrubution"
      | "managerContactInfo"
      | "managerPosition"
      | "managerCompany"
      | "expertPosition"
      | "expertCompany"
      | "expertContanctInfo"
      | "shortProjectDescriptionRu"
      | "shortProjectDescriptionEn"
      | "initiatorCompany"
      | "initiatorPosition"
      | "requestNameRu"
      | "requestNameEn"
      | "startDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestDate"
      | "comment"
    >
  : V extends "_local"
  ? Pick<
      ConcourseRequest,
      | "id"
      | "endDate"
      | "scaleOfDistrubution"
      | "managerContactInfo"
      | "managerPosition"
      | "managerCompany"
      | "expertPosition"
      | "expertCompany"
      | "expertContanctInfo"
      | "shortProjectDescriptionRu"
      | "shortProjectDescriptionEn"
      | "initiatorCompany"
      | "initiatorPosition"
      | "requestNameRu"
      | "requestNameEn"
      | "startDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
    >
  : V extends "_minimal"
  ? Pick<ConcourseRequest, "id" | "requestNumber">
  : V extends "concourseRequest-edit"
  ? Pick<
      ConcourseRequest,
      | "id"
      | "endDate"
      | "scaleOfDistrubution"
      | "managerContactInfo"
      | "managerPosition"
      | "managerCompany"
      | "expertPosition"
      | "expertCompany"
      | "expertContanctInfo"
      | "shortProjectDescriptionRu"
      | "shortProjectDescriptionEn"
      | "initiatorCompany"
      | "initiatorPosition"
      | "requestNameRu"
      | "requestNameEn"
      | "startDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "projectManager"
      | "projectExpert"
      | "requestTemplate"
      | "requestAttachments"
      | "personGroup"
      | "status"
      | "concourse"
    >
  : V extends "concourseRequest-view"
  ? Pick<
      ConcourseRequest,
      | "id"
      | "endDate"
      | "scaleOfDistrubution"
      | "managerContactInfo"
      | "managerPosition"
      | "managerCompany"
      | "expertPosition"
      | "expertCompany"
      | "expertContanctInfo"
      | "shortProjectDescriptionRu"
      | "shortProjectDescriptionEn"
      | "initiatorCompany"
      | "initiatorPosition"
      | "requestNameRu"
      | "requestNameEn"
      | "startDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "projectManager"
      | "projectExpert"
      | "requestTemplate"
      | "requestAttachments"
      | "status"
      | "personGroup"
    >
  : never;
