import { AbstractTimeBasedEntity } from "./AbstractTimeBasedEntity";
import { Job } from "./tsadv$Job";
export class InfoSalaryMarket extends AbstractTimeBasedEntity {
  static NAME = "tsadv$InfoSalaryMarket";
  min?: number | null;
  mid?: number | null;
  max?: number | null;
  mediana?: number | null;
  kvart1?: number | null;
  kvart2?: number | null;
  kvart3?: number | null;
  kvart4?: number | null;
  job?: Job | null;
}
export type InfoSalaryMarketViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "infoSalaryMarket.browse";
export type InfoSalaryMarketView<
  V extends InfoSalaryMarketViewName
> = V extends "_local"
  ? Pick<
      InfoSalaryMarket,
      | "id"
      | "min"
      | "mid"
      | "max"
      | "mediana"
      | "kvart1"
      | "kvart2"
      | "kvart3"
      | "kvart4"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "_base"
  ? Pick<
      InfoSalaryMarket,
      | "id"
      | "min"
      | "mid"
      | "max"
      | "mediana"
      | "kvart1"
      | "kvart2"
      | "kvart3"
      | "kvart4"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "infoSalaryMarket.browse"
  ? Pick<
      InfoSalaryMarket,
      | "id"
      | "min"
      | "mid"
      | "max"
      | "mediana"
      | "kvart1"
      | "kvart2"
      | "kvart3"
      | "kvart4"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : never;
