import { AbstractEntityInt } from "./tsadv$AbstractEntityInt";
import { QuestionInt } from "./tsadv$QuestionInt";
export class QuestionnaireInt extends AbstractEntityInt {
  static NAME = "tsadv$QuestionnaireInt";
  name?: string | null;
  questions?: QuestionInt | null;
  instruction?: string | null;
}
export type QuestionnaireIntViewName = "_minimal" | "_local" | "_base";
export type QuestionnaireIntView<
  V extends QuestionnaireIntViewName
> = V extends "_minimal"
  ? Pick<QuestionnaireInt, "id">
  : V extends "_base"
  ? Pick<QuestionnaireInt, "id">
  : never;
