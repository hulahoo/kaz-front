import { AbstractEntityInt } from "./tsadv$AbstractEntityInt";
export class JobRequestInt extends AbstractEntityInt {
  static NAME = "tsadv$JobRequestInt";
  requestDate?: string | null;
  requestStatus?: string | null;
  requisition?: any | null;
  requisitionCode?: string | null;
  requisitionJob?: string | null;
  videoFile?: any | null;
  source?: any | null;
  otherSource?: string | null;
}
export type JobRequestIntViewName = "_minimal" | "_local" | "_base";
export type JobRequestIntView<
  V extends JobRequestIntViewName
> = V extends "_minimal"
  ? Pick<JobRequestInt, "id">
  : V extends "_base"
  ? Pick<JobRequestInt, "id">
  : never;
