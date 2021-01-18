import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class ColumnDefinition extends BaseUuidEntity {
  definitionId?: string | null;
  label?: string | null;
  type?: string | null;
  expression?: string | null;
}
