import {OperatorType, SerializedEntity} from "@cuba-platform/rest";

export interface Filter {
  property: string;
  operator: OperatorType;
  value: string;
}

export type EntitiesResult<T> = {
  entities: Array<SerializedEntity<T>>
  count: number
}

export type QuerySettings = {
  limit?: number;
  offset?: number;
  filter?: Filter[];
  sort?: string;
}