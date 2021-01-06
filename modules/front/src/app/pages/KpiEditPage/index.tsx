import React from 'react';
import {SectionHoc} from "../../hoc/SectionHoc";
import PageContentHoc from "../../hoc/PageContentHoc";
import EmployeeInformation from "./EmployeeInformation";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {MatchParams, RootStoreProp, RouteComponentProps} from "../../store";
import {inject, observer} from "mobx-react";
import StatusSteps from "../../common/StatusSteps";
import Button, {ButtonType} from "../../components/Button/Button";
import KpiPageContent from "./KpiPageContent";

@inject("rootStore")
@observer
class KpiEditPage extends React.Component<WrappedComponentProps & RootStoreProp & RouteComponentProps<MatchParams>> {

  componentDidMount() {
    this.props.rootStore!.createKpiStore(this.props.match!.params.id);
    this.props.rootStore!.kpiEditStore.loadKpi();
  }

  render() {
    const PageContentComponent = PageContentHoc(
      {pageName: this.props.intl.formatMessage({id: 'menu.my-kpi'})},
      <KpiPageContent />);
    return <PageContentComponent/>
  }
}

export default injectIntl(KpiEditPage);