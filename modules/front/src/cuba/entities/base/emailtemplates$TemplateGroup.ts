import { StandardEntity } from "./sys$StandardEntity";
export class TemplateGroup extends StandardEntity {
  static NAME = "emailtemplates$TemplateGroup";
  name?: string | null;
}
export type TemplateGroupViewName = "_base" | "_local" | "_minimal";
export type TemplateGroupView<
  V extends TemplateGroupViewName
> = V extends "_base"
  ? Pick<TemplateGroup, "id" | "name">
  : V extends "_local"
  ? Pick<TemplateGroup, "id" | "name">
  : V extends "_minimal"
  ? Pick<TemplateGroup, "id" | "name">
  : never;
