import { StandardEntity } from "./sys$StandardEntity";
import { LearnerGroup } from "./tsadv$LearnerGroup";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class Learner extends StandardEntity {
  static NAME = "tsadv$Learner";
  group?: LearnerGroup | null;
  personGroup?: PersonGroupExt | null;
}
export type LearnerViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "learner-browse"
  | "learner-edit"
  | "learnerGroup-learner-list";
export type LearnerView<V extends LearnerViewName> = V extends "_base"
  ? Pick<Learner, "id" | "group" | "personGroup">
  : V extends "_minimal"
  ? Pick<Learner, "id" | "group" | "personGroup">
  : V extends "learner-browse"
  ? Pick<Learner, "id" | "group" | "personGroup">
  : V extends "learner-edit"
  ? Pick<Learner, "id" | "group" | "personGroup">
  : V extends "learnerGroup-learner-list"
  ? Pick<Learner, "id" | "group" | "personGroup" | "group" | "personGroup">
  : never;
