import * as React from "react";
import "./App.css";

import {Icon, Layout, Menu} from "antd";
import {inject, observer} from "mobx-react";
import Login from "./login/Login";
import Centered from "./common/Centered";
import AppHeader from "./header/AppHeader";
import {NavLink, Route, Switch} from "react-router-dom";
import HomePage from "./home/HomePage";
import {getRouteList, menuItems} from "../routing";
import {
  injectMainStore,
  MainStoreInjected,
  RouteItem,
  SubMenu
} from "@cuba-platform/react";
import {CenteredLoader} from "./CenteredLoader";
import {
  injectIntl,
  IntlFormatters,
  WrappedComponentProps
} from "react-intl";
// import {getMenuIcon} from '../resources/icons/menu';
import {MenuRouteItem, MenuSubMenu} from "./store/MenuStore";
import UserSettings from "./pages/user-settings/UserSettings";
import {RootStoreProp} from "./store";
import MyKpiPage from "./pages/my-kpi/MyKpiPage";
import {PersonalDataRequestEditPage} from "./pages/PersonalDataRequest/PersonalDataRequestEditPage";
import {CertificateRequestManagement} from "./pages/certificateRequest/CertificateRequestManagement";
import {PersonDocumentManagement} from "./pages/PersonDocument/PersonDocumentManagement";
import {PersonContactManagement} from "./pages/PersonContact/PersonContactManagement";
import {AssignedPerformancePlanManagement} from "./pages/Kpi/AssignedPerformancePlanManagement";
import {AssignedGoalManagement} from "./pages/AssignedGoals/IndividualGoal/AssignedGoalManagement";
import {LibraryAssignedGoalManagement} from "./pages/AssignedGoals/LibraryGoal/LibraryAssignedGoalManagement";
import LearningHistory from "./pages/LearningHistory";
import {CourseManagement} from "./pages/Course/CourseManagement";
import {EnrollmentManagement} from "./pages/MyCourse/EnrollmentManagement";
import {KpiTeamManagement} from "./pages/KpiTeam/KpiTeamManagement";
import DicBookCategoryCards from "./pages/Books/DicBookCategoryCards";

@injectMainStore
@inject("rootStore")
@observer
class AppComponent extends React.Component<MainStoreInjected & WrappedComponentProps & RootStoreProp> {

  // @observable
  // mainStore = this.props.mainStore!;

  constructor(props: MainStoreInjected & WrappedComponentProps, context: any) {
    super(props, context);
  }

  render() {
    const {initialized, locale, loginRequired, metadata} = this.props.mainStore!;

    if (!initialized || !locale) {
      return <CenteredLoader/>;
    }

    if (loginRequired) {
      return (
        <Centered>
          <Login/>
        </Centered>
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
                <Route exact={true} path="/certificateRequestManagement/:entityId?" component={CertificateRequestManagement}/>
                <Route exact={true} path="/kpi/:entityId?" component={AssignedPerformancePlanManagement}/>
                <Route exact={true} path="/kpi/:appId/goal/individual/:entityId?" component={AssignedGoalManagement}/>
                <Route exact={true} path="/kpi/:appId/goal/library/:entityId?"
                       component={LibraryAssignedGoalManagement}/>
                <Route exact={true} path="/learning-history" component={LearningHistory}/>
                <Route exact={true} path="/course/:entityId?" component={CourseManagement}/>
                <Route exact={true} path="/kpi-team/:entityId?" component={KpiTeamManagement}/>
                <Route exact={true} path="/my-books/:entityId?" component={KpiTeamManagement}/>
                <Route exact={true} path="/books/:entityId?" component={DicBookCategoryCards}/>
                <Route exact={true} path={EnrollmentManagement.PATH + "/:entityId?"} component={EnrollmentManagement}/>
                {/*{getRouteList().map((route) => {*/}
                {/*    return <Route key={route.pathPattern} path={route.pathPattern} component={route.component}/>*/}
                {/*  }*/}
                {/*)}*/}
              </Switch>
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    );
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