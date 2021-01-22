import {getCubaREST} from "@cuba-platform/react";
import {AssignedPerformancePlan} from "./entities/base/tsadv$AssignedPerformancePlan";
import {PersonalDataRequest} from "./entities/base/tsadv$PersonalDataRequest";
import {PersonGroupExt} from "./entities/base/base$PersonGroupExt";
import {AssignmentExt} from "./entities/base/base$AssignmentExt";
import moment from "moment";
import {PersonExt} from "./entities/base/base$PersonExt";

export var restQueries = {
  myKpiList: (userId: string) => {
    return getCubaREST()!.queryWithCount<AssignedPerformancePlan>(AssignedPerformancePlan.NAME, "list", {
      userId: userId
    });
  },
  myProfile: (userId: string) => {
    return getCubaREST()!.query<PersonExt>(PersonExt.NAME, "myProfile", {
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
  },
  currentUserAssignment: (userId: string): Promise<AssignmentExt> => {
    return getCubaREST()!.query<AssignmentExt>(AssignmentExt.NAME, "currentUserAssignment", {
      userId: userId,
      currentDate: moment.now()
    }).then(response => {
      return response[0]
    })
  }
};