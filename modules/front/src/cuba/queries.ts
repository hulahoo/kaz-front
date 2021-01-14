import {CubaApp, FetchOptions} from "@cuba-platform/rest";
import {getCubaREST} from "@cuba-platform/react";
import {AssignedPerformancePlan, CardStatusEnum} from "./entities/base/tsadv$AssignedPerformancePlan";
import {PersonalDataRequest} from "./entities/base/tsadv$PersonalDataRequest";
import {PersonGroupExt} from "./entities/base/base$PersonGroupExt";

export var restQueries = {
  myKpiList: (userId: string) => {
    return getCubaREST()!.queryWithCount<AssignedPerformancePlan>(AssignedPerformancePlan.NAME, "list", {
      userId: userId
    });
  },
  myProfile: (userId: string) => {
    return getCubaREST()!.query<PersonalDataRequest>(PersonalDataRequest.NAME, "myProfile", {
      userId: userId
    }).then(response => {
      return response[0]
    })
  },
  personGroupInfo: (userId: string) => {
    return getCubaREST()!.query<PersonGroupExt>(PersonGroupExt.NAME, "personGroupInfo", {
      userId: userId
    }).then(response => {
      return response[0]
    })
  }
};
