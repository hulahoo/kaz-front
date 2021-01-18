import { StandardEntity } from "./sys$StandardEntity";
export class RecognitionProvider extends StandardEntity {
  static NAME = "tsadv$RecognitionProvider";
  providerNameLang1?: string | null;
  providerNameLang2?: string | null;
  providerNameLang3?: string | null;
  contactInfo?: string | null;
  addressLang1?: string | null;
  addressLang2?: string | null;
  addressLang3?: string | null;
}
export type RecognitionProviderViewName = "_base" | "_local" | "_minimal";
export type RecognitionProviderView<
  V extends RecognitionProviderViewName
> = V extends "_base"
  ? Pick<
      RecognitionProvider,
      | "id"
      | "addressLang1"
      | "providerNameLang1"
      | "providerNameLang2"
      | "providerNameLang3"
      | "contactInfo"
      | "addressLang2"
      | "addressLang3"
    >
  : V extends "_local"
  ? Pick<
      RecognitionProvider,
      | "id"
      | "providerNameLang1"
      | "providerNameLang2"
      | "providerNameLang3"
      | "contactInfo"
      | "addressLang1"
      | "addressLang2"
      | "addressLang3"
    >
  : V extends "_minimal"
  ? Pick<RecognitionProvider, "id" | "addressLang1">
  : never;
