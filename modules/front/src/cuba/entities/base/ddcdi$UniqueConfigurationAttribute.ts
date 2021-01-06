import { StandardEntity } from "./sys$StandardEntity";
import { UniqueConfiguration } from "./ddcdi$UniqueConfiguration";
export class UniqueConfigurationAttribute extends StandardEntity {
  static NAME = "ddcdi$UniqueConfigurationAttribute";
  entityAttribute?: string | null;
  uniqueConfiguration?: UniqueConfiguration | null;
}
export type UniqueConfigurationAttributeViewName =
  | "_base"
  | "_local"
  | "_minimal";
export type UniqueConfigurationAttributeView<
  V extends UniqueConfigurationAttributeViewName
> = V extends "_base"
  ? Pick<UniqueConfigurationAttribute, "id" | "entityAttribute">
  : V extends "_local"
  ? Pick<UniqueConfigurationAttribute, "id" | "entityAttribute">
  : V extends "_minimal"
  ? Pick<UniqueConfigurationAttribute, "id" | "entityAttribute">
  : never;
