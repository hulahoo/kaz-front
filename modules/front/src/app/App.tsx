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
import {BooksManagement} from "./pages/Books/BooksManagement";
import {OrgStructureRequestManagement} from "./pages/orgStructureRequest/OrgStructureRequestManagement";
import {InsuredPersonManagement} from "./pages/MyDMC/InsuredPersonManagement";
import {CertificateRequestManagement} from "./pages/CertificateRequest/CertificateRequestManagement";
import {ActivityManagement} from "./pages/Activity/ActivityManagement";
import {AbsenceRequestManagement} from "./pages/AbsenceRequest/AbsenceRequestManagement";
import AbsenceList from "./pages/Absence/AbsenceList";
import {LeavingVacationRequestManagement} from "./pages/LeavingVacationRequest/LeavingVacationRequestManagement";
import {CascadeGoalManagement} from "./pages/AssignedGoals/CascadeGoal/CascadeGoalManagement";
import {VacationScheduleRequestManagement} from "./pages/VacationScheduleRequest/VacationScheduleRequestManagement";
import MyEducation from "./pages/MyEducation/MyEducation";
import MyEducationManagement from "./pages/MyEducation/MyEducationManagement";
import LearningHistoryManagement from "./pages/LearningHistory/LearningHistoryManagement";
import {PortalFeedbackQuestionManagement} from "./pages/PortalFeedbackQuestions/PortalFeedbackQuestionManagement";
import {MyTeamStructureManagement} from "./pages/MyTeam/MyTeamStructureManagement";
import {ChangeAbsenceDaysRequestManagement} from "./pages/MyTeam/timeManagement/ChangeAbsenceDaysRequest/ChangeAbsenceDaysRequestManagement";
import {AbsenceForRecallManagement} from "./pages/MyTeam/timeManagement/AbsenceForRecall/AbsenceForRecallManagement";
import {AbsenceRvdRequestManagement} from "./pages/MyTeam/timeManagement/rvd/MyTeamPersonRvdRequest/AbsenceRvdRequestManagement";
import {ScheduleOffsetsRequestManagement} from "./pages/ScheduleOffsetsRequest/ScheduleOffsetsRequestManagement";
import {ExecutiveAssistantsManagement} from "./pages/ExecutiveAssistants/ExecutiveAssistantsManagement";
import {MyProfileManagement} from "./pages/MyProfile/MyProfileManagement";
import {PersonEducationManagement} from "./pages/PersonEducation/PersonEducationManagement";
import {PersonalDataRequestManagement} from "./pages/PersonalDataRequest/PersonalDataRequestManagement";
import {PersonDocumentRequestManagement} from "./pages/PersonDocumentRequest/PersonDocumentRequestManagement";
import {AddressRequestManagement} from "./pages/AddressRequest/AddressRequestManagement";
import {VacationScheduleManagement} from "./pages/VacationSchedule/VacationScheduleManagement";
import {PersonPayslipManagement} from "./pages/PersonPayslip/PersonPayslipManagement";
import {IncentiveManagement} from "./pages/Incentive/IncentiveManagement";
import {BpmUserSubstitutionManagement} from "./pages/BpmUserSubstitution/BpmUserSubstitutionManagement";
import {PositionHierarchyManagement} from "./pages/PositionHierarchy/PositionHierarchyManagement";
import {IncentiveApproveManagement} from "./pages/IncentiveApprove/IncentiveApproveManagement";

@injectMainStore
@inject("rootStore")
@observer
class AppComponent extends React.Component<MainStoreInjected & WrappedComponentProps & RootStoreProp> {


  render() {

    const loadedMenu = this.props.rootStore!.menu.menuCustomization;

    const {initialized, locale, loginRequired, metadata, messages} = this.props.mainStore!;

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

    if (!metadata || !messages) {
      return <CenteredLoader/>;
    }

    const menuIdx = 1;
    return (
      <Layout className="main-layout">
        <Layout.Header>
          <AppHeader/>
        </Layout.Header>
        <Layout style={{height: '100%'}}>
          <Layout.Sider
            width={200}
            breakpoint="sm"
            collapsedWidth={0}
            style={{background: "#fff", height: "100%"}}
          >
            <Menu mode="inline" style={{height: "100%", borderRight: 0}} className={"side-menu"}>
              {menuItems.filter(value => loadedMenu.find(menu => menu.menuItem === value['id']))
                .map((item, idx) =>
                  this.menuItem(item, "" + (idx + 1 + menuIdx), this.props.intl)
                )}
            </Menu>
          </Layout.Sider>
          <Layout>
            <Layout.Content style={{height: "100%"}}>
              <Switch>
                <Route exact={true} path="/" component={HomePage}/>
                <Route exact={true} path="/user/settings" component={UserSettings}/>
                <Route exact={true} path="/my-kpi" component={MyKpiPage}/>
                <Route exact={true} path={MyProfileManagement.PATH} component={MyProfileManagement}/>
                <Route exact={true} path={AddressRequestManagement.PATH + '/:entityId/:addressId?'}
                       component={AddressRequestManagement}/>
                <Route path="/personalDataRequest/:entityId" component={PersonalDataRequestManagement}/>
                <Route path="/personDocumentRequest/:entityId/:documentId?"
                       component={PersonDocumentRequestManagement}/>
                <Route path="/personDocumentManagement/:entityId?" component={PersonDocumentManagement}/>
                <Route path={ExecutiveAssistantsManagement.PATH} component={ExecutiveAssistantsManagement}/>
                <Route path="/personEducationManagement/:entityId?" component={PersonEducationManagement}/>
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
                <Route exact={true} path={"/" + LearningHistoryManagement.PATH} component={LearningHistory}/>
                <Route exact={true} path="/course/:entityId?" component={CourseManagement}/>
                <Route exact={true} path="/kpi-team/:entityId?" component={KpiTeamManagement}/>
                <Route exact={true} path="/my-books/:entityId?" component={KpiTeamManagement}/>
                <Route exact={true} path="/my-dmc/:entityId?" component={InsuredPersonManagement}/>
                <Route exact={true} path={ScheduleOffsetsRequestManagement.PATH_WITH_PARAMS}
                       component={ScheduleOffsetsRequestManagement}/>
                <Route exact={true} path={"/" + BooksManagement.PATH + "/:entityId?"} component={BooksManagement}/>
                <Route exact={true} path={"/" + MyEducationManagement.PATH} component={MyEducation}/>
                <Route exact={true} path={"/" + EnrollmentManagement.PATH + "/:entityId?" + "/:homework?"}
                       component={EnrollmentManagement}/>
                <Route exact={true} path={ActivityManagement.PATH} component={ActivityManagement}/>
                <Route exact={true}
                       path={AbsenceRequestManagement.PATH + "/:entityId"}
                       component={AbsenceRequestManagement}/>
                <Route exact={true} path="/absence/:activeTab?" component={AbsenceList}/>
                <Route exact={true}
                       path={LeavingVacationRequestManagement.PATH + "/:entityId"}
                       component={LeavingVacationRequestManagement}/>
                <Route exact={true}
                       path={VacationScheduleRequestManagement.PATH + "/:entityId/:chartType?"}
                       component={VacationScheduleRequestManagement}/>
                <Route exact={true}
                       path={PortalFeedbackQuestionManagement.PATH}
                       component={PortalFeedbackQuestionManagement}/>
                <Route exact={true} path="/orgStructureRequest/:entityId?" component={OrgStructureRequestManagement}/>
                <Route exact={true} path={MyTeamStructureManagement.PATH} component={MyTeamStructureManagement}/>
                <Route exact={true} path={PositionHierarchyManagement.PATH} component={PositionHierarchyManagement}/>
                <Route exact={true} path={VacationScheduleManagement.PATH+'/:type'} component={VacationScheduleManagement}/>
                <Route exact={true}
                       path={AbsenceRvdRequestManagement.PATH_WITH_PARAMS}
                       component={AbsenceRvdRequestManagement}/>
                <Route exact={true}
                       path={PersonPayslipManagement.PATH}
                       component={PersonPayslipManagement}/>

                {/*<Route exact={true}*/}
                {/*       path={CurrentScheduleRequestManagement.PATH + "/:entityId"}*/}
                {/*       component={CurrentScheduleRequestManagement}/>*/}
                <Route exact={true}
                       path={ChangeAbsenceDaysRequestManagement.PATH_WITH_PARAMS}
                       component={ChangeAbsenceDaysRequestManagement}/>
                <Route exact={true}
                       path={AbsenceForRecallManagement.PATH_WITH_PARAMS}
                       component={AbsenceForRecallManagement}/>
                <Route exact={true}
                       path={IncentiveManagement.PATH + "/:entityId?"}
                       component={IncentiveManagement}/>
                <Route exact={true}
                       path={IncentiveApproveManagement.PATH + "/:entityId"}
                       component={IncentiveApproveManagement}/>
                <Route exact={true}
                       path={BpmUserSubstitutionManagement.PATH + "/:entityId?"}
                       component={BpmUserSubstitutionManagement}/>
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
  }

  menuItem = (
    item: RouteItem | SubMenu,
    keyString: string,
    intl: IntlFormatters
  ) => {
    // Sub Menu  const
    if ((item as any).items != null) {

      const loadedMenu = this.props.rootStore!.menu.menuCustomization;

      //recursively walk through sub menus
      const menuSubMenu: MenuSubMenu = item as MenuSubMenu;
      const MenuIcon = getMenuIcon(menuSubMenu.id);
      return (
        <Menu.SubMenu
          key={keyString}
          title={
            <span>
              {MenuIcon
                ? <img src={MenuIcon} className={"ant-menu-item-icon"}/>
                : null}
              <span>{this.props.intl.formatMessage({id: "menu." + (item as any).id})}</span>
          </span>
          }>
          {(item as SubMenu).items.filter(value => loadedMenu.find(menu => menu.menuItem === value['id'])).map((ri, index) =>
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
        {MenuIcon
          ? <img src={MenuIcon} className={"ant-menu-item-icon"}/>
          : null}
        <NavLink to={menuRouteItem.menuLink}>
          {this.props.intl.formatMessage({id: "menu." + (item as any).id})}
        </NavLink>
      </Menu.Item>
    );
  }
}

const App = injectIntl(AppComponent);
export default App;
