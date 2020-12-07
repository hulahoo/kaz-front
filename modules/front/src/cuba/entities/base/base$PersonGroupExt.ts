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
  | "_minimal"
  | "_local"
  | "_base"
  | "personGroupExt-absenceEdit"
  | "personGroup.browse"
  | "personGroup-view"
  | "personGroup.person.info"
  | "personGroup.scrum.competence"
  | "personGroup.candidate"
  | "personGroup.add.reserve"
  | "personGroup.contacts"
  | "personGroupBeneficiary"
  | "personGroup.listInfo"
  | "personGroup.search.candidate"
  | "personGroup.linkedin"
  | "personGroup.master"
  | "personGroupExt-view-for-selvservice-requisition"
  | "personGroupExt-view-for-requisition-edit"
  | "personGroupExt.for.requisition.optionDs"
  | "personGroupExt.responsibleEmployee"
  | "personGroupExt.substituteEmployee"
  | "personGroup.search"
  | "personGroupExt.lookup.for.attestation"
  | "personGroupExtInternship.edit"
  | "person-group-ext-intern"
  | "personGroupExt.for.enrollment.lookup"
  | "personGroupExt.rcg.like"
  | "personGroupExtFullName.view"
  | "personGroupExt-for-search-candidate"
  | "personGroup.for.absences"
  | "personGroupExtFullName.view"
  | "personGroupExt.view.forPersonalData"
  | "personGroup.with.positionGroup"
  | "personGroupExt.for.requisition.edit"
  | "personGroupExt-view"
  | "personGroupExt.rcg.feedback"
  | "assignment.card.personGroup"
  | "personGroup.noAssignment"
  | "personGroup-relevantPerson-fullNameCyrillic";
export type PersonGroupExtView<
  V extends PersonGroupExtViewName
> = V extends "_minimal"
  ? Pick<PersonGroupExt, "id">
  : V extends "_local"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "totalExperience"
      | "personFioWithEmployeeNumber"
      | "fullName"
      | "firstLastName"
      | "fioWithEmployeeNumber"
      | "personLatinFioWithEmployeeNumber"
      | "personFirstLastNameLatin"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "totalExperience"
      | "personFioWithEmployeeNumber"
      | "fullName"
      | "firstLastName"
      | "fioWithEmployeeNumber"
      | "personLatinFioWithEmployeeNumber"
      | "personFirstLastNameLatin"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "personGroupExt-absenceEdit"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "totalExperience"
      | "personFioWithEmployeeNumber"
      | "fullName"
      | "firstLastName"
      | "fioWithEmployeeNumber"
      | "personLatinFioWithEmployeeNumber"
      | "personFirstLastNameLatin"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
    >
  : V extends "personGroup.browse"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "totalExperience"
      | "personFioWithEmployeeNumber"
      | "fullName"
      | "firstLastName"
      | "fioWithEmployeeNumber"
      | "personLatinFioWithEmployeeNumber"
      | "personFirstLastNameLatin"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "assignments"
    >
  : V extends "personGroup-view"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "totalExperience"
      | "personFioWithEmployeeNumber"
      | "fullName"
      | "firstLastName"
      | "fioWithEmployeeNumber"
      | "personLatinFioWithEmployeeNumber"
      | "personFirstLastNameLatin"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "person"
    >
  : V extends "personGroup.person.info"
  ? Pick<PersonGroupExt, "id" | "list" | "person">
  : V extends "personGroup.scrum.competence"
  ? Pick<PersonGroupExt, "id" | "list" | "person">
  : V extends "personGroup.candidate"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "totalExperience"
      | "personFioWithEmployeeNumber"
      | "fullName"
      | "firstLastName"
      | "fioWithEmployeeNumber"
      | "personLatinFioWithEmployeeNumber"
      | "personFirstLastNameLatin"
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
  : V extends "personGroup.add.reserve"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "totalExperience"
      | "personFioWithEmployeeNumber"
      | "fullName"
      | "firstLastName"
      | "fioWithEmployeeNumber"
      | "personLatinFioWithEmployeeNumber"
      | "personFirstLastNameLatin"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "assessments"
    >
  : V extends "personGroup.contacts"
  ? Pick<PersonGroupExt, "id" | "list" | "person" | "personContacts">
  : V extends "personGroupBeneficiary"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "totalExperience"
      | "personFioWithEmployeeNumber"
      | "fullName"
      | "firstLastName"
      | "fioWithEmployeeNumber"
      | "personLatinFioWithEmployeeNumber"
      | "personFirstLastNameLatin"
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
  : V extends "personGroup.listInfo"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "totalExperience"
      | "personFioWithEmployeeNumber"
      | "fullName"
      | "firstLastName"
      | "fioWithEmployeeNumber"
      | "personLatinFioWithEmployeeNumber"
      | "personFirstLastNameLatin"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "assessments"
    >
  : V extends "personGroup.search.candidate"
  ? Pick<PersonGroupExt, "id" | "list" | "person">
  : V extends "personGroup.linkedin"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "totalExperience"
      | "personFioWithEmployeeNumber"
      | "fullName"
      | "firstLastName"
      | "fioWithEmployeeNumber"
      | "personLatinFioWithEmployeeNumber"
      | "personFirstLastNameLatin"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "person"
    >
  : V extends "personGroup.master"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "totalExperience"
      | "personFioWithEmployeeNumber"
      | "fullName"
      | "firstLastName"
      | "fioWithEmployeeNumber"
      | "personLatinFioWithEmployeeNumber"
      | "personFirstLastNameLatin"
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
  : V extends "personGroupExt-view-for-selvservice-requisition"
  ? Pick<PersonGroupExt, "id" | "fullName">
  : V extends "personGroupExt-view-for-requisition-edit"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "totalExperience"
      | "personFioWithEmployeeNumber"
      | "fullName"
      | "firstLastName"
      | "fioWithEmployeeNumber"
      | "personLatinFioWithEmployeeNumber"
      | "personFirstLastNameLatin"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "currentAssignment"
      | "personFioWithEmployeeNumber"
      | "list"
      | "assignments"
    >
  : V extends "personGroupExt.for.requisition.optionDs"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "totalExperience"
      | "personFioWithEmployeeNumber"
      | "fullName"
      | "firstLastName"
      | "fioWithEmployeeNumber"
      | "personLatinFioWithEmployeeNumber"
      | "personFirstLastNameLatin"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "assignments"
      | "currentAssignment"
    >
  : V extends "personGroupExt.responsibleEmployee"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "totalExperience"
      | "personFioWithEmployeeNumber"
      | "fullName"
      | "firstLastName"
      | "fioWithEmployeeNumber"
      | "personLatinFioWithEmployeeNumber"
      | "personFirstLastNameLatin"
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
      | "totalExperience"
      | "personFioWithEmployeeNumber"
      | "fullName"
      | "firstLastName"
      | "fioWithEmployeeNumber"
      | "personLatinFioWithEmployeeNumber"
      | "personFirstLastNameLatin"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "personFioWithEmployeeNumber"
      | "fullName"
    >
  : V extends "personGroup.search"
  ? Pick<PersonGroupExt, "id" | "list">
  : V extends "personGroupExt.lookup.for.attestation"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "totalExperience"
      | "personFioWithEmployeeNumber"
      | "fullName"
      | "firstLastName"
      | "fioWithEmployeeNumber"
      | "personLatinFioWithEmployeeNumber"
      | "personFirstLastNameLatin"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "person"
      | "fullName"
      | "assignments"
      | "currentAssignment"
    >
  : V extends "personGroupExtInternship.edit"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "totalExperience"
      | "personFioWithEmployeeNumber"
      | "fullName"
      | "firstLastName"
      | "fioWithEmployeeNumber"
      | "personLatinFioWithEmployeeNumber"
      | "personFirstLastNameLatin"
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
  : V extends "person-group-ext-intern"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "totalExperience"
      | "personFioWithEmployeeNumber"
      | "fullName"
      | "firstLastName"
      | "fioWithEmployeeNumber"
      | "personLatinFioWithEmployeeNumber"
      | "personFirstLastNameLatin"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "person"
      | "fullName"
    >
  : V extends "personGroupExt.for.enrollment.lookup"
  ? Pick<
      PersonGroupExt,
      "id" | "list" | "fullName" | "assignments" | "currentAssignment"
    >
  : V extends "personGroupExt.rcg.like"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "totalExperience"
      | "personFioWithEmployeeNumber"
      | "fullName"
      | "firstLastName"
      | "fioWithEmployeeNumber"
      | "personLatinFioWithEmployeeNumber"
      | "personFirstLastNameLatin"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
    >
  : V extends "personGroupExtFullName.view"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "totalExperience"
      | "personFioWithEmployeeNumber"
      | "fullName"
      | "firstLastName"
      | "fioWithEmployeeNumber"
      | "personLatinFioWithEmployeeNumber"
      | "personFirstLastNameLatin"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
    >
  : V extends "personGroupExt-for-search-candidate"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "totalExperience"
      | "personFioWithEmployeeNumber"
      | "fullName"
      | "firstLastName"
      | "fioWithEmployeeNumber"
      | "personLatinFioWithEmployeeNumber"
      | "personFirstLastNameLatin"
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
  : V extends "personGroup.for.absences"
  ? Pick<PersonGroupExt, "id" | "list">
  : V extends "personGroupExtFullName.view"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "totalExperience"
      | "personFioWithEmployeeNumber"
      | "fullName"
      | "firstLastName"
      | "fioWithEmployeeNumber"
      | "personLatinFioWithEmployeeNumber"
      | "personFirstLastNameLatin"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
    >
  : V extends "personGroupExt.view.forPersonalData"
  ? Pick<PersonGroupExt, "id" | "list" | "person">
  : V extends "personGroup.with.positionGroup"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "totalExperience"
      | "personFioWithEmployeeNumber"
      | "fullName"
      | "firstLastName"
      | "fioWithEmployeeNumber"
      | "personLatinFioWithEmployeeNumber"
      | "personFirstLastNameLatin"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "assignments"
    >
  : V extends "personGroupExt.for.requisition.edit"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "totalExperience"
      | "personFioWithEmployeeNumber"
      | "fullName"
      | "firstLastName"
      | "fioWithEmployeeNumber"
      | "personLatinFioWithEmployeeNumber"
      | "personFirstLastNameLatin"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "fullName"
    >
  : V extends "personGroupExt-view"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "totalExperience"
      | "personFioWithEmployeeNumber"
      | "fullName"
      | "firstLastName"
      | "fioWithEmployeeNumber"
      | "personLatinFioWithEmployeeNumber"
      | "personFirstLastNameLatin"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
    >
  : V extends "personGroupExt.rcg.feedback"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "totalExperience"
      | "personFioWithEmployeeNumber"
      | "fullName"
      | "firstLastName"
      | "fioWithEmployeeNumber"
      | "personLatinFioWithEmployeeNumber"
      | "personFirstLastNameLatin"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
    >
  : V extends "assignment.card.personGroup"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "totalExperience"
      | "personFioWithEmployeeNumber"
      | "fullName"
      | "firstLastName"
      | "fioWithEmployeeNumber"
      | "personLatinFioWithEmployeeNumber"
      | "personFirstLastNameLatin"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "jobRequests"
      | "successionPlanning"
      | "businessTrip"
      | "dismissals"
    >
  : V extends "personGroup.noAssignment"
  ? Pick<
      PersonGroupExt,
      | "id"
      | "linkedinAccessToken"
      | "linkedinProfileLink"
      | "linkedinTokenExpiresInDate"
      | "totalExperience"
      | "personFioWithEmployeeNumber"
      | "fullName"
      | "firstLastName"
      | "fioWithEmployeeNumber"
      | "personLatinFioWithEmployeeNumber"
      | "personFirstLastNameLatin"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "assignments"
    >
  : V extends "personGroup-relevantPerson-fullNameCyrillic"
  ? Pick<PersonGroupExt, "id" | "relevantPerson">
  : never;
