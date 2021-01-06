import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class AssignmentDetailsModel extends BaseUuidEntity {
  static NAME = "bproc_AssignmentDetailsModel";
  assignee?: string | null;
  assigneeSource?: any | null;
  assigneeValue?: string | null;
  candidateGroups?: string | null;
  candidateGroupsSource?: any | null;
  candidateGroupsValue?: string | null;
  candidateUsers?: string | null;
  candidateUsersSource?: any | null;
  candidateUsersValue?: string | null;
}
export type AssignmentDetailsModelViewName = "_base" | "_local" | "_minimal";
export type AssignmentDetailsModelView<
  V extends AssignmentDetailsModelViewName
> = never;
