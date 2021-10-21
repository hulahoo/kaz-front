export class InputDefinition {
  static NAME = "bproc_InputDefinition";
}
export type InputDefinitionViewName = "_base" | "_local" | "_minimal";
export type InputDefinitionView<
  V extends InputDefinitionViewName
> = V extends "_base"
  ? Pick<InputDefinition>
  : V extends "_local"
  ? Pick<InputDefinition>
  : never;
