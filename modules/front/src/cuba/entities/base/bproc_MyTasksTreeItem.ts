import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class MyTasksTreeItem extends BaseUuidEntity {
  static NAME = "bproc_MyTasksTreeItem";
  parent?: MyTasksTreeItem | null;
  count?: number | null;
  processDefinitionKey?: string | null;
  processDefinitionName?: string | null;
  taskName?: string | null;
  taskDefinitionKey?: string | null;
  type?: any | null;
  assignedType?: any | null;
  caption?: string | null;
}
export type MyTasksTreeItemViewName = "_base" | "_local" | "_minimal";
export type MyTasksTreeItemView<V extends MyTasksTreeItemViewName> = never;
