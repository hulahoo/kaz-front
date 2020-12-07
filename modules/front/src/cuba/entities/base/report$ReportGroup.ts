import { StandardEntity } from "./sys$StandardEntity";
export class ReportGroup extends StandardEntity {
  static NAME = "report$ReportGroup";
  title?: string | null;
  code?: string | null;
  localeNames?: string | null;
  locName?: string | null;
  systemFlag?: boolean | null;
}
export type ReportGroupViewName = "_minimal" | "_local" | "_base";
export type ReportGroupView<
  V extends ReportGroupViewName
> = V extends "_minimal"
  ? Pick<ReportGroup, "id" | "title" | "localeNames">
  : V extends "_local"
  ? Pick<
      ReportGroup,
      "id" | "title" | "code" | "localeNames" | "locName" | "systemFlag"
    >
  : V extends "_base"
  ? Pick<
      ReportGroup,
      "id" | "title" | "localeNames" | "code" | "locName" | "systemFlag"
    >
  : never;
