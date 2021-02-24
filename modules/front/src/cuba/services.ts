import {FetchOptions, SerializedEntity} from "@cuba-platform/rest";
import {getCubaREST} from "@cuba-platform/react";
import {SortOrder} from "antd/lib/table/interface";
import {Course} from "./entities/base/tsadv$Course";
import moment from "moment";
import {AssignedGoal} from "./entities/base/tsadv$AssignedGoal";
import {ProcessInstanceData} from "./entities/base/bproc_ProcessInstanceData";
import {ExtTaskData} from "./entities/base/tsadv_ExtTaskData";
import {BprocFormData} from "./entities/bproc/bproc_FormData";
import {ProcessDefinitionData} from "./entities/base/bproc_ProcessDefinitionData";
import {BpmRolesDefiner} from "./entities/base/tsadv$BpmRolesDefiner";
import {NotPersisitBprocActors} from "./entities/base/tsadv_NotPersisitBprocActors";
import {UserExt} from "./entities/base/tsadv$UserExt";
import {DicCategory} from "./entities/base/tsadv$DicCategory";
import {CourseSection} from "./entities/base/tsadv$CourseSection";
import {AnsweredTest, TestModel} from "../app/components/Test/Test";
import {Comment} from '../app/pages/Material/MaterialReviews'
import {SecurityState} from "../app/util/EntitySecurityState";
import {InsuredPerson} from "./entities/base/tsadv$InsuredPerson";
import {List} from "antd";
import {BaseUuidEntity} from "./entities/base/sys$BaseUuidEntity";
import {ScheduleOffsetsRequest} from "./entities/base/tsadv_ScheduleOffsetsRequest";
import {PersonGroupExt} from "./entities/base/base$PersonGroupExt";

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
      learningHistory: (params: { personGroupId: string }): Promise<Course[]> => {
        return getCubaREST()!.invokeService(
          "tsadv_LearningService",
          "learningHistory",
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
        maxScore: number
      }> => {
        return getCubaREST()!.invokeService(
          "tsadv_LmsService",
          "finishTest",
          {...params},
          fetchOpts
        ).then((response: string) => JSON.parse(response));
      }
    },
    portalHelperService: {
      newEntity: (param ?: { entityName: string }, fetchOpts?: FetchOptions) => {
        return getCubaREST()!.invokeService(
          "tsadv_PortalHelperService",
          "newEntity",
          {...param},
          fetchOpts
        );
      }
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
        employee: UserExt | null,
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
      }
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
    },
    employeeService: {
      findManagerListByPositionGroup: (param: { positionGroupId: string, showAll: boolean }): Promise<PersonGroupExt> => {
        return getCubaREST()!.invokeService<string>(
          "tsadv_EmployeeService",
          "findManagerListByPositionGroup",
          {...param}
        ).then(r => JSON.parse(r));
      }
    }
  }
;

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
  logo: any
  comments: Comment[]
  isIssuedCertificate: boolean
  rateReviewCount: number
  rating: any[]
  isOnline: boolean
  description: string
  educationPeriod: number
  educationDuration: number
  hasEnrollment: boolean
  selfEnrollment: boolean
}