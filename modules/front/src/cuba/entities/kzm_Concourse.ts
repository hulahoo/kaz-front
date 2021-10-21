import { StandardEntity } from "./base/sys$StandardEntity";
export class Concourse extends StandardEntity {
  static NAME = "kzm_Concourse";
  nameRu?: string | null;
  nameEn?: string | null;
  description?: string | null;
}
export type ConcourseViewName = "_base" | "_local" | "_minimal";
export type ConcourseView<V extends ConcourseViewName> = V extends "_base"
  ? Pick<Concourse, "id" | "description" | "nameRu" | "nameEn">
  : V extends "_local"
  ? Pick<Concourse, "id" | "nameRu" | "nameEn" | "description">
  : V extends "_minimal"
  ? Pick<Concourse, "id" | "description">
  : never;
