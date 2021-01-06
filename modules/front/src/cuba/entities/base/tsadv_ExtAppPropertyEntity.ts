import { AppPropertyEntity } from "./sys$AppPropertyEntity";
import { AppPropertyEntityDescription } from "./tsadv_AppPropertyEntityDescription";
export class ExtAppPropertyEntity extends AppPropertyEntity {
  static NAME = "tsadv_ExtAppPropertyEntity";
  extParent?: ExtAppPropertyEntity | null;
  description?: AppPropertyEntityDescription | null;
}
export type ExtAppPropertyEntityViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "extAppPropertyEntity-view";
export type ExtAppPropertyEntityView<
  V extends ExtAppPropertyEntityViewName
> = V extends "extAppPropertyEntity-view"
  ? Pick<ExtAppPropertyEntity, "id" | "extParent" | "description">
  : never;
