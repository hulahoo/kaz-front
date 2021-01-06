import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { BudgetRequestItem } from "./tsadv$BudgetRequestItem";
import { DicCostType } from "./tsadv$DicCostType";
export class BudgetRequestItemsRowDto extends BaseUuidEntity {
  static NAME = "tsadv$BudgetDto";
  name?: string | null;
  list?: BudgetRequestItem | null;
  dicCostType?: DicCostType | null;
}
export type BudgetRequestItemsRowDtoViewName = "_base" | "_local" | "_minimal";
export type BudgetRequestItemsRowDtoView<
  V extends BudgetRequestItemsRowDtoViewName
> = never;
