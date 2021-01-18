import { AbstractParentEntity } from "./AbstractParentEntity";
import { Attachment } from "./tsadv$Attachment";
import { OccupationalMedicine } from "./tsadv$OccupationalMedicine";
export class SanitaryHygieneEvent extends AbstractParentEntity {
  static NAME = "tsadv$SanitaryHygieneEvent";
  developedEvents?: any | null;
  attachment?: Attachment[] | null;
  doneEvents?: any | null;
  occupationalMedicine?: OccupationalMedicine | null;
}
export type SanitaryHygieneEventViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "sanitaryHygieneEvent-view";
export type SanitaryHygieneEventView<
  V extends SanitaryHygieneEventViewName
> = V extends "_base"
  ? Pick<
      SanitaryHygieneEvent,
      | "id"
      | "developedEvents"
      | "doneEvents"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      SanitaryHygieneEvent,
      | "id"
      | "developedEvents"
      | "doneEvents"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "sanitaryHygieneEvent-view"
  ? Pick<
      SanitaryHygieneEvent,
      "id" | "developedEvents" | "doneEvents" | "attachment"
    >
  : never;
