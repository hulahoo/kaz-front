import {CubaApp, FetchOptions, SerializedEntity} from "@cuba-platform/rest";
import {getCubaREST} from "@cuba-platform/react";
import {SortOrder} from "antd/lib/table/interface";
import {Course} from "./entities/base/tsadv$Course";
import moment from "moment";
import {AssignedGoal} from "./entities/base/tsadv$AssignedGoal";
import {DicCategory} from "./entities/base/tsadv$DicCategory";
import {CourseSection} from "./entities/base/tsadv$CourseSection";
import {TestModel} from "../app/components/Test/Test";

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
      return new Promise((resolve) => {
        resolve(JSON.parse('{\n' +
          '  "attemptId": "fd7b2ce0-560d-6d68-5008-10a6d40ccafa",\n' +
          '  "timer": 10,\n' +
          '  "testSections": [\n' +
          '    {\n' +
          '      "id": "3dd13d77-0f6b-a38f-d06e-7128bc4327a3",\n' +
          '      "name": "Раздел 1",\n' +
          '      "questionsAndAnswers": [\n' +
          '        {\n' +
          '          "id": "f02593c5-c228-978f-e056-5260370f9c06",\n' +
          '          "text": "На преобразовании какой энергии основана ядерная электроэнергетика?",\n' +
          '          "type": "MANY",\n' +
          '          "answers": [\n' +
          '            {\n' +
          '              "id": "d6b08d55-f4e8-8c44-19ac-42d663ea0f05",\n' +
          '              "text": "Природной энергии, включающая солнце, ветер"\n' +
          '            },\n' +
          '            {\n' +
          '              "id": "b9862ad5-6221-0471-d8ea-ecf1b45a6d04",\n' +
          '              "text": "Энергии водных масс в приливных движениях"\n' +
          '            },\n' +
          '            {\n' +
          '              "id": "e1e8d120-61a8-5c39-a730-39e786901ad0",\n' +
          '              "text": "Тепловой энергии в электрическую, путем использования ядерного топлива"\n' +
          '            },\n' +
          '            {\n' +
          '              "id": "8ad90315-1030-a22b-3dc1-2d14a70f1fea",\n' +
          '              "text": "Тепловой энергии в электрическую, путём сжигания органического топлива, такого как: нефть, газ, уголь"\n' +
          '            }\n' +
          '          ]\n' +
          '        },\n' +
          '        {\n' +
          '          "id": "e428d458-6710-ecc4-51c4-7620173ff67b",\n' +
          '          "text": "Выберите корректное определение Ядерного Топливного Цикла",\n' +
          '          "type": "ONE",\n' +
          '          "answers": [\n' +
          '            {\n' +
          '              "id": "ea30908f-f848-0b3e-615a-fc51a9d0721f",\n' +
          '              "text": "Это вся последовательность повторяющихся производственных процессов, начиная от геологоразведки и заканчивая производством топливных таблеток."\n' +
          '            },\n' +
          '            {\n' +
          '              "id": "78c49eb8-664a-5460-49e8-844dbb0e637b",\n' +
          '              "text": "Это вся последовательность повторяющихся производственных процессов, начиная от геологоразведки и заканчивая производством электроэнергии."\n' +
          '            },\n' +
          '            {\n' +
          '              "id": "ec689f6a-bda2-d44f-658c-f951ac18c20f",\n' +
          '              "text": "Это вся последовательность повторяющихся производственных процессов, начиная от геологоразведки и заканчивая обогащением до диоксида урана."\n' +
          '            },\n' +
          '            {\n' +
          '              "id": "a5461728-3c98-cd0a-d435-bc5e0e725088",\n' +
          '              "text": "Это вся последовательность повторяющихся производственных процессов, начиная от геологоразведки и заканчивая удалением радиоактивных отходов."\n' +
          '            }\n' +
          '          ]\n' +
          '        },\n' +
          '        {\n' +
          '          "id": "dd8c1c6d-5a93-c452-c403-1288ef8dbd0b",\n' +
          '          "text": "Какие этапы Ядерного Топливного Цикла покрывает деятельность АО «НАК «Казатомпром»?",\n' +
          '          "type": "ONE",\n' +
          '          "answers": [\n' +
          '            {\n' +
          '              "id": "5df915fd-0dfa-d37b-8152-bade54091d35",\n' +
          '              "text": "Геология и горно-подготовительные работы, Обогащение до диоксида урана, Производство топливных таблеток и тепловыделяющих сборок, Производство электроэнергии"\n' +
          '            },\n' +
          '            {\n' +
          '              "id": "09e25d3b-050d-2d89-fb36-9fed4c2b81fc",\n' +
          '              "text": "Геология и горно-подготовительные работы, Добыча и переработка до ЗОУ, Обогащение до диоксида урана, Производство топливных таблеток и тепловыделяющих сборок"\n' +
          '            },\n' +
          '            {\n' +
          '              "id": "178af213-3ada-6077-98a1-430b3450d33f",\n' +
          '              "text": "Геология и горно-подготовительные работы, Добыча и переработка до ЗОУ, Обогащение до диоксида урана, Производство топливных таблеток и тепловыделяющих сборок, Регенерация отработавшего ядерного топлива"\n' +
          '            },\n' +
          '            {\n' +
          '              "id": "84a8bea2-502c-c602-7fc1-439d8c094fcd",\n' +
          '              "text": "Геология и горно-подготовительные работы, Добыча и переработка до ЗОУ, Обогащение до диоксида урана, Производство топливных таблеток и тепловыделяющих сборок, Производство электроэнергии"\n' +
          '            }\n' +
          '          ]\n' +
          '        },\n' +
          '        {\n' +
          '          "id": "c4384f0d-1bed-762b-42c9-e7de89fdb749",\n' +
          '          "text": "Какого этапа нет в открытом Ядерном Топливном Цикле?",\n' +
          '          "type": "ONE",\n' +
          '          "answers": [\n' +
          '            {\n' +
          '              "id": "ebaeea63-adb7-ea38-4ad1-867284d41d27",\n' +
          '              "text": "Производство МОКС-топлива"\n' +
          '            },\n' +
          '            {\n' +
          '              "id": "348d9b8e-c576-fa90-6f59-f45a2725cc1b",\n' +
          '              "text": "Захоронение отработавшего ядерного топлива"\n' +
          '            },\n' +
          '            {\n' +
          '              "id": "95dc8137-a67c-3bdb-a03c-e3367b02eb71",\n' +
          '              "text": "Добыча и переработка до ЗОУ"\n' +
          '            },\n' +
          '            {\n' +
          '              "id": "7a84e33d-111b-04a2-b8f6-ac672af176a8",\n' +
          '              "text": "Регенерация отработавшего ядерного топлива"\n' +
          '            }\n' +
          '          ]\n' +
          '        }\n' +
          '      ]\n' +
          '    }\n' +
          '  ]\n' +
          '}'))
      })
      // return getCubaREST()!.invokeService(
      //   "tsadv_LmsService",
      //   "startAndLoadTest",
      //   {...params},
      //   fetchOpts
      // ).then((response: string) => {
      //   return JSON.parse(response)
      // });
    }
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