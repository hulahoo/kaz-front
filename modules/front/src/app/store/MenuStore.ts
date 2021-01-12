import RootStore from "./RootStore";
import {action, observable} from "mobx";
import {restServices} from "../../cuba/services";
import {RouteItem, SubMenu} from "@cuba-platform/react";

export default class MenuStore {
  root: RootStore;

  @observable menuList: Array<RouteItem | SubMenu> = [];

  constructor(root: RootStore) {
    this.root = root;
    this.loadUserMenuList();
  }

  @action
  loadUserMenuList = () => {
    this.menuList = [{caption: "Главная", menuLink: "/", pathPattern: "/", component: null},
      {
        caption: "Моя команда",
        menuLink: "/my-team",
        pathPattern: "/my-team",
        component: null
      },
      {
        caption: "Справка",
        items: [{caption: "Главная", menuLink: "/", pathPattern: "/", component: null}],
      },
      {
        caption: "Отпуска",
        items: [{caption: "Главная", menuLink: "/", pathPattern: "/", component: null}],
      },
      {caption: "Мой KPI", menuLink: "/my-kpi", pathPattern: "/my-kpi", component: null},
      {
        caption: "KPI команды",
        menuLink: "/team-kpi",
        pathPattern: "/team-kpi",
        component: null,
      },
      {
        caption: "Моя оценка",
        menuLink: "/my-rating",
        pathPattern: "/my-rating",
        component: null,
      },
      {
        caption: "Оценка команды",
        menuLink: "/team-rating",
        pathPattern: "/team-rating",
        component: null,
      },
      {caption: "Все курсы", menuLink: "/courses", pathPattern: "/courses", component: null},
      {
        caption: "Мои курсы",
        menuLink: "/my-courses",
        pathPattern: "/my-courses",
        component: null,
      },
      {
        caption: "Мои заявки на вакансию",
        menuLink: "/my-app-vacation",
        pathPattern: "/my-app-vacation",
        component: null,
      },
      {
        caption: "Назначенные интервью",
        menuLink: "/assigment-interview",
        pathPattern: "/assigment-interview",
        component: null,
      },
      {
        caption: "Job Offers",
        menuLink: "/job-offers",
        pathPattern: "/job-offers",
        component: null,
      }]
  }
}