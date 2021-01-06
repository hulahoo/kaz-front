import { StandardEntity } from "./sys$StandardEntity";
import { TemplateReport } from "./emailtemplates$TemplateReport";
export class ParameterValue extends StandardEntity {
  static NAME = "emailtemplates$ParameterValue";
  parameterType?: any | null;
  alias?: string | null;
  defaultValue?: string | null;
  templateParameters?: TemplateReport | null;
}
export type ParameterValueViewName = "_base" | "_local" | "_minimal";
export type ParameterValueView<
  V extends ParameterValueViewName
> = V extends "_base"
  ? Pick<ParameterValue, "id" | "parameterType" | "alias" | "defaultValue">
  : V extends "_local"
  ? Pick<ParameterValue, "id" | "parameterType" | "alias" | "defaultValue">
  : V extends "_minimal"
  ? Pick<ParameterValue, "id" | "parameterType" | "alias" | "defaultValue">
  : never;
