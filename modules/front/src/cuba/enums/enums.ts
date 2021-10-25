export enum VideoFileConvertStatus {
  TO_CONVERT = "TO_CONVERT",
  CONVERTED_SUCCESS = "CONVERTED_SUCCESS",
  CONVERTED_ERROR = "CONVERTED_ERROR"
}

export enum BooleanEnum {
  TRUE = "TRUE",
  FALSE = "FALSE"
}

export enum CompletionStatus {
  SUCCESS = "SUCCESS",
  WARNING = "WARNING",
  ERROR = "ERROR"
}

export enum LearningHistoryType {
  IN_THE_SYSTEM = "IN_THE_SYSTEM",
  OUT_THE_SYSTEM = "OUT_THE_SYSTEM"
}

export enum HiringStepType {
  test = "test",
  interview = "interview"
}

export enum RuleStatus {
  DISABLE = "DISABLE",
  WARNING = "WARNING",
  ERROR = "ERROR"
}

export enum ImportLogLevel {
  LOG = "LOG",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS"
}

export enum LogRecordLevel {
  ERROR = "ERROR",
  WARN = "WARN",
  DEBUG = "DEBUG",
  INFO = "INFO"
}

export enum BookType {
  PDF = "PDF",
  DJVU = "DJVU"
}

export enum CertificationCalculateType {
  FIRST_ATTEMPT = "FIRST_ATTEMPT",
  LAST_DATE = "LAST_DATE"
}

export enum CertificationPeriod {
  QUARTER = "QUARTER",
  HALF_YEAR = "HALF_YEAR",
  YEAR = "YEAR",
  EVERY_TWO_YEAR = "EVERY_TWO_YEAR",
  EVERY_THREE_YEAR = "EVERY_THREE_YEAR",
  WEEK = "WEEK"
}

export enum CertificationStatus {
  ACTIVE = "ACTIVE",
  PAST = "PAST"
}

export enum ContentType {
  URL = "URL",
  VIDEO = "VIDEO",
  PDF = "PDF",
  FILE = "FILE",
  HTML = "HTML",
  TEXT = "TEXT",
  SCORM_ZIP = "SCORM_ZIP"
}

export enum CourseSectionFormat {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  WEBINAR = "WEBINAR"
}

export enum EnrollmentStatus {
  REQUEST = "REQUEST",
  WAITLIST = "WAITLIST",
  APPROVED = "APPROVED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
  REQUIRED_SETTING = "REQUIRED_SETTING"
}

export enum FeedbackResponsibleRole {
  LEARNER = "LEARNER",
  MANAGER = "MANAGER",
  TRAINER = "TRAINER"
}

export enum LearningFeedbackQuestionType {
  TEXT = "TEXT",
  ONE = "ONE",
  MANY = "MANY",
  NUM = "NUM"
}

export enum LearningFeedbackUsageType {
  COURSE = "COURSE",
  TRAINER = "TRAINER"
}

export enum IdpStatus {
  DRAFT = "DRAFT",
  APPROVED = "APPROVED",
  CLOSED = "CLOSED"
}

export enum KmsTestPurpose {
  ATTESTATION = "ATTESTATION",
  PROF_KNOWLEDGE = "PROF_KNOWLEDGE",
  RECRUITING = "RECRUITING"
}

export enum Language {
  ru = "ru",
  kz = "kz",
  en = "en"
}

export enum LmsSliderPosition {
  HOME = "HOME"
}

export enum Months {
  JANUARY = "JANUARY",
  FEBRUARY = "FEBRUARY",
  MARCH = "MARCH",
  APRIL = "APRIL",
  MAY = "MAY",
  JUNE = "JUNE",
  JULY = "JULY",
  AUGUST = "AUGUST",
  SEPTEMBER = "SEPTEMBER",
  OCTOBER = "OCTOBER",
  NOVEMBER = "NOVEMBER",
  DECEMBER = "DECEMBER"
}

export enum QuestionType {
  TEXT = "TEXT",
  ONE = "ONE",
  MANY = "MANY",
  NUM = "NUM"
}

export enum TestSectionOrder {
  FIX = "FIX",
  RANDOM = "RANDOM"
}

export enum AssignedGoalTypeEnum {
  LIBRARY = "LIBRARY",
  CASCADE = "CASCADE",
  INDIVIDUAL = "INDIVIDUAL"
}

export enum BudgetHeaderStatus {
  DRAFT = "DRAFT",
  ON_AGREEMENT = "ON_AGREEMENT",
  APPROVED = "APPROVED",
  OBSOLETE = "OBSOLETE",
  AGREED = "AGREED",
  ON_APPROVAL = "ON_APPROVAL"
}

export enum BudgetRequestItemEnum {
  PERSON_COUNT = "PERSON_COUNT",
  BUS_TRIP_COUNT = "BUS_TRIP_COUNT",
  BUS_TRIP_AMOUNT = "BUS_TRIP_AMOUNT",
  ALL_AMOUNT = "ALL_AMOUNT"
}

export enum CardStatusEnum {
  DRAFT = "DRAFT",
  COMPLETED = "COMPLETED",
  ASSESSMENT = "ASSESSMENT"
}

export enum AnalyticsTypeEnum {
  String = "String",
  Number = "Number",
  Date = "Date",
  Boolean = "Boolean",
  Dictionary = "Dictionary"
}

export enum ArticleAttribute {
  DISMISSAL = "DISMISSAL",
  PUNISHMENT = "PUNISHMENT"
}

export enum BusinessTripOrderStatus {
  CHANGED = "CHANGED",
  CANCELED = "CANCELED",
  PLANNED = "PLANNED",
  APPROVED = "APPROVED"
}

export enum BusinessTripOrderType {
  RECALL = "RECALL",
  TRANSFER = "TRANSFER",
  EXTENDED = "EXTENDED",
  ADDITIONALCHANGE = "ADDITIONALCHANGE"
}

export enum CompetenceAssessmentStatus {
  DRAFT = "DRAFT",
  ONAPPROVAL = "ONAPPROVAL",
  APPROVED = "APPROVED"
}

export enum ElementTypeForGoals {
  ORGANIZATION = "ORGANIZATION",
  POSITION = "POSITION",
  JOB = "JOB"
}

export enum GrossNet {
  GROSS = "GROSS",
  NET = "NET"
}

export enum PositionChangeRequestType {
  NEW = "NEW",
  CHANGE = "CHANGE",
  CLOSE = "CLOSE"
}

export enum RelativeType {
  EMPLOYEE = "EMPLOYEE",
  MEMBER = "MEMBER"
}

export enum SalaryType {
  monthlyRate = "monthlyRate",
  hourlyRate = "hourlyRate"
}

export enum VacationDurationType {
  CALENDAR = "CALENDAR",
  WORK = "WORK"
}

export enum YesNoEnum {
  YES = "YES",
  NO = "NO"
}

export enum SurChargePeriod {
  PERIODIC = "PERIODIC",
  ONEOFF = "ONEOFF"
}

export enum SurChargeType {
  AMOUNT = "AMOUNT",
  PERCENT = "PERCENT"
}

export enum PersonalProtectionEquipmentStatus {
  ISSUED_BY = "ISSUED_BY",
  RETURN = "RETURN",
  LOST = "LOST",
  NOT_AVAILABLE = "NOT_AVAILABLE",
  ARE_AVAILABLE = "ARE_AVAILABLE"
}

export enum AwardStatus {
  NOMINATED = "NOMINATED",
  SHORTLIST = "SHORTLIST",
  AWARDED = "AWARDED",
  DRAFT = "DRAFT"
}

export enum GoodsOrderStatus {
  ON_APPROVAL = "ON_APPROVAL",
  REJECTED = "REJECTED",
  WAIT_DELIVERY = "WAIT_DELIVERY",
  DELIVERED = "DELIVERED"
}

export enum LogActionType {
  RECEIVE_RECOGNITION = "RECEIVE_RECOGNITION",
  SEND_RECOGNITION = "SEND_RECOGNITION",
  ADDED_PHOTO = "ADDED_PHOTO",
  RECEIVE_HEART_COIN = "RECEIVE_HEART_COIN",
  SEND_HEART_COIN = "SEND_HEART_COIN",
  ADDED_PREFERENCE = "ADDED_PREFERENCE",
  RECEIVE_SYSTEM_POINT = "RECEIVE_SYSTEM_POINT"
}

export enum PointOperationType {
  RECEIPT = "RECEIPT",
  ISSUE = "ISSUE"
}

export enum RcgAnswerType {
  ICON = "ICON",
  RADIO = "RADIO"
}

export enum RecognitionCoinType {
  COIN = "COIN",
  POINT = "POINT"
}

export enum RcgFeedbackDirection {
  SEND = "SEND",
  REQUEST = "REQUEST",
  ANSWERED = "ANSWERED"
}

export enum OrganizationGenerationType {
  FULL = "FULL",
  MANAGER = "MANAGER"
}

export enum CompetenceCriticalness {
  CRITICAL = "CRITICAL",
  DESIRABLE = "DESIRABLE"
}

export enum HS_AttemptsControlLevel {
  CANDIDATE = "CANDIDATE",
  VACANCY = "VACANCY"
}

export enum HS_Periods {
  DAY = "DAY",
  WEEK = "WEEK",
  QUARTER = "QUARTER",
  MONTH = "MONTH",
  HALF_YEAR = "HALF_YEAR",
  YEAR = "YEAR"
}

export enum InterviewStatus {
  DRAFT = "DRAFT",
  ON_APPROVAL = "ON_APPROVAL",
  PLANNED = "PLANNED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  FAILED = "FAILED"
}

export enum JobRequestStatus {
  DRAFT = "DRAFT",
  ON_APPROVAL = "ON_APPROVAL",
  REJECTED = "REJECTED",
  INTERVIEW = "INTERVIEW",
  MADE_OFFER = "MADE_OFFER",
  HIRED = "HIRED",
  SELECTED = "SELECTED",
  FROM_RESERVE = "FROM_RESERVE"
}

export enum OfferStatus {
  DRAFT = "DRAFT",
  ONAPPROVAL = "ONAPPROVAL",
  APPROVED = "APPROVED",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED"
}

export enum RcAnswerResult {
  PASS = "PASS",
  NOT_PASS = "NOT_PASS",
  VERIFY = "VERIFY"
}

export enum RcAnswerType {
  SINGLE = "SINGLE",
  MULTI = "MULTI",
  TEXT = "TEXT",
  DATE = "DATE",
  NUMBER = "NUMBER"
}

export enum RcQuestionType {
  SELECTION = "SELECTION",
  ASSESSMENT = "ASSESSMENT",
  COMPETENCE = "COMPETENCE",
  TEST_RESULT = "TEST_RESULT",
  PRE_SCREEN = "PRE_SCREEN"
}

export enum RequisitionAccessLevel {
  READ = "READ",
  EDIT = "EDIT"
}

export enum RequisitionStatus {
  OPEN = "OPEN",
  CANCELED = "CANCELED",
  CLOSED = "CLOSED",
  ON_APPROVAL = "ON_APPROVAL",
  CLOSED_MANUALLY = "CLOSED_MANUALLY",
  FINISH_COLLECT = "FINISH_COLLECT",
  DRAFT = "DRAFT"
}

export enum RequisitionType {
  STANDARD = "STANDARD",
  TEMPLATE = "TEMPLATE"
}

export enum DayType {
  HOLIDAY = "HOLIDAY",
  WEEKEND = "WEEKEND",
  TRANSFER = "TRANSFER",
  OFFICIAL_WEEKEND = "OFFICIAL_WEEKEND"
}

export enum DeviationChangingTypeEnum {
  FROM_BEGIN = "FROM_BEGIN",
  FROM_END = "FROM_END"
}

export enum MaterialDesignColorsEnum {}

export enum ScheduleTypeEnum {
  NORMATIVE = "NORMATIVE",
  WATCH = "WATCH",
  SHIFT_WORK = "SHIFT_WORK"
}

export enum TimecardHeaderStatusEnum {
  DRAFT = "DRAFT",
  BLOCKED = "BLOCKED",
  ONAPPROVAL = "ONAPPROVAL",
  ACCEPTED = "ACCEPTED"
}

export enum TimecardHeaderTypeEnum {
  FACT = "FACT",
  PLAN = "PLAN",
  BASE = "BASE"
}

export enum PunishmentRequestType {
  ASSIGNMENT = "ASSIGNMENT",
  REMOVAL = "REMOVAL"
}
