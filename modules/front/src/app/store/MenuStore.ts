import RootStore from "./RootStore";
import {action, observable} from "mobx";
import {RouteItem, SubMenu} from "@cuba-platform/react";
import {PersonalDataRequestManagement} from "../pages/PersonalDataRequest/PersonalDataRequestManagement";
import {CertificateRequestManagement} from "../../app/pages/certificateRequest/CertificateRequestManagement";
import {InsuredPersonManagement} from "../pages/MyDMC/InsuredPersonManagement";
import {AbsenceRequestManagement} from "../pages/absenceRequest/AbsenceRequestManagement";
import { ScheduleOffsetsRequestManagement } from "../pages/ScheduleOffsets/ScheduleOffsetsRequestManagement";

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
      {id: "main", caption: "Главная", menuLink: "/", pathPattern: "/", component: null},
      {
        id: "my-profile",
        caption: "Мой профиль",
        menuLink: "/my-profile",
        pathPattern: "/my-profile",
        component: null
      }, {
        id: "my-team",
        caption: "Моя команда",
        menuLink: "/my-team",
        pathPattern: "/my-team",
        component: null
      }, {
        id: "absenceRequest",
        caption: "Absence",
        menuLink: "/absenceRequest",
        pathPattern: "/absenceRequest",
        component: AbsenceRequestManagement
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
      {
        id: "vacation",
        caption: "Отпуска",
        items: [{id: "main", caption: "Главная", menuLink: "/", pathPattern: "/", component: null}],
      } as MenuSubMenu,
      {
        id: "my-education", caption: "Обучение", items: [
          {
            id: "course-catalog",
            caption: "Каталог курсов",
            menuLink: "/course",
            pathPattern: "/course",
            component: null
          },
          {id: "calendar", caption: "Каледнарь", menuLink: "/calendar", pathPattern: "/calendar", component: null},
          {
            id: "my-courses",
            caption: "Мои курсы",
            menuLink: "/my-course",
            pathPattern: "/my-course",
            component: null,
          },
          {
            id: "library",
            caption: "Библиотека",
            items: [{
              id: "books",
              caption: "Мои книги",
              menuLink: "/book",
              pathPattern: "/book",
              component: null
              // }, {
              //   id: "my-books",
              //   caption: "Мои книги",
              //   menuLink: "/my-books",
              //   pathPattern: "/my-books",
              //   component: null
            }]
          } as MenuSubMenu,
          {
            id: "learn-history",
            caption: "История обучения",
            menuLink: "/learning-history",
            pathPattern: "/learning-history",
            component: PersonalDataRequestManagement
          }
        ]
      } as MenuSubMenu,
      {id: "my-kpi", caption: "Мой KPI", menuLink: "/kpi", pathPattern: "/kpi", component: null},
      {
        id: "team-kpi",
        caption: "KPI команды",
        menuLink: "/kpi-team",
        pathPattern: "/kpi-team",
        component: null,
      },
      {
        id: "my-rating",
        caption: "Моя оценка",
        menuLink: "/my-rating",
        pathPattern: "/my-rating",
        component: null,
      },
      {
        id: "dmc-my",
        caption: "Мои ДМС",
        menuLink: "/my-dmc",
        pathPattern: "/my-dmc",
        component: InsuredPersonManagement,
      },
      {
        id: "schedule-offsets",
        caption: "График сменности",
        menuLink: "/schedule-offsets",
        pathPattern: "/schedule-offsets",
        component: ScheduleOffsetsRequestManagement,
      },
      {
        id: "team-rating",
        caption: "Оценка команды",
        menuLink: "/team-rating",
        pathPattern: "/team-rating",
        component: null,
      },
      {
        id: "my-app-vacation",
        caption: "Мои заявки на вакансию",
        menuLink: "/my-app-vacation",
        pathPattern: "/my-app-vacation",
        component: null,
      },
      {
        id: "assigment-interview",
        caption: "Назначенные интервью",
        menuLink: "/assigment-interview",
        pathPattern: "/assigment-interview",
        component: null,
      },
      {
        id: "job-offers",
        caption: "Job Offers",
        menuLink: "/job-offers",
        pathPattern: "/job-offers",
        component: null,
      }]
    // restServices.userMenuService.userMenuList().then((response: string) => {
    //   const menuIdList: string[] = JSON.parse(response);
    //   console.log(menuIdList);
    // });
  }
}