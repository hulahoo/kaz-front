import { AbstractParentEntity } from "./AbstractParentEntity";
import { AssessmentParticipant } from "./tsadv$AssessmentParticipant";
import { CompetenceGroup } from "./tsadv$CompetenceGroup";
import { DicOverallRating } from "./tsadv$DicOverallRating";
export class AssessmentCompetence extends AbstractParentEntity {
  static NAME = "tsadv$AssessmentCompetence";
  participantAssessment?: AssessmentParticipant | null;
  competenceGroup?: CompetenceGroup | null;
  overallRating?: DicOverallRating | null;
  comment?: string | null;
  weight?: any | null;
}
export type AssessmentCompetenceViewName = "_minimal" | "_local" | "_base";
export type AssessmentCompetenceView<
  V extends AssessmentCompetenceViewName
> = V extends "_local"
  ? Pick<
      AssessmentCompetence,
      | "id"
      | "comment"
      | "weight"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      AssessmentCompetence,
      | "id"
      | "comment"
      | "weight"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
