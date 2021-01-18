import { AbstractParentEntity } from "./AbstractParentEntity";
import { PerformancePlan } from "./tsadv$PerformancePlan";
import { CompetenceTemplate } from "./tsadv$CompetenceTemplate";
import { Assessment } from "./tsadv$Assessment";
import { Test } from "./tsadv$Test";
export class AssessmentTemplate extends AbstractParentEntity {
  static NAME = "tsadv$AssessmentTemplate";
  assessmentTemplateName?: string | null;
  performancePlan?: PerformancePlan | null;
  selfAssessment?: boolean | null;
  managerAssessment?: boolean | null;
  participantAssessment?: boolean | null;
  competenceTemplate?: CompetenceTemplate | null;
  assessment?: Assessment[] | null;
  goalWeight?: any | null;
  competenceWeight?: any | null;
  managerTest?: Test | null;
  workerTest?: Test | null;
  participantTest?: Test | null;
}
export type AssessmentTemplateViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "assessmentTemplate.browse"
  | "assessmentTemplate.edit"
  | "assessmentTemplate.filter"
  | "assessmentTemplateForCard";
export type AssessmentTemplateView<
  V extends AssessmentTemplateViewName
> = V extends "_base"
  ? Pick<
      AssessmentTemplate,
      | "id"
      | "assessmentTemplateName"
      | "selfAssessment"
      | "managerAssessment"
      | "participantAssessment"
      | "goalWeight"
      | "competenceWeight"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      AssessmentTemplate,
      | "id"
      | "assessmentTemplateName"
      | "selfAssessment"
      | "managerAssessment"
      | "participantAssessment"
      | "goalWeight"
      | "competenceWeight"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<AssessmentTemplate, "id" | "assessmentTemplateName">
  : V extends "assessmentTemplate.browse"
  ? Pick<
      AssessmentTemplate,
      | "id"
      | "performancePlan"
      | "competenceTemplate"
      | "managerTest"
      | "workerTest"
      | "participantTest"
      | "selfAssessment"
      | "managerAssessment"
      | "participantAssessment"
      | "assessmentTemplateName"
    >
  : V extends "assessmentTemplate.edit"
  ? Pick<
      AssessmentTemplate,
      | "id"
      | "selfAssessment"
      | "managerAssessment"
      | "participantAssessment"
      | "competenceTemplate"
      | "assessmentTemplateName"
      | "competenceWeight"
      | "goalWeight"
      | "managerTest"
      | "workerTest"
      | "participantTest"
      | "performancePlan"
    >
  : V extends "assessmentTemplate.filter"
  ? Pick<AssessmentTemplate, "id" | "assessmentTemplateName">
  : V extends "assessmentTemplateForCard"
  ? Pick<
      AssessmentTemplate,
      | "id"
      | "assessmentTemplateName"
      | "selfAssessment"
      | "managerAssessment"
      | "participantAssessment"
      | "goalWeight"
      | "competenceWeight"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "assessment"
      | "competenceTemplate"
    >
  : never;
