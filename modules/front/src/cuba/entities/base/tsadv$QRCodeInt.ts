import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class QRCodeInt extends BaseUuidEntity {
  static NAME = "tsadv$QRCodeInt";
  fullName?: string | null;
  qrCode?: string | null;
  quantity?: string | null;
  image?: string | null;
  voucherUsed?: string | null;
  goodsName?: string | null;
}
export type QRCodeIntViewName = "_minimal" | "_local" | "_base";
export type QRCodeIntView<V extends QRCodeIntViewName> = never;
