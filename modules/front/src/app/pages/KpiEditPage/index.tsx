import React, {useEffect} from 'react';
import {injectIntl, WrappedComponentProps} from "react-intl";
import {RootStoreProp} from "../../store";
import {inject, observer} from "mobx-react";
import KpiPageContent from "./KpiPageContent";
import LoadingPage from "../LoadingPage";
import {RouteComponentProps} from "react-router";
import Page from "../../hoc/PageContentHoc";

@inject("rootStore")
@observer
class KpiEditPage extends React.Component<WrappedComponentProps & RootStoreProp & RouteComponentProps<any>> {

  componentDidMount(): void {
    this.props.rootStore!.createKpiStore(this.props.match!.params.id);
  }

  render() {
    if (this.props.rootStore!.kpiEditStore && this.props.rootStore!.kpiEditStore.state) {
      return <Page
        pageName={this.props.intl.formatMessage({id: 'page.kpi'}, {"name": this.props.rootStore!.kpiEditStore.state.personFullName})}>
        <KpiPageContent/>
      </Page>
    } else {
      return <LoadingPage/>
    }
  }
}

export default injectIntl(KpiEditPage);