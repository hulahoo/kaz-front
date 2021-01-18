import { AbstractParentEntity } from "./AbstractParentEntity";
import { AssessmentTemplate } from "./tsadv$AssessmentTemplate";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicAssessmentStatus } from "./tsadv$DicAssessmentStatus";
import { AssessmentParticipant } from "./tsadv$AssessmentParticipant";
export class Assessment extends AbstractParentEntity {
  static NAME = "tsadv$Assessment";
  template?: AssessmentTemplate | null;
  startDate?: any | null;
  endDate?: any | null;
  employeePersonGroup?: PersonGroupExt | null;
  status?: DicAssessmentStatus | null;
  goalRating?: any | null;
  competenceRating?: any | null;
  overalRating?: any | null;
  performance?: any | null;
  potential?: any | null;
  riskOfLoss?: any | null;
  impactOfLoss?: any | null;
  assessmentName?: string | null;
  assessmentParticipant?: AssessmentParticipant[] | null;
  formattedOveralRating?: string | null;
  formattedCompetenceRating?: string | null;
  formattedGoalRating?: string | null;
}
export type AssessmentViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "assessment.create"
  | "assessment.matrix"
  | "assessment.scrum.competence"
  | "assessment.view"
  | "assessmentForCard";
export type AssessmentView<V extends AssessmentViewName> = V extends "_base"
  ? Pick<
      Assessment,
      | "id"
      | "startDate"
      | "endDate"
      | "goalRating"
      | "competenceRating"
      | "overalRating"
      | "performance"
      | "potential"
      | "riskOfLoss"
      | "impactOfLoss"
      | "assessmentName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Assessment,
      | "id"
      | "startDate"
      | "endDate"
      | "goalRating"
      | "competenceRating"
      | "overalRating"
      | "performance"
      | "potential"
      | "riskOfLoss"
      | "impactOfLoss"
      | "assessmentName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "assessment.create"
  ? Pick<
      Assessment,
      | "id"
      | "assessmentParticipant"
      | "assessmentName"
      | "template"
      | "startDate"
      | "endDate"
      | "status"
      | "employeePersonGroup"
    >
  : V extends "assessment.matrix"
  ? Pick<
      Assessment,
      | "id"
      | "employeePersonGroup"
      | "performance"
      | "potential"
      | "riskOfLoss"
      | "impactOfLoss"
      | "template"
      | "goalRating"
      | "competenceRating"
      | "overalRating"
    >
  : V extends "assessment.scrum.competence"
  ? Pick<
      Assessment,
      "id" | "employeePersonGroup" | "competenceRating" | "goalRating"
    >
  : V extends "assessment.view"
  ? Pick<
      Assessment,
      | "id"
      | "startDate"
      | "endDate"
      | "goalRating"
      | "competenceRating"
      | "overalRating"
      | "performance"
      | "potential"
      | "riskOfLoss"
      | "impactOfLoss"
      | "assessmentName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "template"
      | "employeePersonGroup"
    >
  : V extends "assessmentForCard"
  ? Pick<
      Assessment,
      | "id"
      | "startDate"
      | "endDate"
      | "goalRating"
      | "competenceRating"
      | "overalRating"
      | "performance"
      | "potential"
      | "riskOfLoss"
      | "impactOfLoss"
      | "assessmentName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "template"
      | "assessmentParticipant"
      | "status"
      | "employeePersonGroup"
    >
  : never;
