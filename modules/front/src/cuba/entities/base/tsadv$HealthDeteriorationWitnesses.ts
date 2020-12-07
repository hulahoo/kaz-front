import { StandardEntity } from "./sys$StandardEntity";
import { PersonExt } from "./base$PersonExt";
import { HealthDeterioration } from "./tsadv$HealthDeterioration";
export class HealthDeteriorationWitnesses extends StandardEntity {
  static NAME = "tsadv$HealthDeteriorationWitnesses";
  person?: PersonExt | null;
  healthDeterioration?: HealthDeterioration | null;
}
export type HealthDeteriorationWitnessesViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "healthDeteriorationWitnesses-view";
export type HealthDeteriorationWitnessesView<
  V extends HealthDeteriorationWitnessesViewName
> = V extends "healthDeteriorationWitnesses-view"
  ? Pick<HealthDeteriorationWitnesses, "id" | "person">
  : never;
