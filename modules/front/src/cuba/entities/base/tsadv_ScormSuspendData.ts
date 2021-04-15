import { StandardEntity } from "./sys$StandardEntity";
import { Enrollment } from "./tsadv$Enrollment";
import { CourseSection } from "./tsadv$CourseSection";
export class ScormSuspendData extends StandardEntity {
  static NAME = "tsadv_ScormSuspendData";
  enrollment?: Enrollment | null;
  courseSection?: CourseSection | null;
  suspendData?: string | null;
}
export type ScormSuspendDataViewName = "_base" | "_local" | "_minimal";
export type ScormSuspendDataView<
  V extends ScormSuspendDataViewName
> = V extends "_base"
  ? Pick<ScormSuspendData, "id" | "suspendData">
  : V extends "_local"
  ? Pick<ScormSuspendData, "id" | "suspendData">
  : never;
