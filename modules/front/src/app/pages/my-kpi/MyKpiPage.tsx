import React from 'react';
import {SectionHoc} from "../../hoc/SectionHoc";
import UserSettingMainSection from "../user-settings/UserSettingMainSection";
import PageContentHoc from "../../hoc/PageContentHoc";
import {injectIntl, WrappedComponentProps} from "react-intl";
import MyKpi from "./MyKpi";
import {RouteComponentProps} from "react-router";

class MyKpiPage extends React.Component<WrappedComponentProps & RouteComponentProps<any>> {
  render() {
    const MainSection = SectionHoc(<MyKpi/>, {size: "large"});
    const PageContentComponent = PageContentHoc(
      {pageName: this.props.intl.formatMessage({id: 'menu.my-kpi'})}, <MainSection key={1}/>);

    return <PageContentComponent/>
  }
}

export default injectIntl(MyKpiPage);