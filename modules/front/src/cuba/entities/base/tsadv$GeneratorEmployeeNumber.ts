import { StandardEntity } from "./sys$StandardEntity";
export class GeneratorEmployeeNumber extends StandardEntity {
  static NAME = "tsadv$GeneratorEmployeeNumber";
  name?: string | null;
  prefix?: string | null;
  suffix?: string | null;
}
export type GeneratorEmployeeNumberViewName = "_minimal" | "_local" | "_base";
export type GeneratorEmployeeNumberView<
  V extends GeneratorEmployeeNumberViewName
> = V extends "_local"
  ? Pick<GeneratorEmployeeNumber, "id" | "name" | "prefix" | "suffix">
  : V extends "_base"
  ? Pick<GeneratorEmployeeNumber, "id" | "name" | "prefix" | "suffix">
  : never;
