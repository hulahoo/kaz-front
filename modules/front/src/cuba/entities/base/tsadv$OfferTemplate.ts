import { AbstractParentEntity } from "./AbstractParentEntity";
import { Report } from "./report$Report";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { JobGroup } from "./tsadv$JobGroup";
import { RcJobGroup } from "./tsadv$RcJobGroup";
export class OfferTemplate extends AbstractParentEntity {
  static NAME = "tsadv$OfferTemplate";
  reportTemplate?: Report | null;
  organization?: OrganizationGroupExt | null;
  position?: PositionGroupExt | null;
  job?: JobGroup | null;
  rcJobGroup?: RcJobGroup | null;
}
export type OfferTemplateViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "offerTemplate.browse"
  | "offerTemplate.edit";
export type OfferTemplateView<
  V extends OfferTemplateViewName
> = V extends "_base"
  ? Pick<
      OfferTemplate,
      | "id"
      | "reportTemplate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      OfferTemplate,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<OfferTemplate, "id" | "reportTemplate">
  : V extends "offerTemplate.browse"
  ? Pick<
      OfferTemplate,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "reportTemplate"
      | "organization"
      | "position"
      | "job"
      | "rcJobGroup"
    >
  : V extends "offerTemplate.edit"
  ? Pick<
      OfferTemplate,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "reportTemplate"
      | "organization"
      | "position"
      | "job"
      | "rcJobGroup"
    >
  : never;
