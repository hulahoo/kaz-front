import {DataInstanceOptions, DataInstanceStore, getCubaREST, getMainStore, MainStore} from "@cuba-platform/react";
import {PredefinedView, SerializedEntity} from "@cuba-platform/rest";
import {observable, runInAction, toJS} from "mobx";

export class InstanceStore<T> extends DataInstanceStore<T> {
  queryName: string;
  params: any;

  constructor(mainStore: MainStore, entityName: string, viewName: string = PredefinedView.MINIMAL) {
    super(mainStore, entityName, viewName);
  }

  load = (id: string) => {
    this.item = undefined;
    if (!id) {
      return;
    }
    this.status = "LOADING";
    getCubaREST()!.loadEntity(this.entityName, id, {view: this.viewName})
      .then((loadedEntity) => {
        runInAction(() => {
          this.item = (loadedEntity as SerializedEntity<T>);
          this.status = "DONE";

          this.afterLoad();
        });
      })
      .catch(() => {
        runInAction(() => {
          this.status = "ERROR";
        });
      });
  };

  afterLoad = () => {

  }
}

export function instanceStore<T>(entityName: string, opts: DataInstanceOptions): InstanceStore<T> {
  return new InstanceStore<T>(getMainStore(), entityName, (opts.view));
}