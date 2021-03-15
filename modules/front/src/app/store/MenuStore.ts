import RootStore from "./RootStore";
import {action, observable} from "mobx";
import {RouteItem, SubMenu} from "@cuba-platform/react";
import {PersonalDataRequestManagement} from "../pages/PersonalDataRequest/PersonalDataRequestManagement";
import {CertificateRequestManagement} from "../pages/CertificateRequest/CertificateRequestManagement";
import {InsuredPersonManagement} from "../pages/MyDMC/InsuredPersonManagement";
import {ScheduleOffsetsRequestManagement} from "../pages/ScheduleOffsets/ScheduleOffsetsRequestManagement";
import AbsenceList from "../pages/Absence/AbsenceList";

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
      {
        id: "main",
        caption: "Главная",
        items: [
          {
            id: "welcome",
            caption: "Добро пожаловать",
            menuLink: "/welcome",
            pathPattern: "/welcome",
            component: null
          }, {
            id: "information-desk",
            caption: "Информационная доска",
            menuLink: "/information-desk",
            pathPattern: "/information-desk",
            component: null
          }, {
            id: "birthday",
            caption: "Сегодня день рождения",
            menuLink: "/birthday",
            pathPattern: "/birthday",
            component: null
          }, {
            id: "new-employee",
            caption: "Новые работники месяца",
            menuLink: "/new-employee",
            pathPattern: "/new-employee",
            component: null
          }
        ],
      } as MenuSubMenu,
      {
        id: "my-profile",
        caption: "Мой профиль",
        items: [
          {
            id: "profile",
            caption: "Добро пожаловать",
            menuLink: "/my-profile",
            pathPattern: "/my-profile"
          },
          {
            id: "my-hr-request",
            caption: "Мои HR заявки",
            items: [
              {
                id: "request-update-personal-records",
                caption: "Заявка на изменение личных данных",
                menuLink: "/request-update-personal-records",
                pathPattern: "/request-update-personal-records"
              }, {
                id: "vacation-schedule",
                caption: "График отпуска",
                menuLink: "/vacation-schedule",
                pathPattern: "/vacation-schedule"
              }, {
                id: "leave-request",
                caption: "Заявка на отпуск и отсутствия",
                menuLink: "/leave-request",
                pathPattern: "/leave-request"
              }, {
                id: "job-confirmation-letter",
                caption: "Справка с места работы",
                menuLink: "/job-confirmation-letter",
                pathPattern: "/job-confirmation-letter"
              }, {
                id: "request-end-unpaid-child-care-leave",
                caption: "Заявка на выход из отпуска по уходу за ребенком",
                menuLink: "/request-end-unpaid-child-care-leave",
                pathPattern: "/request-end-unpaid-child-care-leave"
              }, {
                id: "medical-insurance",
                caption: "Добровольное медицинское страхование",
                menuLink: "/medical-insurance",
                pathPattern: "/medical-insurance"
              }
            ],
          } as MenuSubMenu
        ],
      } as MenuSubMenu,
      {
        id: "my-team",
        caption: "Моя команда",
        items: [
          {
            id: "employee-profile",
            caption: "Профиль сотрудника",
            items: [
              {
                id: "personal-information",
                caption: "Добровольное медицинское страхование",
                menuLink: "/personal-information",
                pathPattern: "/medical-insurance"
              }, {
                id: "work-experience-qualification",
                caption: "Добровольное медицинское страхование",
                menuLink: "/work-experience-qualification",
                pathPattern: "/work-experience-qualification"
              }, {
                id: "assignments",
                caption: "Добровольное медицинское страхование",
                menuLink: "/assignments",
                pathPattern: "/assignments"
              }, {
                id: "working-time-management",
                caption: "Добровольное медицинское страхование",
                menuLink: "/working-time-management",
                pathPattern: "/working-time-management"
              }, {
                id: "c-b",
                caption: "Добровольное медицинское страхование",
                menuLink: "/c-b",
                pathPattern: "/c-b"
              }
            ]
          } as MenuSubMenu,
        ]
      } as MenuSubMenu,
      {
        id: "hr-request-manager",
        caption: "Главная",
        items: [
          {
            id: "org-structure-request",
            caption: "Заявка по Орг.структуре",
            menuLink: "/org-structure-request",
            pathPattern: "/org-structure-request",
            component: null,
          }, {
            id: "vacation-recall-request",
            caption: "Информационная доска",
            menuLink: "/vacation-recall-request",
            pathPattern: "/vacation-recall-request",
            component: null
          }, {
            id: "vacation-change-request",
            caption: "Сегодня день рождения",
            menuLink: "/vacation-change-request",
            pathPattern: "/vacation-change-request",
            component: null
          }, {
            id: "working-schedule",
            caption: "Новые работники месяца",
            menuLink: "/working-schedule",
            pathPattern: "/working-schedule",
            component: null
          }, {
            id: "temporary-transfer-day",
            caption: "Новые работники месяца",
            menuLink: "/temporary-transfer-day",
            pathPattern: "/temporary-transfer-day",
            component: null
          }, {
            id: "vacation-schedule",
            caption: "Новые работники месяца",
            menuLink: "/vacation-schedule",
            pathPattern: "/vacation-schedule",
            component: null
          }
        ],
      } as MenuSubMenu,
      // {
      //   id: "absence",
      //   caption: "Absence",
      //   menuLink: "/absence",
      //   pathPattern: "/absence",
      //   component: AbsenceList
      // },
      // {
      //   id: "help",
      //   caption: "Справка",
      //   items: [
      //     {
      //       id: "certificateRequest",
      //       caption: "Справка с места работы",
      //       menuLink: "/certificateRequest",
      //       pathPattern: "/certificateRequest/:entityId?",
      //       component: CertificateRequestManagement
      //     }
      //   ],
      // } as MenuSubMenu,
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
      //   id: "dmc-my",
      //   caption: "Мои ДМС",
      //   menuLink: "/my-dmc",
      //   pathPattern: "/my-dmc",
      //   component: InsuredPersonManagement,
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
      // }
      ]
    // restServices.userMenuService.userMenuList().then((response: string) => {
    //   const menuIdList: string[] = JSON.parse(response);
    //   console.log(menuIdList);
    // });
  }
}