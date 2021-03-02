import * as React from "react";
import "./App.css";

import {Layout, Menu} from "antd";
import {inject, observer} from "mobx-react";
import Login from "./login/Login";
import Centered from "./common/Centered";
import AppHeader from "./header/AppHeader";
import {NavLink, Route, Switch} from "react-router-dom";
import HomePage from "./home/HomePage";
import {menuItems} from "../routing";
import {injectMainStore, MainStoreInjected, RouteItem, SubMenu} from "@cuba-platform/react";
import {CenteredLoader} from "./CenteredLoader";
import {injectIntl, IntlFormatters, WrappedComponentProps} from "react-intl";
import {getMenuIcon} from '../resources/icons/menu';
import {MenuRouteItem, MenuSubMenu} from "./store/MenuStore";
import UserSettings from "./pages/UserSettings/UserSettings";
import {RootStoreProp} from "./store";
import MyKpiPage from "./pages/MyKpi/MyKpiPage";
import {PersonDocumentManagement} from "./pages/PersonDocument/PersonDocumentManagement";
import {PersonContactManagement} from "./pages/PersonContact/PersonContactManagement";
import {AssignedPerformancePlanManagement} from "./pages/Kpi/AssignedPerformancePlanManagement";
import {AssignedGoalManagement} from "./pages/AssignedGoals/IndividualGoal/AssignedGoalManagement";
import {LibraryAssignedGoalManagement} from "./pages/AssignedGoals/LibraryGoal/LibraryAssignedGoalManagement";
import LearningHistory from "./pages/LearningHistory";
import {CourseManagement} from "./pages/Course/CourseManagement";
import {EnrollmentManagement} from "./pages/MyCourse/EnrollmentManagement";
import {KpiTeamManagement} from "./pages/KpiTeam/KpiTeamManagement";
import PersonalDataRequestEditPage from "./pages/PersonalDataRequest/PersonalDataRequestEditPage";
import {BooksManagement} from "./pages/Books/BooksManagement";
import {InsuredPersonManagement} from "./pages/MyDMC/InsuredPersonManagement";
import {ScheduleOffsetsRequestManagement} from "./pages/ScheduleOffsets/ScheduleOffsetsRequestManagement";
import {CertificateRequestManagement} from "./pages/CertificateRequest/CertificateRequestManagement";
import {ActivityManagement} from "./pages/Activity/ActivityManagement";
import {AbsenceRequestManagement} from "./pages/AbsenceRequest/AbsenceRequestManagement";
import AbsenceList from "./pages/Absence/AbsenceList";
import {LeavingVacationRequestManagement} from "./pages/LeavingVacationRequest/LeavingVacationRequestManagement";
import {CascadeGoalManagement} from "./pages/AssignedGoals/CascadeGoal/CascadeGoalManagement";
import {VacationScheduleRequestManagement} from "./pages/VacationScheduleRequest/VacationScheduleRequestManagement";

@injectMainStore
@inject("rootStore")
@observer
class AppComponent extends React.Component<MainStoreInjected & WrappedComponentProps & RootStoreProp> {
  render() {
    const {initialized, locale, loginRequired, metadata} = this.props.mainStore!;

    if (!initialized || !locale || !this.props.rootStore!.userInfo.initialized) {
      return <CenteredLoader/>;
    }

    if (loginRequired) {
      return (
        <div>
          <Centered>
            <Login/>
          </Centered>
        </div>
      );
    }

    if (!metadata) {
      return <CenteredLoader/>;
    }

    const menuIdx = 1;
    return (
      <Layout className="main-layout">
        <Layout.Header>
          <AppHeader/>
        </Layout.Header>
        <Layout>
          <Layout.Sider
            width={200}
            breakpoint="sm"
            collapsedWidth={0}
            style={{background: "#fff"}}
          >
            <Menu mode="inline" style={{height: "100%", borderRight: 0}} className={"side-menu"}>
              {menuItems.map((item, idx) =>
                this.menuItem(item, "" + (idx + 1 + menuIdx), this.props.intl)
              )}
            </Menu>
          </Layout.Sider>
          <Layout>
            <Layout.Content>
              <Switch>
                <Route exact={true} path="/" component={HomePage}/>
                <Route exact={true} path="/user/settings" component={UserSettings}/>
                <Route exact={true} path="/my-kpi" component={MyKpiPage}/>
                <Route exact={true} path="/my-profile" component={PersonalDataRequestEditPage}/>
                <Route path="/personDocumentManagement/:entityId?" component={PersonDocumentManagement}/>
                <Route path="/personContactManagement/:entityId?" component={PersonContactManagement}/>
                <Route exact={true}
                       path={CertificateRequestManagement.PATH + "/:entityId?"}
                       component={CertificateRequestManagement}/>
                <Route exact={true} path="/kpi/:entityId?" component={AssignedPerformancePlanManagement}/>
                <Route exact={true} path="/kpi/:appId/goal/individual/:entityId?" component={AssignedGoalManagement}/>
                <Route exact={true} path="/kpi/:appId/goal/library/:entityId?"
                       component={LibraryAssignedGoalManagement}/>
                <Route exact={true} path="/kpi/:appId/goal/cascade/:entityId?"
                       component={CascadeGoalManagement}/>
                <Route exact={true} path="/learning-history" component={LearningHistory}/>
                <Route exact={true} path="/course/:entityId?" component={CourseManagement}/>
                <Route exact={true} path="/kpi-team/:entityId?" component={KpiTeamManagement}/>
                <Route exact={true} path="/my-books/:entityId?" component={KpiTeamManagement}/>
                <Route exact={true} path="/my-dmc/:entityId?" component={InsuredPersonManagement}/>
                <Route exact={true} path="/schedule-offsets/:entityId?" component={ScheduleOffsetsRequestManagement}/>
                <Route exact={true} path="/book/:entityId?" component={BooksManagement}/>
                <Route exact={true} path={EnrollmentManagement.PATH + "/:entityId?"} component={EnrollmentManagement}/>
                <Route exact={true} path={ActivityManagement.PATH} component={ActivityManagement}/>
                <Route exact={true}
                       path={AbsenceRequestManagement.PATH + "/:entityId"}
                       component={AbsenceRequestManagement}/>
                <Route exact={true} path="/absence/:activeTab?" component={AbsenceList}/>
                <Route exact={true}
                       path={LeavingVacationRequestManagement.PATH + "/:entityId"}
                       component={LeavingVacationRequestManagement}/>
                <Route exact={true}
                       path={VacationScheduleRequestManagement.PATH + "/:entityId"}
                       component={VacationScheduleRequestManagement}/>
                {/*{getRouteList().map((route) => {*/}
                {/*    return <Route key={route.pathPattern} path={route.pathPattern} component={route.component}/>*/}
                {/*  }*/}
                {/*)}*/}
              </Switch>
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    )
      ;
  }

  menuItem = (
    item: RouteItem | SubMenu,
    keyString: string,
    intl: IntlFormatters
  ) => {
    // Sub Menu  const
    if ((item as any).items != null) {
      //recursively walk through sub menus
      const menuSubMenu: MenuSubMenu = item as MenuSubMenu;
      const MenuIcon = getMenuIcon(menuSubMenu.id);
      return (
        <Menu.SubMenu
          key={keyString}
          title={
            <span>
            <img src={MenuIcon} className={"ant-menu-item-icon"}/>
            <span>{this.props.intl.formatMessage({id: "menu." + (item as any).id})}</span>
          </span>
          }>
          {(item as SubMenu).items.map((ri, index) =>
            this.menuItem(ri, keyString + "-" + (index + 1), intl)
          )}
        </Menu.SubMenu>
      );
    }

    // Route Item
    const menuRouteItem: MenuRouteItem = item as MenuRouteItem;
    const MenuIcon = getMenuIcon(menuRouteItem.id);

    return (
      <Menu.Item key={keyString}>
        <img src={MenuIcon} className={"ant-menu-item-icon"}/>
        <NavLink to={menuRouteItem.menuLink}>
          {this.props.intl.formatMessage({id: "menu." + (item as any).id})}
        </NavLink>
      </Menu.Item>
    );
  }

}

const App = injectIntl(AppComponent);
export default App;