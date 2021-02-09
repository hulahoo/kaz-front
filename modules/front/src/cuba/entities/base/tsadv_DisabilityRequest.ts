import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicDisabilityType } from "./tsadv$DicDisabilityType";
import { DicDuration } from "./tsadv$DicDuration";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicRequestStatus } from "./tsadv$DicRequestStatus";
import { FileDescriptor } from "./sys$FileDescriptor";
import { Disability } from "./tsadv$Disability";
export class DisabilityRequest extends AbstractParentEntity {
  static NAME = "tsadv_DisabilityRequest";
  disabilityType?: DicDisabilityType | null;
  attachmentName?: string | null;
  attachment?: any | null;
  duration?: DicDuration | null;
  dateFrom?: any | null;
  dateTo?: any | null;
  personGroupExt?: PersonGroupExt | null;
  haveDisability?: any | null;
  group?: string | null;
  requestStatus?: DicRequestStatus | null;
  file?: FileDescriptor | null;
  disability?: Disability | null;
  attachments?: FileDescriptor[] | null;
}
export type DisabilityRequestViewName = "_base" | "_local" | "_minimal";
export type DisabilityRequestView<
  V extends DisabilityRequestViewName
> = V extends "_base"
  ? Pick<
      DisabilityRequest,
      | "id"
      | "attachmentName"
      | "attachment"
      | "dateFrom"
      | "dateTo"
      | "haveDisability"
      | "group"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      DisabilityRequest,
      | "id"
      | "attachmentName"
      | "attachment"
      | "dateFrom"
      | "dateTo"
      | "haveDisability"
      | "group"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
