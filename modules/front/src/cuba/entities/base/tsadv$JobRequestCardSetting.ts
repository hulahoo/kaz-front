import { StandardEntity } from "./sys$StandardEntity";
import { UserExt } from "./tsadv$UserExt";
export class JobRequestCardSetting extends StandardEntity {
  static NAME = "tsadv$JobRequestCardSetting";
  property?: string | null;
  user?: UserExt | null;
  propertyValue?: boolean | null;
}
export type JobRequestCardSettingViewName = "_base" | "_local" | "_minimal";
export type JobRequestCardSettingView<
  V extends JobRequestCardSettingViewName
> = V extends "_base"
  ? Pick<JobRequestCardSetting, "id" | "property" | "propertyValue">
  : V extends "_local"
  ? Pick<JobRequestCardSetting, "id" | "property" | "propertyValue">
  : never;
