import {FetchOptions, SerializedEntity} from "@cuba-platform/rest";
import {getCubaREST} from "@cuba-platform/react";
import {SortOrder} from "antd/lib/table/interface";
import moment from "moment";
import {AssignedGoal} from "./entities/base/tsadv$AssignedGoal";
import {ProcessInstanceData} from "./entities/base/bproc_ProcessInstanceData";
import {ExtTaskData} from "./entities/base/tsadv_ExtTaskData";
import {BprocFormData} from "./entities/bproc/bproc_FormData";
import {ProcessDefinitionData} from "./entities/base/bproc_ProcessDefinitionData";
import {BpmRolesDefiner} from "./entities/base/tsadv$BpmRolesDefiner";
import {NotPersisitBprocActors} from "./entities/base/tsadv_NotPersisitBprocActors";
import {TsadvUser} from "./entities/base/tsadv$UserExt";
import {DicCategory} from "./entities/base/tsadv$DicCategory";
import {CourseSection} from "./entities/base/tsadv$CourseSection";
import {AnsweredTest, TestModel} from "../app/components/Test/TestComponent";
import {Comment} from '../app/pages/Material/MaterialReviews'
import {SecurityState} from "../app/util/EntitySecurityState";
import {OrgStructureRequest} from "./entities/base/tsadv_OrgStructureRequest";
import {
  OrgRequestGrade,
  OrgRequestRow,
  OrgRequestSaveModel
} from "../app/pages/orgStructureRequest/OrgStructureRequestEdit";
import {OrganizationSaveModel} from "../app/pages/orgStructureRequest/OrganizationEditor";
import {PositionSaveModel} from "../app/pages/orgStructureRequest/PositionEditor";
import {InsuredPerson} from "./entities/base/tsadv$InsuredPerson";
import {ScheduleOffsetsRequest} from "./entities/base/tsadv_ScheduleOffsetsRequest";
import {PersonGroupExt} from "./entities/base/base$PersonGroupExt";
import {AnsweredFeedback} from "../app/pages/MyCourse/RenderModalBody/Feedback/FeedbackQuestionAnswerComponent";
import {LearningFeedbackQuestion} from "./entities/base/tsadv$LearningFeedbackQuestion";
import {DicCompany} from "./entities/base/base_DicCompany";
import {Enrollment} from "./entities/base/tsadv$Enrollment";
import {MyTeamNew} from "./entities/base/tsadv$MyTeamNew";
import {PersonProfile} from "../app/pages/MyTeam/MyTeamCard";
import {CourseSectionAttempt} from "./entities/base/tsadv$CourseSectionAttempt";

export const DEFAULT_DATE_PARSE_FORMAT = "YYYY-MM-DD";
export const DEFAULT_DATE_TIME_PARSE_FORMAT = "YYYY-MM-DD";

export type Sort = {
  columnKey: string,
  order: SortOrder
}

export type DefaultRestParams = {
  page?: number,
  pageSize?: number,
  sort?: Sort
}

export type CourseTrainerInfo = {
  fullName?: string,
  finished?: number,
  courseCount?: number,
  image?: any,
  comments?: any[],
}

export type PairModel<K, V> = {
  key: K,
  value: V
}

export type ScormInputData = {
  fieldId: string;
  answer: string;
  score: number;
  maxScore: number;
  minScore: number;
}

export const restServices = {
  userMenuService: {
    getTimeZones: (params?: {}, fetchOpts?: FetchOptions) => {
      return getCubaREST()!.invokeService(
        "tsadv_UserSettingService",
        "getTimeZones",
        {...params},
        fetchOpts
      );
    },
    changePassword: (params: { oldPassword: string, newPassword: string }, fetchOpts?: FetchOptions) => {
      return getCubaREST()!.invokeService(
        "tsadv_LmsService",
        "changePassword",
        {...params},
        fetchOpts
      );
    },
  },
  notificationsService: {
    notifications: (params?: {}, fetchOpts?: FetchOptions) => {
      return getCubaREST()!.invokeService(
        "tsadv_NotificationService",
        "notifications",
        {...params},
        fetchOpts
      );
    },
    tasks: (params?: {}, fetchOpts?: FetchOptions) => {
      return getCubaREST()!.invokeService(
        "tsadv_NotificationService",
        "tasks",
        {...params},
        fetchOpts
      );
    }
  },
  learningService: {
    learningHistory: (params: { personGroupId: string }): Promise<any[]> => {
      return getCubaREST()!.fetch(
        "GET",
        "learning-history",
        {...params}
      ).then((response: string) => {
        return JSON.parse(response);
      });
    }
  },
  courseService: {
    courseInfo: (params: { courseId: string, personGroupId: string }): Promise<CourseInfo> => {
      return getCubaREST()!.invokeService(
        "tsadv_CourseService",
        "courseInfo",
        {...params}
      ).then((response: string) => {
        const courseInfo: CourseInfo = JSON.parse(response) as CourseInfo;
        courseInfo.startDate = moment(courseInfo.startDate, DEFAULT_DATE_PARSE_FORMAT);
        courseInfo.endDate = moment(courseInfo.endDate, DEFAULT_DATE_PARSE_FORMAT);

        return courseInfo;
      });
    },
    courseTrainerInfo: (params: { trainerId: string }): Promise<CourseTrainerInfo> => {
      return getCubaREST()!.invokeService(
        "tsadv_CourseService",
        "courseTrainerInfo",
        {...params}
      ).then((response: string) => {
        return JSON.parse(response);
      });
    },
    searchCourses: (params: { courseName: string }): Promise<DicCategory[]> => {
      return getCubaREST()!.invokeService(
        "tsadv_CourseService",
        "searchCourses",
        {...params}
      ).then((response: string) => {
        return JSON.parse(response);
      });
    },
    courseEnrollmentInfo: (params: { enrollmentId: string }): Promise<Enrollment> => {
      return getCubaREST()!.invokeService(
        "tsadv_CourseService",
        "courseEnrollmentInfo",
        {...params}
      ).then((response: string) => {
        return JSON.parse(response);
      });
    },
    allCourses: (): Promise<any> => {
      return getCubaREST()!.invokeService(
        "tsadv_CourseService",
        "allCourses",
        {}
      ).then((response: string) => {
        return JSON.parse(response);
      });
    },
    courseSectionWithEnrollmentAttempts: (params: { courseSectionId: string, enrollmentId: string }): Promise<CourseSection> => {
      return getCubaREST()!.invokeService(
        "tsadv_CourseService",
        "courseSectionWithEnrollmentAttempts",
        {...params}
      ).then((response: string) => {
        return JSON.parse(response);
      });
    },
    createScormAttempt: (params: { courseSectionId: string, enrollmentId: string, inputData: ScormInputData[], success: boolean }): Promise<void> => {
      return getCubaREST()!.invokeService(
        "tsadv_CourseService",
        "createScormAttempt",
        {...params}
      );
    },
    createTestScormAttempt: (params: { courseSectionId: string, enrollmentId: string, score: number, maxScore: number, minScore: number }): Promise<CourseSectionAttempt> => {
      return getCubaREST()!.invokeService(
        "tsadv_CourseService",
        "createTestScormAttempt",
        {...params}
      ).then((response: string) => {
        return JSON.parse(response);
      });
    },
    validateEnroll: (params: { courseId: string, personGroupId: string, locale: string }): Promise<PairModel<boolean, string[]>> => {
      return getCubaREST()!.invokeService(
        "tsadv_CourseService",
        "validateEnroll",
        {...params}
      ).then((response: string) => JSON.parse(response));
    }
  },
  kpiService: {
    kpiAssignedGoals: (params: { appId: string }): Promise<PairModel<string, SerializedEntity<AssignedGoal>[]>[]> => {
      return getCubaREST()!.invokeService(
        "tsadv_KpiService",
        "kpiAssignedGoals",
        {...params}
      ).then((response: string) => JSON.parse(response));
    }
  },
  enrollmentService: {
    searchEnrollments: (params: { courseName?: string, userId: string }): Promise<SerializedEntity<DicCategory>[]> => {
      return getCubaREST()!.invokeService(
        "tsadv_EnrollmentService",
        "searchEnrollment",
        {...params}
      ).then((response: string) => JSON.parse(response));
    }
  },
  lmsService: {
    loadCourseSectionData: (params: { enrollmentId: string, courseSectionId: string }, fetchOpts?: FetchOptions): Promise<SerializedEntity<CourseSection>> => {
      return getCubaREST()!.invokeService(
        "tsadv_LmsService",
        "loadCourseSectionData",
        {...params},
        fetchOpts
      ).then((response: string) => JSON.parse(response));
    },
    startAndLoadTest: (params: { courseSectionObjectId: string, enrollmentId: string }, fetchOpts?: FetchOptions): Promise<TestModel> => {
      return getCubaREST()!.invokeService(
        "tsadv_LmsService",
        "startAndLoadTest",
        {...params},
        fetchOpts
      ).then((response: string) => JSON.parse(response));
    },
    finishTest: (params: { answeredTest: AnsweredTest }, fetchOpts?: FetchOptions): Promise<{
      score: number,
      maxScore: number,
      success: boolean
    }> => {
      return getCubaREST()!.invokeService(
        "tsadv_LmsService",
        "finishTest",
        {...params},
        fetchOpts
      ).then((response: string) => JSON.parse(response));
    },
    finishFeedback: (params: { answeredFeedback: AnsweredFeedback, personGroupId: string }, fetchOpts?: FetchOptions) => {
      return getCubaREST()!.invokeService(
        "tsadv_LmsService",
        "finishFeedback",
        {...params},
        fetchOpts
      );
    },
    loadFeedbackData: (params: { feedbackTemplateId: string }, fetchOpts?: FetchOptions): Promise<LearningFeedbackQuestion[]> => {
      return getCubaREST()!.invokeService(
        "tsadv_LmsService",
        "loadFeedbackData",
        {...params},
        fetchOpts
      ).then((response: string) => JSON.parse(response));
    }
  },
  portalHelperService: {
    newEntity: <T>(param ?: { entityName: string }): Promise<T> => {
      return getCubaREST()!.invokeService(
        "tsadv_PortalHelperService",
        "newEntity",
        {...param}
      ).then((value: string) => JSON.parse(value));
    },
    companiesForLoadDictionary: (param: { personGroupId: string }): Promise<string> => {
      return getCubaREST()!.invokeService(
        "tsadv_PortalHelperService",
        "getCompaniesForLoadDictionary",
        {...param}
      ).then((value: string) => JSON.parse(value));
    },
  },
  bprocService: {
    tasks: (param: { processInstanceData: ProcessInstanceData }): Promise<Array<SerializedEntity<ExtTaskData>>> => {
      return getCubaREST()!.invokeService(
        "tsadv_BprocService",
        "getProcessTasks",
        {...param}
      ).then((value: string) => JSON.parse(value));
    },
    getActiveTask: (param: { processInstanceData: ProcessInstanceData }): Promise<ExtTaskData> => {
      return getCubaREST()!.invokeService(
        "tsadv_BprocService",
        "getActiveTask",
        {...param}
      ).then((value: string) => {
        return JSON.parse(value);
      });
    },
    processInstanceData: (param: { processInstanceBusinessKey: string, processDefinitionKey: string }): Promise<ProcessInstanceData> => {
      return getCubaREST()!.invokeService(
        "tsadv_BprocService",
        "getProcessInstanceData",
        {...param}
      ).then((value: string) => {
        if (value) return JSON.parse(value);
        return value;
      });
    },
    getProcessDefinitionData: (param: { processDefinitionKey: string }): Promise<ProcessDefinitionData> => {
      return getCubaREST()!.invokeService(
        "tsadv_BprocService",
        "getProcessDefinitionData",
        {...param}
      ).then((value: string) => JSON.parse(value));
    },
    getStartFormData: (param: { processDefinitionKey: string }): Promise<BprocFormData> => {
      return getCubaREST()!.invokeService(
        "tsadv_BprocService",
        "getStartFormData",
        {...param}
      ).then((value: string) => JSON.parse(value));
    }
  },
  bprocFormService: {
    getStartFormData: (param: { processDefinitionId: string }): Promise<BprocFormData> => {
      return getCubaREST()!.invokeService(
        "bproc_BprocFormService",
        "getStartFormData",
        {...param}
      ).then((value: string) => JSON.parse(value));
    },
    getTaskFormData: (param: { taskId: string }): Promise<BprocFormData> => {
      return getCubaREST()!.invokeService(
        "bproc_BprocFormService",
        "getTaskFormData",
        {...param}
      ).then((value: string) => JSON.parse(value));
    }
  },
  startBprocService: {
    getBpmRolesDefiner: (param: { processDefinitionKey: string, initiatorPersonGroupId: string }): Promise<BpmRolesDefiner> => {
      return getCubaREST()!.invokeService(
        "tsadv_StartBprocService",
        "getBpmRolesDefiner",
        {...param}
      ).then((value: string) => JSON.parse(value));
    },
    getNotPersisitBprocActors: (param: {
      employee: TsadvUser | null,
      initiatorPersonGroupId: string,
      bpmRolesDefiner: BpmRolesDefiner
    }): Promise<Array<SerializedEntity<NotPersisitBprocActors>>> => {
      return getCubaREST()!.invokeService(
        "tsadv_StartBprocService",
        "getNotPersisitBprocActors",
        {...param}
      ).then((value: string) => {
        return JSON.parse(value);
      })
    },
    saveBprocActors: (param: { entityId: string, notPersisitBprocActors: Array<NotPersisitBprocActors> }): Promise<void> => {
      return getCubaREST()!.invokeService(
        "tsadv_StartBprocService",
        "saveBprocActors",
        {...param}
      );
    }
  },
  bprocRuntimeService: {
    startProcessInstanceByKey: (param: { processDefinitionKey: string, businessKey: string, variables: any }): Promise<void> => {
      return getCubaREST()!.invokeService(
        "bproc_BprocRuntimeService",
        "startProcessInstanceByKey",
        {...param}
      );
    }
  },
  bprocTaskService: {
    completeWithOutcome: (param: { taskData: ExtTaskData, outcomeId: string, processVariables: any }): Promise<void> => {
      return getCubaREST()!.invokeService(
        "bproc_BprocTaskService",
        "completeWithOutcome",
        {...param}
      );
    }
  },
  fileDownload: {
    download: (fileId: string) => {
      return getCubaREST()!.getFile(fileId)
        .then(value => value);
    }
  },
  portalAccessEntityAttributesService: {
    entityAttributesSecurityState: (param: { entityName: string, entityId: string }): Promise<SecurityState> => {
      return getCubaREST()!.invokeService<string>(
        "tsadv_PortalAccessEntityAttributesService",
        "entityAttributesSecurityState",
        {...param}
      ).then(r => JSON.parse(r));
    }
  },
  absenceService: {
    vacationDurationType: (param: { personGroupId: string, absenceTypeId: string, dateFrom: Date | null }): Promise<string> => {
      return getCubaREST()!.invokeService<string>(
        "tsadv_AbsenceService",
        "getVacationDurationType",
        {...param}
      );
    },
    countDays: (param: { dateFrom: Date, dateTo: Date, absenceTypeId: string, personGroupId: string }): Promise<any> => {
      return getCubaREST()!.invokeService<string>(
        "tsadv_AbsenceService",
        "countDays",
        {...param}
      );
    },
    getReceivedVacationDaysOfYear: (param: { date: Date, absenceTypeId: string, personGroupId: string }): Promise<number> => {
      return getCubaREST()!.invokeService<number>(
        "tsadv_AbsenceService",
        "getReceivedVacationDaysOfYear",
        {...param}
      );
    },
    getRemainingDaysWeekendWork: (personGroupId: string): Promise<number> => {
      return getCubaREST()!.invokeService<number>(
        "tsadv_AbsenceService",
        "getRemainingDaysWeekendWork",
        {personGroupId: personGroupId}
      );
    },
    countDaysWithoutHolidays: (param: { dateFrom: Date, dateTo: Date, personGroupId: string }): Promise<number> => {
      return getCubaREST()!.invokeService<number>(
        "tsadv_AbsenceService",
        "countDaysWithoutHolidays",
        {...param}
      );
    },
  },
  absenceRvdService: {
    countTotalHours: (param: { dateFrom: Date, dateTo: Date, absenceTypeId: string, personGroupId: string }): Promise<any> => {
      return getCubaREST()!.invokeService<string>(
        "tsadv_AbsenceRvdService",
        "countTotalHours",
        {...param}
      );
    }
  },
  absenceBalanceService: {
    getAbsenceBalance: (param: { absenceDate: any, personGroupId: string }): Promise<number> => {
      return getCubaREST()!.invokeService<number>(
        "tsadv_AbsenceBalanceService",
        "getAbsenceBalance",
        {...param}
      );
    },
  },
  documentService: {
    getInsuredPerson: (params: { type: string }, fetchOpts?: FetchOptions): Promise<InsuredPerson> => {
      return getCubaREST()!.invokeService(
        "tsadv_DocumentService",
        "getInsuredPerson",
        {...params},
        fetchOpts
      ).then((response: string) => JSON.parse(response));
    },
    getInsuredPersonMembers: (params: { insuredPersonId: any }, fetchOpts?: FetchOptions): Promise<Array<InsuredPerson>> => {
      return getCubaREST()!.invokeService(
        "tsadv_DocumentService",
        "getInsuredPersonMembers",
        {...params},
        fetchOpts
      ).then((response: string) => JSON.parse(response));
    },
    checkPersonInsure: (params: { personGroupId: any, contractId: any }, fetchOpts?: FetchOptions): Promise<Boolean> => {
      return getCubaREST()!.invokeService(
        "tsadv_DocumentService",
        "checkPersonInsure",
        {...params},
        fetchOpts
      ).then((response: string) => JSON.parse(response));
    },
    calcAmount: (params: { insuranceContractId: any, personGroupExtId: any, relativeTypeId: any, bith: any }, fetchOpts?: FetchOptions): Promise<number> => {
      return getCubaREST()!.invokeService(
        "tsadv_DocumentService",
        "calcAmount",
        {...params},
        fetchOpts
      ).then((response: string) => JSON.parse(response));
    },
    getMyInsuraces: (params: {}, fetchOpts?: FetchOptions): Promise<Array<InsuredPerson>> => {
      return getCubaREST()!.invokeService(
        "tsadv_DocumentService",
        "getMyInsuraces",
        {...params},
        fetchOpts
      ).then((response: string) => JSON.parse(response));
    },

    getOffsetRequestsNew: (params: {}, fetchOpts?: FetchOptions): Promise<ScheduleOffsetsRequest> => {
      return getCubaREST()!.invokeService(
        "tsadv_DocumentService",
        "getOffsetRequestsNew",
        {...params},
        fetchOpts
      ).then((response: string) => JSON.parse(response));
    },
    calcTotalAmount: (params: { insuredPersonId: any }, fetchOpts?: FetchOptions): Promise<number> => {
      return getCubaREST()!.invokeService(
        "tsadv_DocumentService",
        "calcTotalAmount",
        {...params},
        fetchOpts
      ).then((response: string) => JSON.parse(response));
    },
    commitFromPortal: (insuredPerson: InsuredPerson): Promise<InsuredPerson> => {
      return getCubaREST()!.invokeService<string>(
        "tsadv_DocumentService",
        "commitFromPortal",
        {insuredPerson: insuredPerson}
      ).then((response: string) => JSON.parse(response));
    }
  },
  employeeService: {
    personProfile: (personGroupId: string): Promise<PersonProfile> => {
      return getCubaREST()!.invokeService<string>(
        "tsadv_EmployeeService",
        "personProfile",
        {personGroupId: personGroupId}
      ).then(r => JSON.parse(r));
    },
    personGroupInfo: (userId: string): Promise<PersonProfile> => {
      return getCubaREST()!.invokeService<string>(
        "tsadv_EmployeeService",
        "personGroupInfo",
        {userId: userId}
      ).then(r => JSON.parse(r));
    },
    findManagerListByPositionGroup: (param: { positionGroupId: string, showAll: boolean, viewName: string }): Promise<PersonGroupExt[]> => {
      return getCubaREST()!.invokeService<string>(
        "tsadv_EmployeeService",
        "findManagerListByPositionGroup",
        {...param}
      ).then(r => JSON.parse(r));
    },
    getCompanyByPersonGroupId: (param: { personGroupId: string }): Promise<DicCompany> => {
      return getCubaREST()!.invokeService<string>(
        "tsadv_EmployeeService",
        "getCompanyByPersonGroupId",
        {...param}
      ).then(r => JSON.parse(r));
    },
    findManagerListByPositionGroupReturnListPosition: (param: { personGroupId: string }): Promise<DicCompany> => {
      return getCubaREST()!.invokeService<string>(
        "tsadv_EmployeeService",
        "findManagerListByPositionGroupReturnListPosition",
        {...param}
      ).then(r => JSON.parse(r));
    }
  },
  orgStructureService: {
    initialCreate: (): Promise<OrgStructureRequest> => {
      return getCubaREST()!.invokeService(
        "tsadv_OrgStructureRequestService",
        "initialCreate", {},
      ).then((value: string) => JSON.parse(value));
    },
    getMergedOrgStructure: (param: { requestId: string }): Promise<Array<OrgRequestRow>> => {
      return getCubaREST()!.invokeService<string>(
        "tsadv_OrgStructureRequestService",
        "getMergedOrgStructure",
        {...param}
      ).then(r => JSON.parse(r));
    },
    saveRequest: (param: { orgRequestSaveModel: OrgRequestSaveModel }): Promise<OrgStructureRequest> => {
      return getCubaREST()!.invokeService<string>(
        "tsadv_OrgStructureRequestService",
        "saveRequest",
        {...param}
      ).then(r => JSON.parse(r));
    },
    saveOrganization: (param: { organizationRequestSaveModel: OrganizationSaveModel }): Promise<string> => {
      return getCubaREST()!.invokeService<string>(
        "tsadv_OrgStructureRequestService",
        "saveOrganization",
        {...param}
      );
    },
    savePosition: (param: { positionRequestSaveModel: PositionSaveModel }): Promise<string> => {
      return getCubaREST()!.invokeService<string>(
        "tsadv_OrgStructureRequestService",
        "savePosition",
        {...param}
      );
    },
    exclude: (param: { requestId: string, requestDetailId: string, elementGroupId: string, elementType: string }): Promise<string> => {
      return getCubaREST()!.invokeService<string>(
        "tsadv_OrgStructureRequestService",
        "exclude",
        {...param}
      );
    },
    getGrades: (): Promise<Array<OrgRequestGrade>> => {
      return getCubaREST()!.invokeService<string>(
        "tsadv_OrgStructureRequestService",
        "getGrades",
        null
      ).then(r => JSON.parse(r));
    },
  },
  myTeamService: {
    getChildren: (param: { parentPositionGroupId: string, parent?: MyTeamNew }): Promise<Array<MyTeamNew>> => {
      return getCubaREST()!.invokeService<string>(
        "tsadv_MyTeamService",
        "getChildren",
        {...param}
      ).then(r => JSON.parse(r));
    },
    searchMyTeam: (param: { parentPositionGroupId: string, searchFio: string }): Promise<Array<MyTeamNew>> => {
      return getCubaREST()!.invokeService<string>(
        "tsadv_MyTeamService",
        "searchMyTeam",
        {...param}
      ).then(r => JSON.parse(r));
    },
  },
  organizationHrUserService: {
    isManagerOrSupManager: (param: { userId: string, employeePersonGroupId: string }): Promise<boolean> => {
      return getCubaREST()!.invokeService<string>(
        "tsadv_OrganizationHrUserService",
        "isManagerOrSupManager",
        {...param}
      ).then(r => JSON.parse(r));
    },
  }
};

export type CourseInfo = {
  name: string
  avgRate: number
  preRequisitions: string
  trainers: any[]
  startDate: moment.Moment
  endDate: moment.Moment
  finished: number
  certificateUrl: string
  sections: any[]
  logo: string
  comments: Comment[]
  isIssuedCertificate: boolean
  learningProof: string
  rateReviewCount: number
  rating: any[]
  isOnline: boolean
  description: string
  educationPeriod: number
  educationDuration: number
  enrollmentId: string
  selfEnrollment: boolean
}
