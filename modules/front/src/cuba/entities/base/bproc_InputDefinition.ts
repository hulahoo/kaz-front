import { ColumnDefinition } from "./ColumnDefinition";
export class InputDefinition extends ColumnDefinition {
  static NAME = "bproc_InputDefinition";
}
export type InputDefinitionViewName = "_base" | "_local" | "_minimal";
export type InputDefinitionView<
  V extends InputDefinitionViewName
> = V extends "_base"
  ? Pick<
      InputDefinition,
      "id" | "definitionId" | "label" | "type" | "expression"
    >
  : V extends "_local"
  ? Pick<
      InputDefinition,
      "id" | "definitionId" | "label" | "type" | "expression"
    >
  : never;
