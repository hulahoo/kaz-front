import { StandardEntity } from "./sys$StandardEntity";
import { Tagging } from "./ddct$Tagging";
export class Tag extends StandardEntity {
  static NAME = "ddct$Tag";
  value?: string | null;
  taggings?: Tagging[] | null;
  context?: string | null;
}
export type TagViewName = "_base" | "_local" | "_minimal" | "tag-view";
export type TagView<V extends TagViewName> = V extends "_base"
  ? Pick<Tag, "id" | "value" | "context">
  : V extends "_local"
  ? Pick<Tag, "id" | "value" | "context">
  : V extends "_minimal"
  ? Pick<Tag, "id" | "value">
  : V extends "tag-view"
  ? Pick<Tag, "id" | "value" | "context" | "taggings">
  : never;
