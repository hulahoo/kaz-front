import { StandardEntity } from "./base/sys$StandardEntity";
import { FileDescriptor } from "./base/sys$FileDescriptor";
export class Concourse extends StandardEntity {
  static NAME = "kzm_Concourse";
  nameRu?: string | null;
  startVoting?: any | null;
  endVoting?: any | null;
  year?: string | null;
  banner?: FileDescriptor | null;
  requestTemplate?: FileDescriptor | null;
  judgeInstruction?: string | null;
  nameEn?: string | null;
  description?: string | null;
}
export type ConcourseViewName = "_base" | "_local" | "_minimal";
export type ConcourseView<V extends ConcourseViewName> = V extends "_base"
  ? Pick<
      Concourse,
      | "id"
      | "description"
      | "nameRu"
      | "startVoting"
      | "endVoting"
      | "year"
      | "judgeInstruction"
      | "nameEn"
    >
  : V extends "_local"
  ? Pick<
      Concourse,
      | "id"
      | "nameRu"
      | "startVoting"
      | "endVoting"
      | "year"
      | "judgeInstruction"
      | "nameEn"
      | "description"
    >
  : V extends "_minimal"
  ? Pick<Concourse, "id" | "description">
  : never;
