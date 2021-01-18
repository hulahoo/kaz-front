import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class EventListenerModel extends BaseUuidEntity {
  static NAME = "bproc_EventListenerModel";
  className?: string | null;
  events?: string | null;
  entityType?: string | null;
  shortClassName?: string | null;
}
export type EventListenerModelViewName = "_base" | "_local" | "_minimal";
export type EventListenerModelView<
  V extends EventListenerModelViewName
> = never;
