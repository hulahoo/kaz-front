export class OutputDefinition {
  static NAME = "bproc_OutputDefinition";
  outputValues?: string | null;
}
export type OutputDefinitionViewName = "_base" | "_local" | "_minimal";
export type OutputDefinitionView<
  V extends OutputDefinitionViewName
> = V extends "_base"
  ? Pick<OutputDefinition>
  : V extends "_local"
  ? Pick<OutputDefinition>
  : never;
