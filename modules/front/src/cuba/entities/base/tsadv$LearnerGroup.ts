import { StandardEntity } from "./sys$StandardEntity";
export class LearnerGroup extends StandardEntity {
  static NAME = "tsadv$LearnerGroup";
  code?: string | null;
  active?: boolean | null;
  description?: string | null;
}
export type LearnerGroupViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "learnerGroup-browse"
  | "learnerGroup-complex-edit"
  | "learnerGroup-simple-edit";
export type LearnerGroupView<V extends LearnerGroupViewName> = V extends "_base"
  ? Pick<LearnerGroup, "id" | "code" | "active" | "description">
  : V extends "_local"
  ? Pick<LearnerGroup, "id" | "code" | "active" | "description">
  : V extends "_minimal"
  ? Pick<LearnerGroup, "id" | "code">
  : V extends "learnerGroup-browse"
  ? Pick<LearnerGroup, "id" | "code" | "active" | "description">
  : V extends "learnerGroup-complex-edit"
  ? Pick<LearnerGroup, "id" | "code" | "active" | "description">
  : V extends "learnerGroup-simple-edit"
  ? Pick<LearnerGroup, "id" | "code" | "active" | "description">
  : never;
