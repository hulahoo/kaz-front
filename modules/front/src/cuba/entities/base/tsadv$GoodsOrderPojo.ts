import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class GoodsOrderPojo extends BaseUuidEntity {
  static NAME = "tsadv$GoodsOrderPojo";
  orderNumber?: string | null;
  dateTime?: string | null;
  sum?: any | null;
  status?: string | null;
  statusCode?: string | null;
  fullName?: string | null;
  voucherUsed?: string | null;
  voucherQRCode?: string | null;
  personGroupId?: string | null;
}
export type GoodsOrderPojoViewName = "_base" | "_local" | "_minimal";
export type GoodsOrderPojoView<V extends GoodsOrderPojoViewName> = never;
