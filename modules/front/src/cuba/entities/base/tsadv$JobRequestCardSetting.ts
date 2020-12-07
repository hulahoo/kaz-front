import { StandardEntity } from "./sys$StandardEntity";
import { UserExt } from "./base$UserExt";
export class JobRequestCardSetting extends StandardEntity {
  static NAME = "tsadv$JobRequestCardSetting";
  property?: string | null;
  user?: UserExt | null;
  propertyValue?: boolean | null;
}
export type JobRequestCardSettingViewName = "_minimal" | "_local" | "_base";
export type JobRequestCardSettingView<
  V extends JobRequestCardSettingViewName
> = V extends "_local"
  ? Pick<JobRequestCardSetting, "id" | "property" | "propertyValue">
  : V extends "_base"
  ? Pick<JobRequestCardSetting, "id" | "property" | "propertyValue">
  : never;
