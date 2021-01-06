import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicCurrency } from "./base$DicCurrency";
import { DicExchangeRateType } from "./base$DicExchangeRateType";
export class ExchangeRate extends AbstractParentEntity {
  static NAME = "base$ExchangeRate";
  fromCurrency?: DicCurrency | null;
  type?: DicExchangeRateType | null;
  toCurrency?: DicCurrency | null;
  date?: any | null;
  value?: any | null;
}
export type ExchangeRateViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "exchangeRate.edit";
export type ExchangeRateView<V extends ExchangeRateViewName> = V extends "_base"
  ? Pick<
      ExchangeRate,
      | "id"
      | "date"
      | "value"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      ExchangeRate,
      | "id"
      | "date"
      | "value"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "exchangeRate.edit"
  ? Pick<
      ExchangeRate,
      | "id"
      | "date"
      | "value"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "fromCurrency"
      | "type"
      | "toCurrency"
    >
  : never;
