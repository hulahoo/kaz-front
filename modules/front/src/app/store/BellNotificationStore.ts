import RootStore from "./RootStore";
import {action, observable} from "mobx";
import {restServices} from "../../cuba/services";

const scheduleNotificationTime: number = 10000;

const taskCode = "KPI_APPROVE";
const notificationCode = "NOTIFICATION";

export type BellNotification = {
  id: string,
  name: string,
  createTs: Date,
  code: string
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
  loadBellNotificationsAndTasks = () => {
    const loadNotifications = () => {
      restServices.notificationsService.notifications().then((r: string) => {
        const notifications: BellNotification[] = [];
        const tasks: BellNotification[] = [];

        (JSON.parse(r) as BellNotification[]).forEach(e => {
          e.createTs = new Date(e.createTs);
          if (e.code === notificationCode) {
            notifications.push(e);
          } else {
            tasks.push(e);
          }
        });

        this.setBellNotifications(notifications);
        this.setBellTasks(tasks);
      });
    };
    loadNotifications();
    setInterval(loadNotifications, scheduleNotificationTime);
  }
}

export default BellNotificationStore;