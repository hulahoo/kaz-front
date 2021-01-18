import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class QualityPojo extends BaseUuidEntity {
  static NAME = "tsadv$QualityPojo";
  name?: string | null;
  description?: string | null;
}
export type QualityPojoViewName = "_base" | "_local" | "_minimal";
export type QualityPojoView<V extends QualityPojoViewName> = V extends "_base"
  ? Pick<QualityPojo, "id" | "name">
  : V extends "_minimal"
  ? Pick<QualityPojo, "id" | "name">
  : never;
