import { PersonGroup } from "./base$PersonGroup";
import { PersonExt } from "./base$PersonExt";
import { Retirement } from "./tsadv$Retirement";
import { Disability } from "./tsadv$Disability";
import { MilitaryForm } from "./tsadv$MilitaryForm";
import { CompetenceElement } from "./tsadv$CompetenceElement";
import { AssignmentExt } from "./base$AssignmentExt";
import { PersonContact } from "./tsadv$PersonContact";
import { PersonDocument } from "./tsadv$PersonDocument";
import { Assessment } from "./tsadv$Assessment";
import { PersonEducation } from "./tsadv$PersonEducation";
import { PersonExperience } from "./tsadv$PersonExperience";
import { PersonAttachment } from "./tsadv$PersonAttachment";
import { JobRequest } from "./tsadv$JobRequest";
import { SuccessionPlanning } from "./tsadv$SuccessionPlanning";
import { BusinessTrip } from "./tsadv$BusinessTrip";
import { Agreement } from "./tsadv$Agreement";
import { Dismissal } from "./tsadv$Dismissal";
import { Case } from "./tsadv$Case";
import { PersonReview } from "./tsadv$PersonReview";
import { Address } from "./tsadv$Address";
import { StudentGrant } from "./tsadv$StudentGrant";
import { ReLocation } from "./tsadv$ReLocation";
import { PersonExpectedSalary } from "./tsadv$PersonExpectedSalary";
import { Beneficiary } from "./tsadv$Beneficiary";
import { IndividualDevelopmentPlan } from "./tsadv$IndividualDevelopmentPlan";
import { Internship } from "./tsadv$Internship";
import { Enrollment } from "./tsadv$Enrollment";
import { Attestation } from "./tsadv$Attestation";
import { CandidateRequirement } from "./tsadv$CandidateRequirement";
import { DicCompany } from "./base_DicCompany";
export class PersonGroupExt extends PersonGroup {
  static NAME = "base$PersonGroupExt";
  list?: PersonExt[] | null;
  retirement?: Retirement[] | null;
  disability?: Disability[] | null;
  militaryRank?: MilitaryForm[] | null;
  person?: PersonExt | null;
  relevantPerson?: PersonExt | null;
  competenceElements?: CompetenceElement[] | null;
  assignments?: AssignmentExt[] | null;
  personContacts?: PersonContact[] | null;
  personDocuments?: PersonDocument[] | null;
  assessments?: Assessment[] | null;
  personEducation?: PersonEducation[] | null;
  personExperience?: PersonExperience[] | null;
  personAttachment?: PersonAttachment[] | null;
  jobRequests?: JobRequest[] | null;
  successionPlanning?: SuccessionPlanning[] | null;
  businessTrip?: BusinessTrip[] | null;
  agreements?: Agreement[] | null;
  dismissals?: Dismissal[] | null;
  cases?: Case[] | null;
  reviews?: PersonReview[] | null;
  likeCount?: any | null;
  disLikeCount?: any | null;
  addresses?: Address[] | null;
  studentGrants?: StudentGrant[] | null;
  relocation?: ReLocation[] | null;
  expectedSalary?: PersonExpectedSalary[] | null;
  linkedinAccessToken?: string | null;
  linkedinProfileLink?: string | null;
  linkedinTokenExpiresInDate?: any | null;
  beneficiary?: Beneficiary[] | null;
  individualDevelopmentPlan?: IndividualDevelopmentPlan[] | null;
  internship?: Internship[] | null;
  enrollment?: Enrollment[] | null;
  attestation?: Attestation[] | null;
  candidateRequirement?: CandidateRequirement[] | null;
  company?: DicCompany | null;
  totalExperience?: any | null;
  personFioWithEmployeeNumber?: string | null;
  activeAssessment?: Assessment | null;
  currentAssignment?: AssignmentExt | null;
  currentAssignmentWithSuspendedAndTerminatedStatus?: AssignmentExt | null;
  currentAssignmentWithSuspendedStatus?: AssignmentExt | null;
  primaryAssignment?: AssignmentExt | null;
  fullName?: string | null;
  firstLastName?: string | null;
  fioWithEmployeeNumber?: string | null;
  personLatinFioWithEmployeeNumber?: string | null;
  personFirstLastNameLatin?: string | null;
}
export type PersonGroupExtViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "assignment.card.personGroup"
  | "person-group-ext-intern"
  | "personGroup-for-absenceRequest"
  | "personGroup-relevantPerson-fullNameCyrillic"
  | "personGroup-view"
  | "personGroup-with-position"
  | "personGroup.add.reserve"
  | "personGroup.browse"
  | "personGroup.candidate"
  | "personGroup.contacts"
  | "personGroup.for.absences"
  | "personGroup.linkedin"
  | "personGroup.listInfo"
  | "personGroup.master"
  | "personGroup.noAssignment"
  | "personGroup.person.info"
  | "personGroup.scrum.competence"
  | "personGroup.search"
  | "personGroup.search.candidate"
  | "personGroup.with.positionGroup"
  | "personGroupBeneficiary"
  | "personGroupExt-Mic"
  | "personGroupExt-absenceEdit"
  | "personGroupExt-for-absenceRequest"
  | "personGroupExt-for-beneficary-request-edit"
  | "personGroupExt-for-integration-rest"
  | "personGroupExt-for-load-attribute"
  | "personGroupExt-for-person-data"
  | "personGroupExt-for-person-data"
  | "personGroupExt-for-search-candidate"
  | "personGroupExt-person-data"
  | "personGroupExt-view"
  | "personGroupExt-view-for-requisition-edit"
  | "personGroupExt-view-for-selvservice-requisition"
  | "personGroupExt.card"
  | "personGroupExt.edit"
  | "personGroupExt.for.enrollment.lookup"
  | "personGroupExt.for.requisition.edit"
  | "personGroupExt.for.requisition.optionDs"
  | "personGroupExt.lookup.for.attestation"
  | "personGroupExt.mobile"
  | "personGroupExt.rcg.feedback"
  | "personGroupExt.rcg.like"
  | "personGroupExt.responsibleEmployee"
  | "personGroupExt.substituteEmployee"
  | "personGroupExt.view.forPersonalData"
  | "personGroupExtFullName.view"
  | "personGroupExtInternship.edit";
export type PersonGroupExtView<
  V extends PersonGroupExtViewName
> = V extends "_base"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "person"
      | "list"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "fullName"
      | "competenceElements"
      | "company"
    >
  : V extends "_local"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<PersonGroupExt, "id" | "person" | "list">
  : V extends "assignment.card.personGroup"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "jobRequests"
      | "successionPlanning"
      | "businessTrip"
      | "dismissals"
    >
  : V extends "person-group-ext-intern"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "person"
      | "fullName"
    >
  : V extends "personGroup-for-absenceRequest"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "company"
    >
  : V extends "personGroup-relevantPerson-fullNameCyrillic"
  ? Pick<PersonGroupExt, "id" | "person" | "list" | "relevantPerson">
  : V extends "personGroup-view"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "person"
    >
  : V extends "personGroup-with-position"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "assignments"
      | "currentAssignment"
      | "person"
    >
  : V extends "personGroup.add.reserve"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "assessments"
    >
  : V extends "personGroup.browse"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "assignments"
      | "personExperience"
    >
  : V extends "personGroup.candidate"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "person"
      | "personEducation"
      | "personExperience"
      | "personAttachment"
      | "jobRequests"
      | "personContacts"
      | "agreements"
      | "beneficiary"
      | "individualDevelopmentPlan"
      | "internship"
      | "enrollment"
      | "attestation"
    >
  : V extends "personGroup.contacts"
  ? Pick<PersonGroupExt, "id" | "list" | "person" | "personContacts">
  : V extends "personGroup.for.absences"
  ? Pick<PersonGroupExt, "id" | "person" | "list" | "list">
  : V extends "personGroup.linkedin"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "person"
    >
  : V extends "personGroup.listInfo"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "assessments"
    >
  : V extends "personGroup.master"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "person"
      | "personContacts"
      | "personDocuments"
      | "agreements"
      | "dismissals"
      | "cases"
      | "addresses"
      | "businessTrip"
    >
  : V extends "personGroup.noAssignment"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "assignments"
    >
  : V extends "personGroup.person.info"
  ? Pick<PersonGroupExt, "id" | "list" | "person">
  : V extends "personGroup.scrum.competence"
  ? Pick<PersonGroupExt, "id" | "list" | "person">
  : V extends "personGroup.search"
  ? Pick<PersonGroupExt, "id" | "person" | "list" | "list">
  : V extends "personGroup.search.candidate"
  ? Pick<PersonGroupExt, "id" | "list" | "person">
  : V extends "personGroup.with.positionGroup"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "assignments"
    >
  : V extends "personGroupBeneficiary"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "person"
      | "personEducation"
      | "personExperience"
      | "personAttachment"
      | "jobRequests"
      | "personContacts"
      | "agreements"
      | "beneficiary"
      | "individualDevelopmentPlan"
      | "internship"
      | "enrollment"
      | "attestation"
      | "jobRequests"
      | "list"
      | "person"
      | "personDocuments"
    >
  : V extends "personGroupExt-Mic"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "assignments"
    >
  : V extends "personGroupExt-absenceEdit"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
    >
  : V extends "personGroupExt-for-absenceRequest"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "company"
    >
  : V extends "personGroupExt-for-beneficary-request-edit"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "assignments"
      | "personExperience"
    >
  : V extends "personGroupExt-for-integration-rest"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "company"
    >
  : V extends "personGroupExt-for-load-attribute"
  ? Pick<PersonGroupExt, "id" | "person" | "list" | "list">
  : V extends "personGroupExt-for-person-data"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "assignments"
      | "personExperience"
    >
  : V extends "personGroupExt-for-person-data"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "assignments"
      | "personExperience"
    >
  : V extends "personGroupExt-for-search-candidate"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "person"
      | "assignments"
      | "addresses"
      | "totalExperience"
      | "fullName"
      | "personExperience"
      | "currentAssignment"
      | "personContacts"
    >
  : V extends "personGroupExt-person-data"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "person"
      | "assignments"
      | "personExperience"
    >
  : V extends "personGroupExt-view"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personDocuments"
      | "assignments"
      | "list"
      | "addresses"
    >
  : V extends "personGroupExt-view-for-requisition-edit"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "currentAssignment"
      | "personFioWithEmployeeNumber"
      | "list"
      | "assignments"
    >
  : V extends "personGroupExt-view-for-selvservice-requisition"
  ? Pick<PersonGroupExt, "id" | "person" | "list" | "fullName">
  : V extends "personGroupExt.card"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "person"
      | "list"
      | "list"
      | "retirement"
      | "disability"
      | "militaryRank"
      | "competenceElements"
      | "personContacts"
      | "personDocuments"
      | "assessments"
      | "personEducation"
      | "personExperience"
      | "jobRequests"
      | "successionPlanning"
      | "businessTrip"
      | "agreements"
      | "dismissals"
      | "cases"
      | "addresses"
      | "relocation"
      | "beneficiary"
    >
  : V extends "personGroupExt.edit"
  ? Pick<PersonGroupExt, "id" | "person" | "list">
  : V extends "personGroupExt.for.enrollment.lookup"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "person"
      | "list"
      | "list"
      | "fullName"
      | "assignments"
      | "currentAssignment"
    >
  : V extends "personGroupExt.for.requisition.edit"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "fullName"
    >
  : V extends "personGroupExt.for.requisition.optionDs"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "assignments"
      | "currentAssignment"
    >
  : V extends "personGroupExt.lookup.for.attestation"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "person"
      | "fullName"
      | "assignments"
      | "currentAssignment"
    >
  : V extends "personGroupExt.mobile"
  ? Pick<PersonGroupExt, "id" | "person" | "list" | "assignments" | "person">
  : V extends "personGroupExt.rcg.feedback"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
    >
  : V extends "personGroupExt.rcg.like"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
    >
  : V extends "personGroupExt.responsibleEmployee"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "fullName"
    >
  : V extends "personGroupExt.substituteEmployee"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "personFioWithEmployeeNumber"
      | "fullName"
    >
  : V extends "personGroupExt.view.forPersonalData"
  ? Pick<PersonGroupExt, "id" | "list" | "person">
  : V extends "personGroupExtFullName.view"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
    >
  : V extends "personGroupExtInternship.edit"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "person"
      | "personContacts"
      | "addresses"
      | "personFioWithEmployeeNumber"
      | "fullName"
      | "assignments"
    >
  : never;
