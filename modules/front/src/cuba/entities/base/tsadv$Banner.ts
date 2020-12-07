import { StandardEntity } from "./sys$StandardEntity";
import { FileDescriptor } from "./sys$FileDescriptor";
export class Banner extends StandardEntity {
  static NAME = "tsadv$Banner";
  page?: string | null;
  imageLang1?: FileDescriptor | null;
  imageLang2?: FileDescriptor | null;
  imageLang3?: FileDescriptor | null;
  active?: boolean | null;
}
export type BannerViewName = "_minimal" | "_local" | "_base" | "banner.edit";
export type BannerView<V extends BannerViewName> = V extends "_local"
  ? Pick<Banner, "id" | "page" | "active">
  : V extends "_base"
  ? Pick<Banner, "id" | "page" | "active">
  : V extends "banner.edit"
  ? Pick<
      Banner,
      "id" | "page" | "active" | "imageLang1" | "imageLang2" | "imageLang3"
    >
  : never;
