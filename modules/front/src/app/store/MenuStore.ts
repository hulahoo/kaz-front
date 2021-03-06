import RootStore from "./RootStore";
import {action, observable} from "mobx";
import {RouteItem, SubMenu} from "@cuba-platform/react";
import {PortalMenuCustomization} from "../../cuba/entities/base/tsadv_PortalMenuCustomization";

export interface MenuRouteItem extends RouteItem {
  id: string,
}

export interface MenuSubMenu extends SubMenu {
  id: string,
  items: (MenuRouteItem | MenuSubMenu)[]
}

export default class MenuStore {
  root: RootStore;

  @observable menuList: Array<MenuRouteItem | MenuSubMenu> = [];

  @observable menuCustomization: Array<PortalMenuCustomization> = [];

  constructor(root: RootStore) {
    this.root = root;
    this.loadUserMenuList();
    this.loadUserMenuCustomization();
  }

  @action
  loadUserMenuCustomization = async () => {
    debugger
    await this.root.cubaRest!.invokeService<string>(
      "tsadv_PortalHelperService",
      "getPortalMenu",
      {menuType: 'P'}
    ).then(value => JSON.parse(value))
      .then(value => this.menuCustomization = value)
    return null
  }

  @action
  loadUserMenuList = () => {
    this.menuList = [
      {id: "main", caption: "Главная", menuLink: "/", pathPattern: "/", component: null},
      {
        id: "my-profile",
        caption: "Мой профиль",
        menuLink: "/my-profile",
        pathPattern: "/my-profile",
        component: null
      },
      {
        id: "my-team",
        caption: "Моя команда",
        menuLink: "/my-team",
        pathPattern: "/my-team",
        component: null
      },
      {
        id: "assistant-team",
        caption: "Assistant team",
        menuLink: "/assistant-team",
        pathPattern: "/assistant-team",
        component: null
      },
      {
        id: "absence",
        caption: "Absence",
        menuLink: "/absence",
        pathPattern: "/absence",
        component: null
      },
      {
        id: "vacationSchedule",
        caption: "vacationSchedule",
        menuLink: "/vacationSchedule",
        pathPattern: "/vacationSchedule",
        component: null
      },
      {
        id: "dmc-my",
        caption: "Мои ДМС",
        menuLink: "/my-dmc",
        pathPattern: "/my-dmc",
        component: null,
      },
      {
        id: "certificateRequest",
        caption: "Справка с места работы",
        menuLink: "/certificateRequest",
        pathPattern: "/certificateRequest/:entityId?",
        component: null
      },
      {
        id: "personPayslip",
        caption: "personPayslip",
        menuLink: "/personPayslip",
        pathPattern: "/personPayslip",
        component: null,
      },
      {
        id: "my-education", caption: "Обучение",
        menuLink: "/my-education",
        pathPattern: "/my-education",
        component: null
      },
      {
        id: "kpi",
        caption: "Отпуска",
        items: [{id: "my-kpi", caption: "Мой KPI", menuLink: "/kpi", pathPattern: "/kpi", component: null}, {
          id: "team-kpi",
          caption: "KPI команды",
          menuLink: "/kpi-team",
          pathPattern: "/kpi-team",
          component: null,
        }],
      },

      {
        id: "concourse-menu",
        caption: "Конкурс проектов",
        items: [{id: "concourseManagement", caption: "Конкурс проектов", menuLink: "/concourseManagement", pathPattern: "/concourseManagement", component: null}, {
          id: "concourseRequest", caption: "Мои заявки",
          menuLink: "/concourseRequest",
          pathPattern: "/concourseRequest",
          component: null
        },]
      },

      {
        id: "position-hierarchy", caption: "Штатное расписание",
        menuLink: "/position-hierarchy",
        pathPattern: "/position-hierarchy",
        component: null
      },
      // {
      //   id: "my-rating",
      //   caption: "Моя оценка",
      //   menuLink: "/my-rating",
      //   pathPattern: "/my-rating",
      //   component: null,
      // },
      // {
      //   id: "schedule-offsets",
      //   caption: "График сменности",
      //   menuLink: "/schedule-offsets",
      //   pathPattern: "/schedule-offsets",
      //   component: ScheduleOffsetsRequestManagement,
      // },
      // {
      //   id: "team-rating",
      //   caption: "Оценка команды",
      //   menuLink: "/team-rating",
      //   pathPattern: "/team-rating",
      //   component: null,
      // },
      // {
      //   id: "my-app-vacation",
      //   caption: "Мои заявки на вакансию",
      //   menuLink: "/my-app-vacation",
      //   pathPattern: "/my-app-vacation",
      //   component: null,
      // },
      // {
      //   id: "assigment-interview",
      //   caption: "Назначенные интервью",
      //   menuLink: "/assigment-interview",
      //   pathPattern: "/assigment-interview",
      //   component: null,
      // },
      // {
      //   id: "job-offers",
      //   caption: "Job Offers",
      //   menuLink: "/job-offers",
      //   pathPattern: "/job-offers",
      //   component: null,
      // },
      {
        id: "orgStructureRequest",
        caption: "Заявка по Орг.структуре",
        menuLink: "/orgStructureRequest",
        pathPattern: "/orgStructureRequest",
        component: null,
      },
      {
        id: "incentive",
        caption: "Incentive",
        menuLink: "/incentive",
        pathPattern: "/incentive",
        component: null,
      }
    ]
  }
}
