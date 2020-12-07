import { AbstractParentEntity } from "./AbstractParentEntity";
import { FileDescriptor } from "./sys$FileDescriptor";
import { AttachmentType } from "./tsadv$AttachmentType";
import { Buildings } from "./tsadv$Buildings";
import { Accidents } from "./tsadv$Accidents";
import { AccidenInjured } from "./tsadv$AccidenInjured";
import { Microtraum } from "./tsadv$Microtraum";
import { Incident } from "./tsadv$Incident";
import { HealthDeterioration } from "./tsadv$HealthDeterioration";
import { OccupationalMedicine } from "./tsadv$OccupationalMedicine";
import { SanitaryHygieneEvent } from "./tsadv$SanitaryHygieneEvent";
import { HarmfullFactors } from "./tsadv$HarmfullFactors";
import { NotAllowedPerson } from "./tsadv$NotAllowedPerson";
import { MedicalInspection } from "./tsadv$MedicalInspection";
export class Attachment extends AbstractParentEntity {
  static NAME = "tsadv$Attachment";
  attachment?: FileDescriptor | null;
  attachmentType?: AttachmentType | null;
  buildings?: Buildings | null;
  accidents?: Accidents | null;
  accidenInjured?: AccidenInjured | null;
  microtraum?: Microtraum | null;
  incident?: Incident | null;
  healthDeterioration?: HealthDeterioration | null;
  occupationalMedicine?: OccupationalMedicine | null;
  sanitaryHygieneEvent?: SanitaryHygieneEvent | null;
  harmfullFactors?: HarmfullFactors | null;
  notAllowedPerson?: NotAllowedPerson | null;
  medicalInspection?: MedicalInspection | null;
}
export type AttachmentViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "attachment-view";
export type AttachmentView<V extends AttachmentViewName> = V extends "_local"
  ? Pick<
      Attachment,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      Attachment,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "attachment-view"
  ? Pick<Attachment, "id" | "attachment" | "attachmentType">
  : never;
