import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class PreferenceTypePojo extends BaseUuidEntity {
  static NAME = "tsadv$PreferenceTypePojo";
  name?: string | null;
  code?: string | null;
  coins?: any | null;
}
export type PreferenceTypePojoViewName = "_minimal" | "_local" | "_base";
export type PreferenceTypePojoView<
  V extends PreferenceTypePojoViewName
> = V extends "_minimal"
  ? Pick<PreferenceTypePojo, "id" | "name">
  : V extends "_base"
  ? Pick<PreferenceTypePojo, "id" | "name">
  : never;
