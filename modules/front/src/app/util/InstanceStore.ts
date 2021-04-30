import {DataInstanceOptions, DataInstanceStore, getCubaREST, getMainStore, MainStore} from "@cuba-platform/react";
import {PredefinedView, SerializedEntity} from "@cuba-platform/rest";
import {runInAction} from "mobx";
import {catchException} from "./util";
import Notification from "./Notification/Notification";

export class InstanceStore<T> extends DataInstanceStore<T> {
  queryName: string;
  params: any;
  commitFunction?: CommitFunction<T>;

  constructor(mainStore: MainStore, entityName: string, viewName: string = PredefinedView.MINIMAL, commitFunction?: CommitFunction<T>) {
    super(mainStore, entityName, viewName);
    this.commitFunction = commitFunction;

    if (this.commitFunction)
      this.commit = () => {
        if (this.item == null) {
          return Promise.reject();
        }
        this.status = 'LOADING';

        return catchException(this.commitFunction!(this.item).then(updatedEntity => {
          if (updatedEntity.id != null) {
            this.item!.id = updatedEntity.id;
          }
          this.status = 'DONE';
        })).catch(value => {
          Notification.error({
            message: value.message
          });
          this.status = 'ERROR';
          throw value;
        });
      };
  }

  load = async (id: string) => {
    this.item = undefined;
    if (!id) {
      return;
    }
    this.status = "LOADING";
    try {
      const loadedEntity = await getCubaREST()!.loadEntity(this.entityName, id, {view: this.viewName});
      runInAction(() => {
        this.item = (loadedEntity as SerializedEntity<T>);
        this.status = "DONE";

        this.afterLoad();
      });
    } catch (e) {
      runInAction(() => {
        this.status = "ERROR";
      });
    }
  };

  afterLoad = () => {

  }
}

type CommitFunction<T> = (item: T) => Promise<Partial<T & { id: string }>>

export function instanceStore<T>(entityName: string, opts: DataInstanceOptions, commit?: CommitFunction<T>): InstanceStore<T> {
  return new InstanceStore<T>(getMainStore(), entityName, (opts.view), commit);
}