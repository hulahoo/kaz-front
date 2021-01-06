import { StandardEntity } from "./sys$StandardEntity";
import { GeneratorEmployeeNumber } from "./tsadv$GeneratorEmployeeNumber";
import { DicPersonType } from "./tsadv$DicPersonType";
export class GeneratorEmployeeNumberDefiner extends StandardEntity {
  static NAME = "tsadv$GeneratorEmployeeNumberDefiner";
  generatorEmployeeNumber?: GeneratorEmployeeNumber | null;
  personType?: DicPersonType | null;
}
export type GeneratorEmployeeNumberDefinerViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "generatorEmployeeNumberDefiner-view";
export type GeneratorEmployeeNumberDefinerView<
  V extends GeneratorEmployeeNumberDefinerViewName
> = V extends "generatorEmployeeNumberDefiner-view"
  ? Pick<
      GeneratorEmployeeNumberDefiner,
      "id" | "generatorEmployeeNumber" | "personType"
    >
  : never;
