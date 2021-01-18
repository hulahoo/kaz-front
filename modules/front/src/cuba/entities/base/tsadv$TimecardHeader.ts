import { AbstractParentEntity } from "./AbstractParentEntity";
import { AssignmentSchedule } from "./tsadv$AssignmentSchedule";
import { WorkedHoursSummary } from "./tsadv$WorkedHoursSummary";
import { AssignmentGroupExt } from "./base$AssignmentGroupExt";
import { DicPayroll } from "./tsadv$DicPayroll";
import { TimecardCorrection } from "./tsadv$TimecardCorrection";
export class TimecardHeader extends AbstractParentEntity {
  static NAME = "tsadv$TimecardHeader";
  assignmentSchedule?: AssignmentSchedule | null;
  workedHoursSummaries?: WorkedHoursSummary[] | null;
  assignmentGroup?: AssignmentGroupExt | null;
  payroll?: DicPayroll | null;
  periodStartDate?: any | null;
  periodEndDate?: any | null;
  effectiveStartDate?: any | null;
  effectiveEndDate?: any | null;
  documentVersion?: number | null;
  status?: any | null;
  type?: any | null;
  timecardCorrection?: TimecardCorrection | null;
  baseWorkHours?: any | null;
  baseWorkDays?: number | null;
  planWorkDays?: number | null;
  planWorkHours?: any | null;
  planWorkHoursPart?: any | null;
  factWorkDays?: number | null;
  factHoursWithoutOvertime?: any | null;
  weekendHours?: any | null;
  weekendDays?: number | null;
  dayHours?: any | null;
  nightHours?: any | null;
  holidayHours?: any | null;
  holidayDays?: number | null;
  annualVacationDays?: number | null;
  unpaidVacationDays?: number | null;
  maternityVacationDays?: number | null;
  childcareVacationDays?: number | null;
  sickDays?: number | null;
  absenceDays?: number | null;
  totalFreeDays?: number | null;
  busTripDays?: number | null;
  totalWorkedDays?: number | null;
  totalAbsence?: number | null;
  grandTotalDays?: number | null;
  overtimeHours?: any | null;
  attribute1?: string | null;
  attribute2?: string | null;
  attribute3?: string | null;
  attribute4?: string | null;
  attribute5?: string | null;
  attribute6?: string | null;
  attribute7?: string | null;
  attribute8?: string | null;
  attribute9?: string | null;
  attribute10?: string | null;
  attribute11?: string | null;
  attribute12?: string | null;
  attribute13?: string | null;
  attribute14?: string | null;
  attribute15?: string | null;
  attribute16?: string | null;
  attribute17?: string | null;
  attribute18?: string | null;
  attribute19?: string | null;
  attribute20?: string | null;
  attribute21?: string | null;
  attribute22?: string | null;
  attribute23?: string | null;
  attribute24?: string | null;
  attribute25?: string | null;
  attribute26?: string | null;
  attribute27?: string | null;
  attribute28?: string | null;
  attribute29?: string | null;
  attribute30?: string | null;
  attribute31?: string | null;
  attribute32?: string | null;
  attribute33?: string | null;
  attribute34?: string | null;
  attribute35?: string | null;
  attribute36?: string | null;
  attribute37?: string | null;
  attribute38?: string | null;
  attribute39?: string | null;
  attribute40?: string | null;
  attribute41?: string | null;
  attribute42?: string | null;
  attribute43?: string | null;
  attribute44?: string | null;
  attribute45?: string | null;
  attribute46?: string | null;
  attribute47?: string | null;
  attribute48?: string | null;
  attribute49?: string | null;
  attribute50?: string | null;
  attribute51?: string | null;
  attribute52?: string | null;
  attribute53?: string | null;
  attribute54?: string | null;
  attribute55?: string | null;
  attribute56?: string | null;
  attribute57?: string | null;
  attribute58?: string | null;
  attribute59?: string | null;
  attribute60?: string | null;
  attribute61?: string | null;
  attribute62?: string | null;
  attribute63?: string | null;
  attribute64?: string | null;
  attribute65?: string | null;
  attribute66?: string | null;
  attribute67?: string | null;
  attribute68?: string | null;
  attribute69?: string | null;
  attribute70?: string | null;
  attribute71?: string | null;
  attribute72?: string | null;
  attribute73?: string | null;
  attribute74?: string | null;
  attribute75?: string | null;
  attribute76?: string | null;
  attribute77?: string | null;
  attribute78?: string | null;
  attribute79?: string | null;
  attribute80?: string | null;
}
export type TimecardHeaderViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "timecardHeader-for-copy-timecard"
  | "timecardHeader-for-correction"
  | "timecardHeader-view"
  | "timecardHeader-with-assignment-group"
  | "timecardHeader-with-correction";
export type TimecardHeaderView<
  V extends TimecardHeaderViewName
> = V extends "_base"
  ? Pick<
      TimecardHeader,
      | "id"
      | "periodStartDate"
      | "periodEndDate"
      | "effectiveStartDate"
      | "effectiveEndDate"
      | "documentVersion"
      | "status"
      | "type"
      | "baseWorkHours"
      | "baseWorkDays"
      | "planWorkDays"
      | "planWorkHours"
      | "planWorkHoursPart"
      | "factWorkDays"
      | "factHoursWithoutOvertime"
      | "weekendHours"
      | "weekendDays"
      | "dayHours"
      | "nightHours"
      | "holidayHours"
      | "holidayDays"
      | "annualVacationDays"
      | "unpaidVacationDays"
      | "maternityVacationDays"
      | "childcareVacationDays"
      | "sickDays"
      | "absenceDays"
      | "totalFreeDays"
      | "busTripDays"
      | "totalWorkedDays"
      | "totalAbsence"
      | "grandTotalDays"
      | "overtimeHours"
      | "attribute1"
      | "attribute2"
      | "attribute3"
      | "attribute4"
      | "attribute5"
      | "attribute6"
      | "attribute7"
      | "attribute8"
      | "attribute9"
      | "attribute10"
      | "attribute11"
      | "attribute12"
      | "attribute13"
      | "attribute14"
      | "attribute15"
      | "attribute16"
      | "attribute17"
      | "attribute18"
      | "attribute19"
      | "attribute20"
      | "attribute21"
      | "attribute22"
      | "attribute23"
      | "attribute24"
      | "attribute25"
      | "attribute26"
      | "attribute27"
      | "attribute28"
      | "attribute29"
      | "attribute30"
      | "attribute31"
      | "attribute32"
      | "attribute33"
      | "attribute34"
      | "attribute35"
      | "attribute36"
      | "attribute37"
      | "attribute38"
      | "attribute39"
      | "attribute40"
      | "attribute41"
      | "attribute42"
      | "attribute43"
      | "attribute44"
      | "attribute45"
      | "attribute46"
      | "attribute47"
      | "attribute48"
      | "attribute49"
      | "attribute50"
      | "attribute51"
      | "attribute52"
      | "attribute53"
      | "attribute54"
      | "attribute55"
      | "attribute56"
      | "attribute57"
      | "attribute58"
      | "attribute59"
      | "attribute60"
      | "attribute61"
      | "attribute62"
      | "attribute63"
      | "attribute64"
      | "attribute65"
      | "attribute66"
      | "attribute67"
      | "attribute68"
      | "attribute69"
      | "attribute70"
      | "attribute71"
      | "attribute72"
      | "attribute73"
      | "attribute74"
      | "attribute75"
      | "attribute76"
      | "attribute77"
      | "attribute78"
      | "attribute79"
      | "attribute80"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      TimecardHeader,
      | "id"
      | "periodStartDate"
      | "periodEndDate"
      | "effectiveStartDate"
      | "effectiveEndDate"
      | "documentVersion"
      | "status"
      | "type"
      | "baseWorkHours"
      | "baseWorkDays"
      | "planWorkDays"
      | "planWorkHours"
      | "planWorkHoursPart"
      | "factWorkDays"
      | "factHoursWithoutOvertime"
      | "weekendHours"
      | "weekendDays"
      | "dayHours"
      | "nightHours"
      | "holidayHours"
      | "holidayDays"
      | "annualVacationDays"
      | "unpaidVacationDays"
      | "maternityVacationDays"
      | "childcareVacationDays"
      | "sickDays"
      | "absenceDays"
      | "totalFreeDays"
      | "busTripDays"
      | "totalWorkedDays"
      | "totalAbsence"
      | "grandTotalDays"
      | "overtimeHours"
      | "attribute1"
      | "attribute2"
      | "attribute3"
      | "attribute4"
      | "attribute5"
      | "attribute6"
      | "attribute7"
      | "attribute8"
      | "attribute9"
      | "attribute10"
      | "attribute11"
      | "attribute12"
      | "attribute13"
      | "attribute14"
      | "attribute15"
      | "attribute16"
      | "attribute17"
      | "attribute18"
      | "attribute19"
      | "attribute20"
      | "attribute21"
      | "attribute22"
      | "attribute23"
      | "attribute24"
      | "attribute25"
      | "attribute26"
      | "attribute27"
      | "attribute28"
      | "attribute29"
      | "attribute30"
      | "attribute31"
      | "attribute32"
      | "attribute33"
      | "attribute34"
      | "attribute35"
      | "attribute36"
      | "attribute37"
      | "attribute38"
      | "attribute39"
      | "attribute40"
      | "attribute41"
      | "attribute42"
      | "attribute43"
      | "attribute44"
      | "attribute45"
      | "attribute46"
      | "attribute47"
      | "attribute48"
      | "attribute49"
      | "attribute50"
      | "attribute51"
      | "attribute52"
      | "attribute53"
      | "attribute54"
      | "attribute55"
      | "attribute56"
      | "attribute57"
      | "attribute58"
      | "attribute59"
      | "attribute60"
      | "attribute61"
      | "attribute62"
      | "attribute63"
      | "attribute64"
      | "attribute65"
      | "attribute66"
      | "attribute67"
      | "attribute68"
      | "attribute69"
      | "attribute70"
      | "attribute71"
      | "attribute72"
      | "attribute73"
      | "attribute74"
      | "attribute75"
      | "attribute76"
      | "attribute77"
      | "attribute78"
      | "attribute79"
      | "attribute80"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "timecardHeader-for-copy-timecard"
  ? Pick<TimecardHeader, "id" | "assignmentSchedule">
  : V extends "timecardHeader-for-correction"
  ? Pick<TimecardHeader, "id" | "assignmentGroup" | "timecardCorrection">
  : V extends "timecardHeader-view"
  ? Pick<
      TimecardHeader,
      | "id"
      | "periodStartDate"
      | "periodEndDate"
      | "effectiveStartDate"
      | "effectiveEndDate"
      | "documentVersion"
      | "status"
      | "type"
      | "baseWorkHours"
      | "baseWorkDays"
      | "planWorkDays"
      | "planWorkHours"
      | "planWorkHoursPart"
      | "factWorkDays"
      | "factHoursWithoutOvertime"
      | "weekendHours"
      | "weekendDays"
      | "dayHours"
      | "nightHours"
      | "holidayHours"
      | "holidayDays"
      | "annualVacationDays"
      | "unpaidVacationDays"
      | "maternityVacationDays"
      | "childcareVacationDays"
      | "sickDays"
      | "absenceDays"
      | "totalFreeDays"
      | "busTripDays"
      | "totalWorkedDays"
      | "totalAbsence"
      | "grandTotalDays"
      | "overtimeHours"
      | "attribute1"
      | "attribute2"
      | "attribute3"
      | "attribute4"
      | "attribute5"
      | "attribute6"
      | "attribute7"
      | "attribute8"
      | "attribute9"
      | "attribute10"
      | "attribute11"
      | "attribute12"
      | "attribute13"
      | "attribute14"
      | "attribute15"
      | "attribute16"
      | "attribute17"
      | "attribute18"
      | "attribute19"
      | "attribute20"
      | "attribute21"
      | "attribute22"
      | "attribute23"
      | "attribute24"
      | "attribute25"
      | "attribute26"
      | "attribute27"
      | "attribute28"
      | "attribute29"
      | "attribute30"
      | "attribute31"
      | "attribute32"
      | "attribute33"
      | "attribute34"
      | "attribute35"
      | "attribute36"
      | "attribute37"
      | "attribute38"
      | "attribute39"
      | "attribute40"
      | "attribute41"
      | "attribute42"
      | "attribute43"
      | "attribute44"
      | "attribute45"
      | "attribute46"
      | "attribute47"
      | "attribute48"
      | "attribute49"
      | "attribute50"
      | "attribute51"
      | "attribute52"
      | "attribute53"
      | "attribute54"
      | "attribute55"
      | "attribute56"
      | "attribute57"
      | "attribute58"
      | "attribute59"
      | "attribute60"
      | "attribute61"
      | "attribute62"
      | "attribute63"
      | "attribute64"
      | "attribute65"
      | "attribute66"
      | "attribute67"
      | "attribute68"
      | "attribute69"
      | "attribute70"
      | "attribute71"
      | "attribute72"
      | "attribute73"
      | "attribute74"
      | "attribute75"
      | "attribute76"
      | "attribute77"
      | "attribute78"
      | "attribute79"
      | "attribute80"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "assignmentSchedule"
      | "assignmentGroup"
    >
  : V extends "timecardHeader-with-assignment-group"
  ? Pick<TimecardHeader, "id" | "assignmentGroup">
  : V extends "timecardHeader-with-correction"
  ? Pick<
      TimecardHeader,
      | "id"
      | "periodStartDate"
      | "periodEndDate"
      | "effectiveStartDate"
      | "effectiveEndDate"
      | "documentVersion"
      | "status"
      | "type"
      | "baseWorkHours"
      | "baseWorkDays"
      | "planWorkDays"
      | "planWorkHours"
      | "planWorkHoursPart"
      | "factWorkDays"
      | "factHoursWithoutOvertime"
      | "weekendHours"
      | "weekendDays"
      | "dayHours"
      | "nightHours"
      | "holidayHours"
      | "holidayDays"
      | "annualVacationDays"
      | "unpaidVacationDays"
      | "maternityVacationDays"
      | "childcareVacationDays"
      | "sickDays"
      | "absenceDays"
      | "totalFreeDays"
      | "busTripDays"
      | "totalWorkedDays"
      | "totalAbsence"
      | "grandTotalDays"
      | "overtimeHours"
      | "attribute1"
      | "attribute2"
      | "attribute3"
      | "attribute4"
      | "attribute5"
      | "attribute6"
      | "attribute7"
      | "attribute8"
      | "attribute9"
      | "attribute10"
      | "attribute11"
      | "attribute12"
      | "attribute13"
      | "attribute14"
      | "attribute15"
      | "attribute16"
      | "attribute17"
      | "attribute18"
      | "attribute19"
      | "attribute20"
      | "attribute21"
      | "attribute22"
      | "attribute23"
      | "attribute24"
      | "attribute25"
      | "attribute26"
      | "attribute27"
      | "attribute28"
      | "attribute29"
      | "attribute30"
      | "attribute31"
      | "attribute32"
      | "attribute33"
      | "attribute34"
      | "attribute35"
      | "attribute36"
      | "attribute37"
      | "attribute38"
      | "attribute39"
      | "attribute40"
      | "attribute41"
      | "attribute42"
      | "attribute43"
      | "attribute44"
      | "attribute45"
      | "attribute46"
      | "attribute47"
      | "attribute48"
      | "attribute49"
      | "attribute50"
      | "attribute51"
      | "attribute52"
      | "attribute53"
      | "attribute54"
      | "attribute55"
      | "attribute56"
      | "attribute57"
      | "attribute58"
      | "attribute59"
      | "attribute60"
      | "attribute61"
      | "attribute62"
      | "attribute63"
      | "attribute64"
      | "attribute65"
      | "attribute66"
      | "attribute67"
      | "attribute68"
      | "attribute69"
      | "attribute70"
      | "attribute71"
      | "attribute72"
      | "attribute73"
      | "attribute74"
      | "attribute75"
      | "attribute76"
      | "attribute77"
      | "attribute78"
      | "attribute79"
      | "attribute80"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "timecardCorrection"
      | "assignmentGroup"
    >
  : never;
