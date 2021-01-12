import React, {useEffect} from 'react';
import {SectionHoc} from "../../hoc/SectionHoc";
import PageContentHoc from "../../hoc/PageContentHoc";
import EmployeeInformation from "./KpiPageContent/KpiTable/EmployeeInformation";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {RootStoreProp} from "../../store";
import {inject, observer} from "mobx-react";
import StatusSteps from "../../common/StatusSteps";
import Button, {ButtonType} from "../../components/Button/Button";
import KpiPageContent from "./KpiPageContent";
import LoadingPage from "../LoadingPage";
import {action} from "mobx";
import {RouteComponentProps} from "react-router";

//@inject("rootStore")
@observer
class KpiEditPage extends React.Component<WrappedComponentProps & RootStoreProp & RouteComponentProps<any>> {

  componentDidMount(): void {
    this.props.rootStore!.createKpiStore(this.props.match!.params.id);
  }

  render() {
    if (this.props.rootStore!.kpiEditStore && this.props.rootStore!.kpiEditStore.state) {
      const PageContentComponent = PageContentHoc(
        {pageName: this.props.intl.formatMessage({id: 'page.kpi'}, {"name": this.props.rootStore!.kpiEditStore.state.personFullName})},
        <KpiPageContent/>);
      return <PageContentComponent/>
    } else {
      return <LoadingPage/>
    }
  }
}

export default injectIntl(KpiEditPage);