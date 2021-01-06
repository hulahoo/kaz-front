import { AbstractParentEntity } from "./AbstractParentEntity";
import { AssessmentParticipant } from "./tsadv$AssessmentParticipant";
import { Goal } from "./tsadv$Goal";
import { DicOverallRating } from "./tsadv$DicOverallRating";
export class AssessmentGoal extends AbstractParentEntity {
  static NAME = "tsadv$AssessmentGoal";
  participantAssessment?: AssessmentParticipant | null;
  goal?: Goal | null;
  overallRating?: DicOverallRating | null;
  comment?: string | null;
  weight?: any | null;
}
export type AssessmentGoalViewName = "_base" | "_local" | "_minimal";
export type AssessmentGoalView<
  V extends AssessmentGoalViewName
> = V extends "_base"
  ? Pick<
      AssessmentGoal,
      | "id"
      | "comment"
      | "weight"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      AssessmentGoal,
      | "id"
      | "comment"
      | "weight"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
