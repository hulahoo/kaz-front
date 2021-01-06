import { AbstractParentEntity } from "./AbstractParentEntity";
import { Interview } from "./tsadv$Interview";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class InterviewDetail extends AbstractParentEntity {
  static NAME = "tsadv$InterviewDetail";
  interview?: Interview | null;
  interviewerPersonGroup?: PersonGroupExt | null;
}
export type InterviewDetailViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "interviewDetail.view";
export type InterviewDetailView<
  V extends InterviewDetailViewName
> = V extends "_base"
  ? Pick<
      InterviewDetail,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      InterviewDetail,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<InterviewDetail, "id">
  : V extends "interviewDetail.view"
  ? Pick<
      InterviewDetail,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "interview"
      | "interviewerPersonGroup"
    >
  : never;
