import { AbstractBprocRequest } from "./AbstractBprocRequest";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { FileDescriptor } from "./sys$FileDescriptor";
export class ConcourseRequest extends AbstractBprocRequest {
  static NAME = "tsadv_ConcourseRequest";
  endDate?: any | null;
  scaleOfDistrubution?: any | null;
  projectManager?: PersonGroupExt[] | null;
  contactInfo?: PersonGroupExt[] | null;
  managerPosition?: PersonGroupExt[] | null;
  managerCompany?: PersonGroupExt[] | null;
  projectExpert?: PersonGroupExt[] | null;
  expertPosition?: PersonGroupExt[] | null;
  expertCompany?: PersonGroupExt[] | null;
  expertContanctInfo?: PersonGroupExt[] | null;
  shortProjectDescriptionRu?: string | null;
  shortProjectDescriptionEn?: string | null;
  reqeustTemplate?: FileDescriptor | null;
  requestAttachments?: FileDescriptor | null;
  initiator?: PersonGroupExt[] | null;
  initiatorCompany?: PersonGroupExt[] | null;
  initiatorPosition?: PersonGroupExt[] | null;
  requestNameRu?: string | null;
  requestNameEn?: string | null;
  startDate?: any | null;
}
export type ConcourseRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
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
      | "shortProjectDescriptionRu"
      | "shortProjectDescriptionEn"
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
      | "shortProjectDescriptionRu"
      | "shortProjectDescriptionEn"
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
  : V extends "concourseRequest-view"
  ? Pick<
      ConcourseRequest,
      | "id"
      | "endDate"
      | "scaleOfDistrubution"
      | "shortProjectDescriptionRu"
      | "shortProjectDescriptionEn"
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
      | "contactInfo"
      | "managerPosition"
      | "managerCompany"
      | "projectExpert"
      | "expertPosition"
      | "expertCompany"
      | "expertContanctInfo"
      | "reqeustTemplate"
      | "requestAttachments"
      | "initiator"
      | "initiatorCompany"
      | "initiatorPosition"
      | "status"
    >
  : never;
