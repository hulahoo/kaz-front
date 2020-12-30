import React from 'react';
import {SectionHoc} from "../../hoc/SectionHoc";
import UserSettingMainSection from "../user-settings/UserSettingMainSection";
import PageContentHoc from "../../hoc/PageContentHoc";
import {injectIntl, WrappedComponentProps} from "react-intl";
import MyKpi from "./MyKpi";

class MyKpiPage extends React.Component<WrappedComponentProps> {
  render() {
    console.log('i m here');
    const MainSection = SectionHoc(<MyKpi/>, {});
    const PageContentComponent = PageContentHoc(
      <MainSection/>, {pageName: this.props.intl.formatMessage({id: 'menu.my-kpi'})});

    return <PageContentComponent/>
  }
}

export default injectIntl(MyKpiPage);