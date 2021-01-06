import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonExt } from "./base$PersonExt";
import { FileDescriptor } from "./sys$FileDescriptor";
import { Accidents } from "./tsadv$Accidents";
export class AccidentEvent extends AbstractParentEntity {
  static NAME = "tsadv$AccidentEvent";
  person?: PersonExt | null;
  violations?: string | null;
  accidentReasonRemoval?: string | null;
  executionPeriod?: any | null;
  attachment?: FileDescriptor | null;
  accidents?: Accidents | null;
}
export type AccidentEventViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "accidentEvent-view";
export type AccidentEventView<
  V extends AccidentEventViewName
> = V extends "_base"
  ? Pick<
      AccidentEvent,
      | "id"
      | "violations"
      | "accidentReasonRemoval"
      | "executionPeriod"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      AccidentEvent,
      | "id"
      | "violations"
      | "accidentReasonRemoval"
      | "executionPeriod"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "accidentEvent-view"
  ? Pick<
      AccidentEvent,
      | "id"
      | "person"
      | "violations"
      | "accidentReasonRemoval"
      | "executionPeriod"
      | "attachment"
    >
  : never;
