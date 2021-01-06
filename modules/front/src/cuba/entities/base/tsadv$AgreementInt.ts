import { AbstractEntityInt } from "./tsadv$AbstractEntityInt";
export class AgreementInt extends AbstractEntityInt {
  static NAME = "tsadv$AgreementInt";
  agreementNumber?: string | null;
  agreementType?: string | null;
  dateFrom?: string | null;
  dateTo?: string | null;
  status?: string | null;
  personGroup?: string | null;
}
export type AgreementIntViewName = "_base" | "_local" | "_minimal";
export type AgreementIntView<V extends AgreementIntViewName> = V extends "_base"
  ? Pick<AgreementInt, "id">
  : V extends "_minimal"
  ? Pick<AgreementInt, "id">
  : never;
