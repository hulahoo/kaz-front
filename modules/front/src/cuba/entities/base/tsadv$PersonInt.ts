import { AbstractEntityInt } from "./tsadv$AbstractEntityInt";
import { PersonEducationInt } from "./tsadv$PersonEducationInt";
import { PersonContactInt } from "./tsadv$PersonContactInt";
import { PersonExperienceInt } from "./tsadv$PersonExperienceInt";
import { PersonAttachmentInt } from "./tsadv$PersonAttachmentInt";
import { PersonCompetenceInt } from "./tsadv$PersonCompetenceInt";
export class PersonInt extends AbstractEntityInt {
  static NAME = "tsadv$PersonInt";
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  birthDate?: string | null;
  nationalIdentifier?: string | null;
  sex?: any | null;
  sexName?: string | null;
  nationality?: any | null;
  nationalityName?: string | null;
  citizenship?: any | null;
  citizenshipName?: string | null;
  maritalStatus?: any | null;
  maritalStatusName?: string | null;
  education?: PersonEducationInt | null;
  contacts?: PersonContactInt | null;
  experience?: PersonExperienceInt | null;
  attachments?: PersonAttachmentInt | null;
  competences?: PersonCompetenceInt | null;
  photo?: string | null;
  cityName?: string | null;
}
export type PersonIntViewName = "_base" | "_local" | "_minimal";
export type PersonIntView<V extends PersonIntViewName> = V extends "_base"
  ? Pick<PersonInt, "id">
  : V extends "_minimal"
  ? Pick<PersonInt, "id">
  : never;
