import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { AssignmentDetailsModel } from "./bproc_AssignmentDetailsModel";
export class LaneModel extends BaseUuidEntity {
  static NAME = "bproc_LaneModel";
  businessId?: string | null;
  name?: string | null;
  assignmentDetails?: AssignmentDetailsModel | null;
  documentation?: string | null;
}
export type LaneModelViewName = "_base" | "_local" | "_minimal";
export type LaneModelView<V extends LaneModelViewName> = V extends "_base"
  ? Pick<LaneModel, "id" | "name">
  : V extends "_minimal"
  ? Pick<LaneModel, "id" | "name">
  : never;
