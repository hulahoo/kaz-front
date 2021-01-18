import { StandardEntity } from "./sys$StandardEntity";
export class TemplateBlockGroup extends StandardEntity {
  static NAME = "emailtemplates_CustomTemplateBlock";
  name?: string | null;
}
export type TemplateBlockGroupViewName = "_base" | "_local" | "_minimal";
export type TemplateBlockGroupView<
  V extends TemplateBlockGroupViewName
> = V extends "_base"
  ? Pick<TemplateBlockGroup, "id" | "name">
  : V extends "_local"
  ? Pick<TemplateBlockGroup, "id" | "name">
  : V extends "_minimal"
  ? Pick<TemplateBlockGroup, "id" | "name">
  : never;
