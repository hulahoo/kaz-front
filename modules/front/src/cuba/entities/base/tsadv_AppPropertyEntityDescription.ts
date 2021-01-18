import { StandardEntity } from "./sys$StandardEntity";
export class AppPropertyEntityDescription extends StandardEntity {
  static NAME = "tsadv_AppPropertyEntityDescription";
  value?: string | null;
  appPropertyName?: string | null;
}
export type AppPropertyEntityDescriptionViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "appPropertyEntityDescription-view";
export type AppPropertyEntityDescriptionView<
  V extends AppPropertyEntityDescriptionViewName
> = V extends "_base"
  ? Pick<AppPropertyEntityDescription, "id" | "value" | "appPropertyName">
  : V extends "_local"
  ? Pick<AppPropertyEntityDescription, "id" | "value" | "appPropertyName">
  : V extends "_minimal"
  ? Pick<AppPropertyEntityDescription, "id" | "value">
  : V extends "appPropertyEntityDescription-view"
  ? Pick<AppPropertyEntityDescription, "id" | "value" | "appPropertyName">
  : never;
