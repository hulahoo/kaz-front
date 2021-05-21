import RootStore from "./RootStore";
import {action, observable} from "mobx";
import {RouteItem, SubMenu} from "@cuba-platform/react";
import {CertificateRequestManagement} from "../pages/CertificateRequest/CertificateRequestManagement";
import AbsenceList from "../pages/Absence/AbsenceList";
import {InsuredPersonManagement} from "../pages/MyDMC/InsuredPersonManagement";

export interface MenuRouteItem extends RouteItem {
  id: string,
}

export interface MenuSubMenu extends SubMenu {
  id: string,
  items: MenuRouteItem[] | MenuSubMenu[]
}

export default class MenuStore {
  root: RootStore;

  @observable menuList: Array<MenuRouteItem | MenuSubMenu> = [];

  constructor(root: RootStore) {
    this.root = root;
    this.loadUserMenuList();
  }

  @action
  loadUserMenuList = () => {
    this.menuList = [
      // {id: "main", caption: "Главная", menuLink: "/", pathPattern: "/", component: null},
      // {
      //   id: "my-profile",
      //   caption: "Мой профиль",
      //   menuLink: "/my-profile",
      //   pathPattern: "/my-profile",
      //   component: null
      // },
      //  {
      //    id: "my-team",
      //    caption: "Моя команда",
      //    menuLink: "/my-team",
      //    pathPattern: "/my-team",
      //    component: null
      //  },
      //  {
      //    id: "absence",
      //    caption: "Absence",
      //    menuLink: "/absence",
      //    pathPattern: "/absence",
      //    component: AbsenceList
      //  },
       {
         id: "dmc-my",
         caption: "Мои ДМС",
         menuLink: "/my-dmc",
         pathPattern: "/my-dmc",
         component: InsuredPersonManagement,
       },
       {
         id: "help",
         caption: "Справка",
         items: [
           {
             id: "certificateRequest",
             caption: "Справка с места работы",
             menuLink: "/certificateRequest",
             pathPattern: "/certificateRequest/:entityId?",
             component: CertificateRequestManagement
           }
         ],
       } as MenuSubMenu,
      // {
      //   id: "vacation",
      //   caption: "Отпуска",
      //   items: [{id: "main", caption: "Главная", menuLink: "/", pathPattern: "/", component: null}],
      // } as MenuSubMenu,
      {
        id: "my-education", caption: "Обучение",
        menuLink: "/my-education",
        pathPattern: "/my-education",
        component: AbsenceList
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
      }
    ]
    // restServices.userMenuService.userMenuList().then((response: string) => {
    //   const menuIdList: string[] = JSON.parse(response);
    //   console.log(menuIdList);
    // });
  }
}
