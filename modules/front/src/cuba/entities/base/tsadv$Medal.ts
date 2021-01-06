import { StandardEntity } from "./sys$StandardEntity";
import { FileDescriptor } from "./sys$FileDescriptor";
import { Report } from "./report$Report";
import { MedalCondition } from "./tsadv$MedalCondition";
export class Medal extends StandardEntity {
  static NAME = "tsadv$Medal";
  langName1?: string | null;
  langName2?: string | null;
  langName5?: string | null;
  icon?: FileDescriptor | null;
  template?: Report | null;
  langName3?: string | null;
  langName4?: string | null;
  childMedalConditions?: MedalCondition[] | null;
  medalConditions?: MedalCondition[] | null;
  sort?: number | null;
  langName?: string | null;
}
export type MedalViewName = "_base" | "_local" | "_minimal" | "medal.edit";
export type MedalView<V extends MedalViewName> = V extends "_base"
  ? Pick<
      Medal,
      | "id"
      | "langName1"
      | "langName2"
      | "langName5"
      | "langName3"
      | "langName4"
      | "sort"
      | "langName"
    >
  : V extends "_local"
  ? Pick<
      Medal,
      | "id"
      | "langName1"
      | "langName2"
      | "langName5"
      | "langName3"
      | "langName4"
      | "sort"
      | "langName"
    >
  : V extends "_minimal"
  ? Pick<Medal, "id" | "langName1">
  : V extends "medal.edit"
  ? Pick<
      Medal,
      | "id"
      | "langName1"
      | "langName2"
      | "langName5"
      | "langName3"
      | "langName4"
      | "sort"
      | "langName"
      | "icon"
      | "template"
      | "medalConditions"
      | "childMedalConditions"
    >
  : never;
