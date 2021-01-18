import { StandardEntity } from "./sys$StandardEntity";
import { Tag } from "./ddct$Tag";
import { User } from "./sec$User";
export class Tagging extends StandardEntity {
  static NAME = "ddct$Tagging";
  tag?: Tag | null;
  taggable?: any | null;
  tagger?: User | null;
  context?: string | null;
}
export type TaggingViewName = "_base" | "_local" | "_minimal" | "tagging-view";
export type TaggingView<V extends TaggingViewName> = V extends "_base"
  ? Pick<Tagging, "id" | "taggable" | "context">
  : V extends "_local"
  ? Pick<Tagging, "id" | "taggable" | "context">
  : V extends "tagging-view"
  ? Pick<Tagging, "id" | "taggable" | "context" | "tag" | "tagger">
  : never;
