import * as React from "react";
import "./App.css";

import {Icon, Layout, Menu} from "antd";
import {inject, observer} from "mobx-react";
import Login from "./login/Login";
import Centered from "./common/Centered";
import AppHeader from "./header/AppHeader";
import {NavLink, Route, Switch} from "react-router-dom";
import HomePage from "./home/HomePage";
import {menuItems} from "../routing";
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
import IconRender from '../resources/icons/menu/index';
import {MenuRouteItem, MenuSubMenu} from "./store/MenuStore";
import UserSettings from "./pages/user-settings/UserSettings";
import {RootStoreProp} from "./store";
import MyKpiPage from "./pages/my-kpi/MyKpiPage";
import {PersonalDataRequestEditPage} from "./pages/PersonalDataRequest/PersonalDataRequestEditPage";
import {PersonDocumentManagement} from "./pages/PersonDocument/PersonDocumentManagement";
import {PersonContactManagement} from "./pages/PersonContact/PersonContactManagement";
import {AssignedPerformancePlanManagement} from "./pages/Kpi/AssignedPerformancePlanManagement";
import {AssignedGoalManagement} from "./pages/AssignedGoals/IndividualGoal/AssignedGoalManagement";

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
                menuItem(item, "" + (idx + 1 + menuIdx), this.props.intl)
              )}
            </Menu>
          </Layout.Sider>
          <Layout>
            <Layout.Content>
              <Switch>
                <Route exact={true} path="/" component={HomePage}/>
                <Route exact={true} path="/user/settings" component={UserSettings}/>
                <Route exact={true} path="/my-kpi" component={MyKpiPage}/>
                {/*<Route exact={true} path="/kpi/:id" component={KpiEditPage}/>*/}
                <Route path="/my-profile" component={PersonalDataRequestEditPage}/>
                {/*<Route path="/personalDataRequestManagement/:entityId?" component={PersonalDataRequestEdit}/>*/}
                <Route path="/personDocumentManagement/:entityId?" component={PersonDocumentManagement}/>
                <Route path="/personContactManagement/:entityId?" component={PersonContactManagement}/>
                <Route exact={true} path="/kpi/:entityId?" component={AssignedPerformancePlanManagement}/>
                <Route exact={true} path="/kpi/:appId/goal/create/individual" component={AssignedGoalManagement}/>
                <Route exact={true} path="/kpi/:appId/goal/create/library" component={AssignedGoalManagement}/>
              </Switch>
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

function menuItem(
  item: RouteItem | SubMenu,
  keyString: string,
  intl: IntlFormatters
) {
  // Sub Menu  const
  if ((item as any).items != null) {
    //recursively walk through sub menus
    const menuSubMenu: MenuSubMenu = item as MenuSubMenu;
    const MenuIcon = IconRender.get(menuSubMenu.id);
    return (
      <Menu.SubMenu
        key={keyString}
        title={
          <span>
            <Icon component={MenuIcon}/>
            <span>{item.caption}</span>
          </span>
        }>
        {(item as SubMenu).items.map((ri, index) =>
          menuItem(ri, keyString + "-" + (index + 1), intl)
        )}
      </Menu.SubMenu>
    );
  }

  // Route Item
  const menuRouteItem: MenuRouteItem = item as MenuRouteItem;
  const MenuIcon = IconRender.get(menuRouteItem.id);
  return (
    <Menu.Item key={keyString}>
      <NavLink to={menuRouteItem.menuLink}>
        <Icon component={MenuIcon}/>
        {item.caption}
      </NavLink>
    </Menu.Item>
  );
}

function collectRouteItems(items: Array<RouteItem | SubMenu>): RouteItem[] {
  return items.reduce(
    (acc, curr) => {
      if ((curr as SubMenu).items == null) {
        // Route item
        acc.push(curr as RouteItem);
      } else {
        // Items from sub menu
        acc.push(...collectRouteItems((curr as SubMenu).items));
      }
      return acc;
    },
    [] as Array<RouteItem>
  );
}

const App = injectIntl(AppComponent);
export default App;