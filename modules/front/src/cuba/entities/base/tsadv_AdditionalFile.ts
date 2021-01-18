import { AbstractParentEntity } from "./AbstractParentEntity";
import { FileDescriptor } from "./sys$FileDescriptor";
export class AdditionalFile extends AbstractParentEntity {
  static NAME = "tsadv_AdditionalFile";
  file?: FileDescriptor | null;
  relationEntityId?: any | null;
}
export type AdditionalFileViewName = "_base" | "_local" | "_minimal";
export type AdditionalFileView<
  V extends AdditionalFileViewName
> = V extends "_base"
  ? Pick<
      AdditionalFile,
      | "id"
      | "file"
      | "relationEntityId"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      AdditionalFile,
      | "id"
      | "relationEntityId"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<AdditionalFile, "id" | "file">
  : never;
