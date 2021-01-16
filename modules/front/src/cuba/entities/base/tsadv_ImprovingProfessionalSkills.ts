import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { FileDescriptor } from "./sys$FileDescriptor";
export class ImprovingProfessionalSkills extends AbstractParentEntity {
  static NAME = "tsadv_ImprovingProfessionalSkills";
  personGroup?: PersonGroupExt | null;
  startDateHistory?: any | null;
  endDateHistory?: any | null;
  startDate?: any | null;
  endDate?: any | null;
  specialty?: string | null;
  diploma?: string | null;
  issueDate?: any | null;
  attachments?: FileDescriptor[] | null;
}
export type ImprovingProfessionalSkillsViewName =
  | "_base"
  | "_local"
  | "_minimal";
export type ImprovingProfessionalSkillsView<
  V extends ImprovingProfessionalSkillsViewName
> = V extends "_base"
  ? Pick<
      ImprovingProfessionalSkills,
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
      ImprovingProfessionalSkills,
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
