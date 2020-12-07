import { AbstractGroup } from "./AbstractGroup";
import { VacationConditions } from "./tsadv$VacationConditions";
export class VacationConditionsGroup extends AbstractGroup {
  static NAME = "tsadv$VacationConditionsGroup";
  list?: VacationConditions[] | null;
  vacationConditions?: VacationConditions | null;
}
export type VacationConditionsGroupViewName = "_minimal" | "_local" | "_base";
export type VacationConditionsGroupView<
  V extends VacationConditionsGroupViewName
> = V extends "_local"
  ? Pick<
      VacationConditionsGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      VacationConditionsGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : never;
