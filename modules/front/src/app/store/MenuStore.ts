import RootStore from "./RootStore";
import {action, observable} from "mobx";
import {restServices} from "../../cuba/services";
import {RouteItem, SubMenu} from "@cuba-platform/react";

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
    this.menuList = [{id: "main", caption: "Главная", menuLink: "/", pathPattern: "/", component: null},
      {
        id: "my-profile",
        caption: "Мой профиль",
        menuLink: "/my-profile",
        pathPattern: "/my-profile",
        component: null
      },      {
        id: "my-team",
        caption: "Моя команда",
        menuLink: "/my-team",
        pathPattern: "/my-team",
        component: null
      },
      {
        id: "help",
        caption: "Справка",
        items: [{id: "main", caption: "Главная", menuLink: "/", pathPattern: "/", component: null}],
      } as MenuSubMenu,
      {
        id: "leave",
        caption: "Отпуска",
        items: [{id: "main", caption: "Главная", menuLink: "/", pathPattern: "/", component: null}],
      } as MenuSubMenu,
      {id: "my-kpi", caption: "Мой KPI", menuLink: "/my-kpi", pathPattern: "/my-kpi", component: null},
      {
        id: "team-kpi",
        caption: "KPI команды",
        menuLink: "/team-kpi",
        pathPattern: "/team-kpi",
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
        id: "team-rating",
        caption: "Оценка команды",
        menuLink: "/team-rating",
        pathPattern: "/team-rating",
        component: null,
      },
      {id: "courses", caption: "Все курсы", menuLink: "/courses", pathPattern: "/courses", component: null},
      {
        id: "my-courses",
        caption: "Мои курсы",
        menuLink: "/my-courses",
        pathPattern: "/my-courses",
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