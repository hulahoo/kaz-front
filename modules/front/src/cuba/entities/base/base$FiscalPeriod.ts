import { StandardEntity } from "./sys$StandardEntity";
import { FiscalYear } from "./base$FiscalYear";
export class FiscalPeriod extends StandardEntity {
  static NAME = "base$FiscalPeriod";
  year?: FiscalYear | null;
  name?: string | null;
  startDate?: any | null;
  endDate?: any | null;
}
export type FiscalPeriodViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "fiscalPeriod.browse";
export type FiscalPeriodView<
  V extends FiscalPeriodViewName
> = V extends "_minimal"
  ? Pick<FiscalPeriod, "id" | "name">
  : V extends "_local"
  ? Pick<FiscalPeriod, "id" | "name" | "startDate" | "endDate">
  : V extends "_base"
  ? Pick<FiscalPeriod, "id" | "name" | "startDate" | "endDate">
  : V extends "fiscalPeriod.browse"
  ? Pick<FiscalPeriod, "id" | "name" | "startDate" | "endDate" | "year">
  : never;
