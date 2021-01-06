import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { EventListenerModel } from "./bproc_EventListenerModel";
export class ProcessModel extends BaseUuidEntity {
  static NAME = "bproc_ProcessModel";
  businessId?: string | null;
  name?: string | null;
  eventListeners?: EventListenerModel | null;
  documentation?: string | null;
  candidateStarterUsers?: string | null;
  candidateStarterUsersValue?: string | null;
  candidateUsersSource?: any | null;
  candidateGroupsSource?: any | null;
  candidateStarterGroups?: string | null;
  candidateStarterGroupsValue?: string | null;
}
export type ProcessModelViewName = "_base" | "_local" | "_minimal";
export type ProcessModelView<V extends ProcessModelViewName> = V extends "_base"
  ? Pick<ProcessModel, "id" | "name">
  : V extends "_minimal"
  ? Pick<ProcessModel, "id" | "name">
  : never;
