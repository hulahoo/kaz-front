import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicRequestStatus } from "./tsadv$DicRequestStatus";
import { FileDescriptor } from "./sys$FileDescriptor";
export class ImprovingProfessionalSkillsRequest extends AbstractParentEntity {
  static NAME = "tsadv_ImprovingProfessionalSkillsRequest";
  personGroup?: PersonGroupExt | null;
  startDateHistory?: any | null;
  endDateHistory?: any | null;
  startDate?: any | null;
  endDate?: any | null;
  specialty?: string | null;
  diploma?: string | null;
  issueDate?: any | null;
  requestStatus?: DicRequestStatus | null;
  file?: FileDescriptor | null;
  attachments?: FileDescriptor[] | null;
}
export type ImprovingProfessionalSkillsRequestViewName =
  | "_base"
  | "_local"
  | "_minimal";
export type ImprovingProfessionalSkillsRequestView<
  V extends ImprovingProfessionalSkillsRequestViewName
> = V extends "_base"
  ? Pick<
      ImprovingProfessionalSkillsRequest,
      | "id"
      | "startDateHistory"
      | "endDateHistory"
      | "startDate"
      | "endDate"
      | "specialty"
      | "diploma"
      | "issueDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      ImprovingProfessionalSkillsRequest,
      | "id"
      | "startDateHistory"
      | "endDateHistory"
      | "startDate"
      | "endDate"
      | "specialty"
      | "diploma"
      | "issueDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
