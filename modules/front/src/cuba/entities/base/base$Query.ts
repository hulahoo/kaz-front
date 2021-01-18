import { StandardEntity } from "./sys$StandardEntity";
export class Query extends StandardEntity {
  static NAME = "base$Query";
  type?: any | null;
  name?: string | null;
  query?: string | null;
}
export type QueryViewName = "_base" | "_local" | "_minimal";
export type QueryView<V extends QueryViewName> = V extends "_base"
  ? Pick<Query, "id" | "name" | "type" | "query">
  : V extends "_local"
  ? Pick<Query, "id" | "type" | "name" | "query">
  : V extends "_minimal"
  ? Pick<Query, "id" | "name">
  : never;
