import {DataCollectionStore} from "@cuba-platform/react";
import {runInAction} from "mobx";

type ServiceFunction<T> = () => Promise<T | Array<T>>

export class ServiceDataCollectionStore<T> extends DataCollectionStore<T> {

  constructor(service: ServiceFunction<T>, entityName?: string) {
    super(entityName || "");
    this.load = () => {
      this.changedItems.clear();
      this.status = "LOADING";
      this.loading(service());
    };
  }

  loading = (promise: Promise<T | Array<T>>) => {
    promise
      .then((resp: any) => {
        runInAction(() => {
          this.items = resp;
          // this.count = resp.count;
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

export function serviceCollection<T>(service: ServiceFunction<T>, entityName?: string): ServiceDataCollectionStore<T> {
  return new ServiceDataCollectionStore<T>(service, entityName);
}