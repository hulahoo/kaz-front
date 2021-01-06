import { StandardEntity } from "./sys$StandardEntity";
import { UniqueConfigurationAttribute } from "./ddcdi$UniqueConfigurationAttribute";
import { ImportConfiguration } from "./ddcdi$ImportConfiguration";
export class UniqueConfiguration extends StandardEntity {
  static NAME = "ddcdi$UniqueConfiguration";
  entityAttributes?: UniqueConfigurationAttribute[] | null;
  policy?: any | null;
  importConfiguration?: ImportConfiguration | null;
}
export type UniqueConfigurationViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "uniqueConfiguration-view";
export type UniqueConfigurationView<
  V extends UniqueConfigurationViewName
> = V extends "_base"
  ? Pick<UniqueConfiguration, "id" | "policy">
  : V extends "_local"
  ? Pick<UniqueConfiguration, "id" | "policy">
  : V extends "uniqueConfiguration-view"
  ? Pick<UniqueConfiguration, "id" | "policy" | "entityAttributes">
  : never;
