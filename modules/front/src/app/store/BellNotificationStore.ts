import RootStore from "./RootStore";
import {action, observable} from "mobx";
import {restServices} from "../../cuba/services";

const scheduleNotificationTime: number = 10000;

export type BellNotification = {
  id: string,
  name: string,
  createTs: Date,
  code: string,
  link: string,
  entityId: string
}

class BellNotificationStore {
  rootStore: RootStore;

  @observable bellNotifications: BellNotification[];
  @observable bellTasks: BellNotification[];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action
  setBellNotifications = (value: BellNotification[]) => {
    this.bellNotifications = value;
  }

  @action
  setBellTasks = (value: BellNotification[]) => {
    this.bellTasks = value;
  }

  @action
  loadBellNotifications = () => {
    const loadNotifications = () => {
      restServices.notificationsService.notifications().then((r: string) => {
        const notifications: BellNotification[] = [];

        (JSON.parse(r) as BellNotification[]).forEach(e => {
          e.createTs = new Date(e.createTs);
          notifications.push(e);
        });

        this.setBellNotifications(notifications);
      });

      restServices.notificationsService.tasks().then((r: string) => {
        const tasks: BellNotification[] = [];

        (JSON.parse(r) as BellNotification[]).forEach(e => {
          e.createTs = new Date(e.createTs);
          tasks.push(e);
        });

        this.setBellTasks(tasks);
      });
    };

    loadNotifications();
    setInterval(loadNotifications, scheduleNotificationTime);
  }

}

export default BellNotificationStore;