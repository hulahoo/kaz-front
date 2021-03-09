import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicCompany } from "./base_DicCompany";
import { DicPortalFeedbackQuestion } from "./tsadv_DicPortalFeedbackQuestion";
export class PortalFeedback extends AbstractParentEntity {
  static NAME = "tsadv_PortalFeedback";
  company?: DicCompany | null;
  category?: DicPortalFeedbackQuestion | null;
  email?: string | null;
}
export type PortalFeedbackViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "portalFeedback.edit";
export type PortalFeedbackView<
  V extends PortalFeedbackViewName
> = V extends "_base"
  ? Pick<
      PortalFeedback,
      "id" | "email" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PortalFeedback,
      "id" | "email" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "portalFeedback.edit"
  ? Pick<
      PortalFeedback,
      | "id"
      | "email"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "company"
      | "category"
    >
  : never;
