import { StandardEntity } from "./sys$StandardEntity";
import { UserExt } from "./base$UserExt";
export class BpmUserSubstitution extends StandardEntity {
  static NAME = "tsadv$BpmUserSubstitution";
  substitutedUser?: UserExt | null;
  user?: UserExt | null;
  startDate?: any | null;
  endDate?: any | null;
}
export type BpmUserSubstitutionViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "bpmUserSubstitution-view";
export type BpmUserSubstitutionView<
  V extends BpmUserSubstitutionViewName
> = V extends "_local"
  ? Pick<BpmUserSubstitution, "id" | "startDate" | "endDate">
  : V extends "_base"
  ? Pick<BpmUserSubstitution, "id" | "startDate" | "endDate">
  : V extends "bpmUserSubstitution-view"
  ? Pick<
      BpmUserSubstitution,
      "id" | "startDate" | "endDate" | "substitutedUser" | "user"
    >
  : never;
