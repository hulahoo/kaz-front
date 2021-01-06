import { AbstractParentEntity } from "./AbstractParentEntity";
import { FileDescriptor } from "./sys$FileDescriptor";
export class VideoFileForPlay extends AbstractParentEntity {
  static NAME = "tsadv$VideoFileForPlay";
  source?: FileDescriptor | null;
  outputFile?: FileDescriptor | null;
  status?: any | null;
}
export type VideoFileForPlayViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "video-file-for-play";
export type VideoFileForPlayView<
  V extends VideoFileForPlayViewName
> = V extends "_base"
  ? Pick<
      VideoFileForPlay,
      | "id"
      | "source"
      | "status"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      VideoFileForPlay,
      "id" | "status" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<VideoFileForPlay, "id" | "source">
  : V extends "video-file-for-play"
  ? Pick<
      VideoFileForPlay,
      | "id"
      | "status"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "source"
      | "outputFile"
    >
  : never;
