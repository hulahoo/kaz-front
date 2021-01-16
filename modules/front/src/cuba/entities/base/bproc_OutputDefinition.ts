import { ColumnDefinition } from "./ColumnDefinition";
export class OutputDefinition extends ColumnDefinition {
  static NAME = "bproc_OutputDefinition";
  outputValues?: string | null;
}
export type OutputDefinitionViewName = "_base" | "_local" | "_minimal";
export type OutputDefinitionView<
  V extends OutputDefinitionViewName
> = V extends "_base"
  ? Pick<
      OutputDefinition,
      "id" | "definitionId" | "label" | "type" | "expression"
    >
  : V extends "_local"
  ? Pick<
      OutputDefinition,
      "id" | "definitionId" | "label" | "type" | "expression"
    >
  : never;
