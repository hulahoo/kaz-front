import {DataCollectionStore} from "@cuba-platform/react";
import {runInAction} from "mobx";
import {EntitiesPaginationResult, ServicePagination} from "../../cuba/services";

export type PaginationServiceFunction<T> = (Pagination: ServicePagination) => Promise<T | Array<T> | EntitiesPaginationResult<T>>;

// type ServiceFunction<T> = () => Promise<T | Array<T>>;

export class ServiceDataCollectionStore<T> extends DataCollectionStore<T> {

  constructor(service: PaginationServiceFunction<T>, entityName?: string) {
    super(entityName || "");
    this.load = () => {
      this.changedItems.clear();
      this.status = "LOADING";
      this.loading(service({limit: this.limit || 10, offset: this.offset || 0}));
    };
  }

  loading = (promise: Promise<T | Array<T> | EntitiesPaginationResult<T>>) => {
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