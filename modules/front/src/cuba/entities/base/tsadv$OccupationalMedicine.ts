import { AbstractParentEntity } from "./AbstractParentEntity";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { SanitaryHygieneEvent } from "./tsadv$SanitaryHygieneEvent";
import { SanitaryRegulationsControl } from "./tsadv$SanitaryRegulationsControl";
import { Attachment } from "./tsadv$Attachment";
export class OccupationalMedicine extends AbstractParentEntity {
  static NAME = "tsadv$OccupationalMedicine";
  organization?: OrganizationGroupExt | null;
  event?: SanitaryHygieneEvent[] | null;
  control?: SanitaryRegulationsControl[] | null;
  attachment?: Attachment[] | null;
  entryDate?: any | null;
}
export type OccupationalMedicineViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "occupationalMedicine-view";
export type OccupationalMedicineView<
  V extends OccupationalMedicineViewName
> = V extends "_local"
  ? Pick<
      OccupationalMedicine,
      | "id"
      | "entryDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      OccupationalMedicine,
      | "id"
      | "entryDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "occupationalMedicine-view"
  ? Pick<
      OccupationalMedicine,
      "id" | "organization" | "entryDate" | "event" | "control" | "attachment"
    >
  : never;
