import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class Importer extends BaseUuidEntity {
  static NAME = "tsadv$Importer";
  beanName?: string | null;
  description?: string | null;
}
export type ImporterViewName = "_minimal" | "_local" | "_base";
export type ImporterView<V extends ImporterViewName> = V extends "_minimal"
  ? Pick<Importer, "id" | "beanName" | "description">
  : V extends "_base"
  ? Pick<Importer, "id" | "beanName" | "description">
  : never;
