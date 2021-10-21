import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { AbstractBprocRequest } from "./AbstractBprocRequest";
export class StartBprocParams extends BaseUuidEntity {
  static NAME = "tsadv_StartBprocParams";
  request?: AbstractBprocRequest | null;
  employeePersonGroupId?: any | null;
  isAssistant?: boolean | null;
}
export type StartBprocParamsViewName = "_base" | "_local" | "_minimal";
export type StartBprocParamsView<V extends StartBprocParamsViewName> = never;
