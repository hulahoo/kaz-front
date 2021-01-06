import {CubaApp, FetchOptions} from "@cuba-platform/rest";
import {getCubaREST} from "@cuba-platform/react";
import {AssignedPerformancePlan, CardStatusEnum} from "./entities/base/tsadv$AssignedPerformancePlan";

export var restQueries = {
  myKpiList: (userId: string) => {
    return getCubaREST()!.queryWithCount<AssignedPerformancePlan>(AssignedPerformancePlan.NAME, "list", {
      userId: userId
    });
  }
};
