import { StandardEntity } from "./sys$StandardEntity";
export class VacationGraphic extends StandardEntity {
  static NAME = "tsadv_VacationGraphic";
  requestNumber?: any | null;
  name?: string | null;
  surname?: string | null;
  middlename?: string | null;
  division?: string | null;
  duty?: string | null;
  startDate?: any | null;
  endDate?: any | null;
  comments?: string | null;
  isSendToOracle?: boolean | null;
  nameSurnameMiddlename?: string | null;
}
export type VacationGraphicViewName = "_base" | "_local" | "_minimal";
export type VacationGraphicView<
  V extends VacationGraphicViewName
> = V extends "_base"
  ? Pick<
      VacationGraphic,
      | "id"
      | "name"
      | "requestNumber"
      | "surname"
      | "middlename"
      | "division"
      | "duty"
      | "startDate"
      | "endDate"
      | "comments"
      | "isSendToOracle"
    >
  : V extends "_local"
  ? Pick<
      VacationGraphic,
      | "id"
      | "requestNumber"
      | "name"
      | "surname"
      | "middlename"
      | "division"
      | "duty"
      | "startDate"
      | "endDate"
      | "comments"
      | "isSendToOracle"
    >
  : V extends "_minimal"
  ? Pick<VacationGraphic, "id" | "name">
  : never;
