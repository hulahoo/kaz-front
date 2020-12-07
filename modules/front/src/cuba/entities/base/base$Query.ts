import { StandardEntity } from "./sys$StandardEntity";
export class Query extends StandardEntity {
  static NAME = "base$Query";
  type?: any | null;
  name?: string | null;
  query?: string | null;
}
export type QueryViewName = "_minimal" | "_local" | "_base";
export type QueryView<V extends QueryViewName> = V extends "_minimal"
  ? Pick<Query, "id" | "name">
  : V extends "_local"
  ? Pick<Query, "id" | "type" | "name" | "query">
  : V extends "_base"
  ? Pick<Query, "id" | "name" | "type" | "query">
  : never;
