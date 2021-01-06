import { StandardEntity } from "./sys$StandardEntity";
import { Enrollment } from "./tsadv$Enrollment";
import { FileDescriptor } from "./sys$FileDescriptor";
export class EnrollmentCertificateFile extends StandardEntity {
  static NAME = "tsadv$EnrollmentCertificateFile";
  enrollment?: Enrollment | null;
  certificateFile?: FileDescriptor | null;
}
export type EnrollmentCertificateFileViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "enrollmentCertificateFile.with.certificateFile";
export type EnrollmentCertificateFileView<
  V extends EnrollmentCertificateFileViewName
> = V extends "enrollmentCertificateFile.with.certificateFile"
  ? Pick<EnrollmentCertificateFile, "id" | "certificateFile">
  : never;
