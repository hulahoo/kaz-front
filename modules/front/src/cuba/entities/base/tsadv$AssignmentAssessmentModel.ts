import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class AssignmentAssessmentModel extends BaseUuidEntity {
  static NAME = "tsadv$AssignmentAssessmentModel";
}
export type AssignmentAssessmentModelViewName = "_minimal" | "_local" | "_base";
export type AssignmentAssessmentModelView<
  V extends AssignmentAssessmentModelViewName
> = never;
