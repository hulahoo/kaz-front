import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class FieldChangeEntity extends BaseUuidEntity {
  static NAME = "tsadv$FieldChangeEntity";
  field?: string | null;
  oldValue?: string | null;
  newValue?: string | null;
}
export type FieldChangeEntityViewName = "_minimal" | "_local" | "_base";
export type FieldChangeEntityView<V extends FieldChangeEntityViewName> = never;
