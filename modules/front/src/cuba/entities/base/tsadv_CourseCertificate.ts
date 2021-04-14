import { StandardEntity } from "./sys$StandardEntity";
import { Report } from "./report$Report";
import { Course } from "./tsadv$Course";
export class CourseCertificate extends StandardEntity {
  static NAME = "tsadv_CourseCertificate";
  certificate?: Report | null;
  course?: Course | null;
  startDate?: any | null;
  endDate?: any | null;
}
export type CourseCertificateViewName = "_base" | "_local" | "_minimal";
export type CourseCertificateView<
  V extends CourseCertificateViewName
> = V extends "_base"
  ? Pick<CourseCertificate, "id" | "startDate" | "endDate">
  : V extends "_local"
  ? Pick<CourseCertificate, "id" | "startDate" | "endDate">
  : never;
