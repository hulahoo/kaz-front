import { StandardEntity } from "./sys$StandardEntity";
import { TsadvUserExt } from "./tsadv$UserExt";
export class BpmUserSubstitution extends StandardEntity {
  static NAME = "tsadv$BpmUserSubstitution";
  substitutedUser?: TsadvUserExt | null;
  user?: TsadvUserExt | null;
  startDate?: any | null;
  endDate?: any | null;
}
export type BpmUserSubstitutionViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "bpmUserSubstitution-view";
export type BpmUserSubstitutionView<
  V extends BpmUserSubstitutionViewName
> = V extends "_base"
  ? Pick<BpmUserSubstitution, "id" | "startDate" | "endDate">
  : V extends "_local"
  ? Pick<BpmUserSubstitution, "id" | "startDate" | "endDate">
  : V extends "bpmUserSubstitution-view"
  ? Pick<
      BpmUserSubstitution,
      "id" | "startDate" | "endDate" | "substitutedUser" | "user"
    >
  : never;
