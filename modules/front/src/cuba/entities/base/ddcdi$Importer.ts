import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class Importer extends BaseUuidEntity {
  static NAME = "ddcdi$Importer";
  beanName?: string | null;
  description?: string | null;
}
export type ImporterViewName = "_base" | "_local" | "_minimal";
export type ImporterView<V extends ImporterViewName> = V extends "_base"
  ? Pick<Importer, "id" | "beanName" | "description">
  : V extends "_minimal"
  ? Pick<Importer, "id" | "beanName" | "description">
  : never;
