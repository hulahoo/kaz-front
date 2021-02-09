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
      courseInfo: (params: { courseId: string }): Promise<CourseInfo> => {
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
      getNotPersisitBprocActors: (param: { employee: UserExt | null, initiatorPersonGroupId: string, bpmRolesDefiner: BpmRolesDefiner }): Promise<Array<SerializedEntity<BpmRolesDefiner>>> => {
        return getCubaREST()!.invokeService(
          "tsadv_StartBprocService",
          "getNotPersisitBprocActors",
          {...param}
        ).then((value: string) => JSON.parse(value));
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
      startProcessInstanceByKey: (param: { processDefinitionKey: string, businessKey: string, variables: Map<string, any> }): Promise<void> => {
        return getCubaREST()!.invokeService(
          "bproc_BprocRuntimeService",
          "startProcessInstanceByKey",
          {...param}
        ).then((value: string) => JSON.parse(value));
      }
    },
    fileDownload: {
      download: (fileId: string) => {
        return getCubaREST()!.getFile(fileId)
          .then(value => value);
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
  comments: any[]
  isIssuedCertificate: boolean
  rateReviewCount: number
  rating: any[]
  isOnline: boolean
  description: string
  educationPeriod: number
  educationDuration: number
}