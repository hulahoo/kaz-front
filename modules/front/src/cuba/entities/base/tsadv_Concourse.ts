import { AbstractParentEntity } from "./AbstractParentEntity";
import { TsadvUser } from "./tsadv$UserExt";
import { FileDescriptor } from "./sys$FileDescriptor";
import { MarkCriteria } from "./tsadv_MarkCriteria";
export class Concourse extends AbstractParentEntity {
  static NAME = "tsadv_Concourse";
  name_ru?: string | null;
  concourseStatus?: any | null;
  category?: any | null;
  judges?: TsadvUser[] | null;
  banner?: FileDescriptor | null;
  judgeInsturction?: string | null;
  requestTemplate?: FileDescriptor | null;
  markCriteria?: MarkCriteria[] | null;
  name_en?: string | null;
  year?: number | null;
  startVoting?: any | null;
  endVoting?: any | null;
  description?: string | null;
}
export type ConcourseViewName = "_base" | "_local" | "_minimal";
export type ConcourseView<V extends ConcourseViewName> = V extends "_base"
  ? Pick<
      Concourse,
      | "id"
      | "description"
      | "name_ru"
      | "concourseStatus"
      | "category"
      | "judgeInsturction"
      | "name_en"
      | "year"
      | "startVoting"
      | "endVoting"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Concourse,
      | "id"
      | "name_ru"
      | "concourseStatus"
      | "category"
      | "judgeInsturction"
      | "name_en"
      | "year"
      | "startVoting"
      | "endVoting"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<Concourse, "id" | "description">
  : never;
