import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { PersonExt } from "./base$PersonExt";
import { PositionExt } from "./base$PositionExt";
import { Assessment } from "./tsadv$Assessment";
import { DicCurrency } from "./base$DicCurrency";
export class NotPersistEntity extends BaseUuidEntity {
  static NAME = "tsadv$NotPersistEntity";
  assignmentId?: any | null;
  person?: PersonExt | null;
  position?: PositionExt | null;
  assessment?: Assessment | null;
  direct?: any | null;
  total?: any | null;
  amount?: number | null;
  currency?: DicCurrency | null;
}
export type NotPersistEntityViewName = "_base" | "_local" | "_minimal";
export type NotPersistEntityView<V extends NotPersistEntityViewName> = never;
