import { StandardEntity } from "./sys$StandardEntity";
import { FileDescriptor } from "./sys$FileDescriptor";
export class FirebaseConfig extends StandardEntity {
  static NAME = "mobile_FirebaseConfig";
  langValue1?: string | null;
  type?: any | null;
  order?: number | null;
  file?: FileDescriptor | null;
  description1?: string | null;
  langValue2?: string | null;
  description2?: string | null;
  langValue3?: string | null;
  description3?: string | null;
  langValue4?: string | null;
  description4?: string | null;
  langValue5?: string | null;
  description5?: string | null;
  code?: string | null;
  isSystemRecord?: boolean | null;
  customField2?: string | null;
  customField1?: string | null;
  langValue?: string | null;
  description?: string | null;
}
export type FirebaseConfigViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "firebaseConfig-browse"
  | "firebaseConfig-view";
export type FirebaseConfigView<
  V extends FirebaseConfigViewName
> = V extends "_base"
  ? Pick<
      FirebaseConfig,
      | "id"
      | "langValue1"
      | "type"
      | "order"
      | "description1"
      | "langValue2"
      | "description2"
      | "langValue3"
      | "description3"
      | "langValue4"
      | "description4"
      | "langValue5"
      | "description5"
      | "code"
      | "isSystemRecord"
      | "customField2"
      | "customField1"
    >
  : V extends "_local"
  ? Pick<
      FirebaseConfig,
      | "id"
      | "langValue1"
      | "type"
      | "order"
      | "description1"
      | "langValue2"
      | "description2"
      | "langValue3"
      | "description3"
      | "langValue4"
      | "description4"
      | "langValue5"
      | "description5"
      | "code"
      | "isSystemRecord"
      | "customField2"
      | "customField1"
    >
  : V extends "firebaseConfig-browse"
  ? Pick<
      FirebaseConfig,
      | "id"
      | "langValue1"
      | "type"
      | "order"
      | "description1"
      | "langValue2"
      | "description2"
      | "langValue3"
      | "description3"
      | "langValue4"
      | "description4"
      | "langValue5"
      | "description5"
      | "code"
      | "isSystemRecord"
      | "customField2"
      | "customField1"
      | "langValue"
      | "description"
    >
  : V extends "firebaseConfig-view"
  ? Pick<
      FirebaseConfig,
      | "id"
      | "langValue1"
      | "type"
      | "order"
      | "description1"
      | "langValue2"
      | "description2"
      | "langValue3"
      | "description3"
      | "langValue4"
      | "description4"
      | "langValue5"
      | "description5"
      | "code"
      | "isSystemRecord"
      | "customField2"
      | "customField1"
      | "file"
      | "langValue"
      | "description"
    >
  : never;
