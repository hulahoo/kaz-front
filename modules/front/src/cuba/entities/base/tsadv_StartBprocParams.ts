import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { TsadvUser } from "./tsadv$UserExt";
import { AbstractBprocRequest } from "./AbstractBprocRequest";
export class StartBprocParams extends BaseUuidEntity {
  static NAME = "tsadv_StartBprocParams";
  employee?: TsadvUser | null;
  request?: AbstractBprocRequest | null;
  initiatorPersonGroupId?: any | null;
}
export type StartBprocParamsViewName = "_base" | "_local" | "_minimal";
export type StartBprocParamsView<V extends StartBprocParamsViewName> = never;
