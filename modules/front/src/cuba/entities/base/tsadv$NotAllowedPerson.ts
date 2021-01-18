import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonExt } from "./base$PersonExt";
import { Attachment } from "./tsadv$Attachment";
import { IntoxicationType } from "./tsadv$IntoxicationType";
import { HarmfullFactors } from "./tsadv$HarmfullFactors";
export class NotAllowedPerson extends AbstractParentEntity {
  static NAME = "tsadv$NotAllowedPerson";
  notAllowed?: PersonExt | null;
  attachment?: Attachment[] | null;
  dispensaryConfirmation?: boolean | null;
  intoxicationType?: IntoxicationType | null;
  harmfullFactors?: HarmfullFactors | null;
}
export type NotAllowedPersonViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "notAllowedPerson-view";
export type NotAllowedPersonView<
  V extends NotAllowedPersonViewName
> = V extends "_base"
  ? Pick<
      NotAllowedPerson,
      | "id"
      | "dispensaryConfirmation"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      NotAllowedPerson,
      | "id"
      | "dispensaryConfirmation"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "notAllowedPerson-view"
  ? Pick<
      NotAllowedPerson,
      | "id"
      | "notAllowed"
      | "dispensaryConfirmation"
      | "intoxicationType"
      | "attachment"
    >
  : never;
