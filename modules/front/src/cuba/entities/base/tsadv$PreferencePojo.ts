import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class PreferencePojo extends BaseUuidEntity {
  static NAME = "tsadv$PreferencePojo";
  typeId?: any | null;
  typeName?: string | null;
  description?: string | null;
  reverseText?: string | null;
  coins?: any | null;
  showCoinsDescription?: boolean | null;
}
export type PreferencePojoViewName = "_minimal" | "_local" | "_base";
export type PreferencePojoView<V extends PreferencePojoViewName> = never;
