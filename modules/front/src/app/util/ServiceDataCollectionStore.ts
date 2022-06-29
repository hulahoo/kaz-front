import {DataCollectionStore} from "@cuba-platform/react";
import {runInAction} from "mobx";
import {EntitiesResult, Filter, QuerySettings} from "../components/querySettings";
import {Condition} from "@cuba-platform/rest/dist-node/filter";

export type PaginationServiceFunction<T> = (querySettings: QuerySettings) => Promise<T | Array<T> | EntitiesResult<T>>;

export class ServiceDataCollectionStore<T> extends DataCollectionStore<T> {

  constructor(service: PaginationServiceFunction<T>, entityName?: string) {
    super(entityName || "");
    this.load = () => {
      this.changedItems.clear();
      this.status = "LOADING";
      this.loading(service(this.getQuerySettings()));
    };
  }

  getQuerySettings = (): QuerySettings => {
    const querySettings = {
      limit: this.limit,
      offset: this.offset,
      sort: this.sort,
    } as QuerySettings;

    if (this.filter) querySettings.filter = this.filter.conditions.map((value: Condition) => {
      console.log(value);
      return {
        property: value.property,
        operator: value.operator,
        value: (value.value && value.value.constructor.name == "ObservableArray" ? (value.value as string[] | number[]).join(',') : value.value)
      } as Filter
    });
    return querySettings;
  }

  loading = (promise: Promise<T | Array<T> | EntitiesResult<T>>) => {
    promise
      .then((resp: any) => {
        runInAction(() => {
          this.items = resp.entities || resp;
          if (resp.count) this.count = resp.count;
          this.status = 'DONE';
          this.afterLoad();
        });
      })
      .catch(() => {
        runInAction(() => {
          this.status = 'ERROR';
        });
      });
  }

  afterLoad = () => {

  }
}

export function serviceCollection<T>(service: PaginationServiceFunction<T>, entityName?: string): ServiceDataCollectionStore<T> {
  return new ServiceDataCollectionStore<T>(service, entityName);
}