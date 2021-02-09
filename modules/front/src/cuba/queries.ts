import {getCubaREST} from "@cuba-platform/react";
import {AssignedPerformancePlan} from "./entities/base/tsadv$AssignedPerformancePlan";
import {PersonalDataRequest} from "./entities/base/tsadv$PersonalDataRequest";
import {PersonGroupExt} from "./entities/base/base$PersonGroupExt";
import {AssignmentExt} from "./entities/base/base$AssignmentExt";
import moment from "moment";
import {PersonExt} from "./entities/base/base$PersonExt";
import {AssignedGoal} from "./entities/base/tsadv$AssignedGoal";
import {SerializedEntity} from "@cuba-platform/rest";
import {DicCategory} from "./entities/base/tsadv$DicCategory";
import {Enrollment} from "./entities/base/tsadv$Enrollment";
import {PerformancePlan} from "./entities/base/tsadv$PerformancePlan";

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
  },
  kpiAssignedGoals: (appId: string): Promise<SerializedEntity<AssignedGoal>[]> => {
    return getCubaREST()!.query<AssignedGoal>(AssignedGoal.NAME, "kpiAssignedGoals", {
      appId: appId,
    })
  },
  searchCourses: (courseName: string): Promise<SerializedEntity<DicCategory>[]> => {
    return getCubaREST()!.query<DicCategory>(DicCategory.NAME, "searchCourses", {
      courseName: courseName,
    })
  },
  enrollment: (id: string): Promise<SerializedEntity<Enrollment>[]> => {
    return getCubaREST()!.query<Enrollment>(Enrollment.NAME, "enrollment", {
      id: id,
    })
  },
  kpiTeamList: (personGroupId: string): Promise<SerializedEntity<AssignedPerformancePlan>[]> => {
    return getCubaREST()!.query<AssignedPerformancePlan>(AssignedPerformancePlan.NAME, "kpiTeam", {
      personGroupId: personGroupId,
    })
  },
  kpiTeamPerformancePlans: (personGroupId: string): Promise<SerializedEntity<PerformancePlan>[]> => {
    return getCubaREST()!.query<PerformancePlan>(PerformancePlan.NAME, "kpiTeamPerformancePlans", {
      personGroupId: personGroupId,
    })
  },
  kpiTeam: (personGroupId: string, performancePlanId: string): Promise<SerializedEntity<AssignedPerformancePlan>[]> => {
    return getCubaREST()!.query<AssignedPerformancePlan>(AssignedPerformancePlan.NAME, "kpiTeamPerformancePlan", {
      personGroupId: personGroupId,
      performancePlanId: performancePlanId,
    })
  }
};