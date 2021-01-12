import {FetchOptions} from "@cuba-platform/rest";
import {getCubaREST} from "@cuba-platform/react";
import {DEFAULT_DATE_PARSE_FORMAT, DefaultRestParams} from "../services";
import {CardStatusEnum} from "../entities/base/tsadv$AssignedPerformancePlan";
import moment from "moment";
import {GoalData} from "../../app/store/KpiStore";
import {Category} from "../../app/store/DefaultGoalStore";

export type EditResponse = {
  personFullName: string,
  positionName: string,
  orgName: string,
  compName: string,
  gradeName: string,
  managerName: string,
  startDate: moment.Moment,
  endDate: moment.Moment,
  status: CardStatusEnum,
}

export const kpiService = {
  myKpiList: (params?: DefaultRestParams, fetchOpts?: FetchOptions): Promise<any[]> => {
    return getCubaREST()!.invokeService(
      "tsadv_KpiService",
      "loadUsersPerformancePlans",
      {...params},
      fetchOpts
    ).then((response: string) => {
      return JSON.parse(response);
    });

  },
  myKpiListCount: (params?: DefaultRestParams, fetchOpts?: FetchOptions): Promise<number> => {
    return getCubaREST()!.invokeService(
      "tsadv_KpiService",
      "countUsersPerformancePlans",
      {...params},
      fetchOpts
    );
  },
  edit: async (): Promise<EditResponse> => {
    return await new Promise((resolve, reject) => {
      resolve(`{
              "personFullName": "Аубакиров Биржан Маратович",
              "positionName": "Разработчик",
              "orgName": "Моё подразделение",
              "compName": "Моя компания",
              "gradeName": "Случайный грейд",
              "managerName": "Манагер-руководитель",
              "startDate": "2020-01-05",
              "endDate": "2020-01-04",
              "status": "DRAFT"
        }`);
    }).then((response: string) => {
      const parsed: EditResponse = JSON.parse(response);
      parsed.startDate = moment(parsed.startDate, DEFAULT_DATE_PARSE_FORMAT);
      parsed.endDate = moment(parsed.endDate, DEFAULT_DATE_PARSE_FORMAT);
      return parsed;
    });
  },
  goals: async (): Promise<GoalData[]> => {
    return await new Promise<string>((resolve, reject) => {
      resolve(`[{
  "categoryName":"Производство / операционные задачи",
  "goals": [{
    "id":"5419bc86-e718-4b5c-acd5-59938bc4a9f0",
    "rowNumber":1,
    "name":"Цель 1",
    "weight":"20",
    "comment":"Это тестовый комментарий для проверки работы таблицы,"
  },{
    "id":"5419bc86-e718-4b5c-acd5-59938bc4a9f0",
    "rowNumber":1,
    "name":"Цель 2",
    "weight":"30",
    "comment":"Это тестовый комментарий для проверки работы таблицы,"
  },{
    "id":"5419bc86-e718-4b5c-acd5-59938bc4a9f0",
    "rowNumber":1,
    "name":"Цель 3",
    "weight":"30",
    "comment":"Это тестовый комментарий для проверки работы таблицы,"
  },{
    "id":"5419bc86-e718-4b5c-acd5-59938bc4a9f0",
    "rowNumber":1,
    "name":"Цель 4",
    "weight":"30",
    "comment":"Это тестовый комментарий для проверки работы таблицы,"
  },{
    "id":"5419bc86-e718-4b5c-acd5-59938bc4a9f0",
    "rowNumber":1,
    "name":"Цель 5",
    "weight":"30",
    "comment":"Это тестовый комментарий для проверки работы таблицы,"
  }]
},{
  "categoryName":"Тестовая категория для проверки",
  "goals": [{
    "id":"5419bc86-e718-4b5c-acd5-59938bc4a9f0",
    "rowNumber":1,
    "name":"Цель 1",
    "weight":"20",
    "comment":"Это тестовый комментарий для проверки работы таблицы,"
  },{
    "id":"5419bc86-e718-4b5c-acd5-59938bc4a9f0",
    "rowNumber":1,
    "name":"Цель 2",
    "weight":"30",
    "comment":"Это тестовый комментарий для проверки работы таблицы,"
  },{
    "id":"5419bc86-e718-4b5c-acd5-59938bc4a9f0",
    "rowNumber":1,
    "name":"Цель 3",
    "weight":"30",
    "comment":"Это тестовый комментарий для проверки работы таблицы,"
  },{
    "id":"5419bc86-e718-4b5c-acd5-59938bc4a9f0",
    "rowNumber":1,
    "name":"Цель 4",
    "weight":"30",
    "comment":"Это тестовый комментарий для проверки работы таблицы,"
  },{
    "id":"5419bc86-e718-4b5c-acd5-59938bc4a9f0",
    "rowNumber":1,
    "name":"Цель 5",
    "weight":"30",
    "comment":"Это тестовый комментарий для проверки работы таблицы,"
  }]
},{
  "categoryName":"Супер категория",
  "goals": [{
    "id":"5419bc86-e718-4b5c-acd5-59938bc4a9f0",
    "rowNumber":1,
    "name":"Цель 1",
    "weight":"20",
    "comment":"Это тестовый комментарий для проверки работы таблицы,"
  },{
    "id":"5419bc86-e718-4b5c-acd5-59938bc4a9f0",
    "rowNumber":1,
    "name":"Цель 2",
    "weight":"30",
    "comment":"Это тестовый комментарий для проверки работы таблицы,"
  },{
    "id":"5419bc86-e718-4b5c-acd5-59938bc4a9f0",
    "rowNumber":1,
    "name":"Цель 3",
    "weight":"30",
    "comment":"Это тестовый комментарий для проверки работы таблицы,"
  },{
    "id":"5419bc86-e718-4b5c-acd5-59938bc4a9f0",
    "rowNumber":1,
    "name":"Цель 4",
    "weight":"30",
    "comment":"Это тестовый комментарий для проверки работы таблицы,"
  },{
    "id":"5419bc86-e718-4b5c-acd5-59938bc4a9f0",
    "rowNumber":1,
    "name":"Цель 5",
    "weight":"30",
    "comment":"Это тестовый комментарий для проверки работы таблицы,"
  }]
}]`);
    }).then(response => {
      return JSON.parse(response);
    });
  },
  goalCategories: async ():Promise<Category[]> => {
    return await new Promise<string>((resolve, reject) => {
      resolve(`[
  {
    "id": 1,
    "name": "Категория 1"
  },
  {
    "id": 2,
    "name": "Категория 2"
  },
  {
    "id": 3,
    "name": "Категория 3"
  },
  {
    "id": 4,
    "name": "Категория 4"
  },
  {
    "id": 5,
    "name": "Категория 5"
  },
  {
    "id": 6,
    "name": "Категория 6"
  }
]`);
    }).then(response => {
      return JSON.parse(response);
    });
  }
}