import { StandardEntity } from "./sys$StandardEntity";
import { TemplateBlockGroup } from "./emailtemplates_CustomTemplateBlock";
export class TemplateBlock extends StandardEntity {
  static NAME = "emailtemplates_TemplateBlock";
  name?: string | null;
  label?: string | null;
  category?: TemplateBlockGroup | null;
  content?: string | null;
  icon?: string | null;
}
export type TemplateBlockViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "templateBlock-view";
export type TemplateBlockView<
  V extends TemplateBlockViewName
> = V extends "_base"
  ? Pick<TemplateBlock, "id" | "name" | "label" | "content" | "icon">
  : V extends "_local"
  ? Pick<TemplateBlock, "id" | "name" | "label" | "content" | "icon">
  : V extends "_minimal"
  ? Pick<TemplateBlock, "id" | "name">
  : V extends "templateBlock-view"
  ? Pick<
      TemplateBlock,
      "id" | "name" | "label" | "content" | "icon" | "category"
    >
  : never;
