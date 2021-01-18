import { AbstractParentEntity } from "./AbstractParentEntity";
import { Assessment } from "./tsadv$Assessment";
import { DicParticipantType } from "./tsadv$DicParticipantType";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicNineBoxLevel } from "./tsadv$DicNineBoxLevel";
import { AssessmentCompetence } from "./tsadv$AssessmentCompetence";
import { AssessmentGoal } from "./tsadv$AssessmentGoal";
export class AssessmentParticipant extends AbstractParentEntity {
  static NAME = "tsadv$AssessmentParticipant";
  assessment?: Assessment | null;
  participantType?: DicParticipantType | null;
  participantPersonGroup?: PersonGroupExt | null;
  goalRating?: any | null;
  competenceRating?: any | null;
  overallRating?: any | null;
  performance?: DicNineBoxLevel | null;
  potential?: DicNineBoxLevel | null;
  riskOfLoss?: DicNineBoxLevel | null;
  impactOfLoss?: DicNineBoxLevel | null;
  assessmentCompetence?: AssessmentCompetence[] | null;
  assessmentGoal?: AssessmentGoal[] | null;
  overallComment?: string | null;
}
export type AssessmentParticipantViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "assessmentParticipant.browse";
export type AssessmentParticipantView<
  V extends AssessmentParticipantViewName
> = V extends "_base"
  ? Pick<
      AssessmentParticipant,
      | "id"
      | "goalRating"
      | "competenceRating"
      | "overallRating"
      | "overallComment"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      AssessmentParticipant,
      | "id"
      | "goalRating"
      | "competenceRating"
      | "overallRating"
      | "overallComment"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "assessmentParticipant.browse"
  ? Pick<
      AssessmentParticipant,
      | "id"
      | "goalRating"
      | "competenceRating"
      | "overallRating"
      | "overallComment"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "participantPersonGroup"
      | "assessment"
      | "performance"
      | "potential"
      | "riskOfLoss"
      | "participantType"
      | "impactOfLoss"
      | "assessmentCompetence"
    >
  : never;
