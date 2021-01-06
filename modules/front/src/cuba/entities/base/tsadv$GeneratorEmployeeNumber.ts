import { StandardEntity } from "./sys$StandardEntity";
export class GeneratorEmployeeNumber extends StandardEntity {
  static NAME = "tsadv$GeneratorEmployeeNumber";
  name?: string | null;
  prefix?: string | null;
  suffix?: string | null;
}
export type GeneratorEmployeeNumberViewName = "_base" | "_local" | "_minimal";
export type GeneratorEmployeeNumberView<
  V extends GeneratorEmployeeNumberViewName
> = V extends "_base"
  ? Pick<GeneratorEmployeeNumber, "id" | "name" | "prefix" | "suffix">
  : V extends "_local"
  ? Pick<GeneratorEmployeeNumber, "id" | "name" | "prefix" | "suffix">
  : never;
