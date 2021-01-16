import React, {Component} from 'react';
import PageContentHoc from "../../hoc/PageContentHoc";
import KpiPageContent from "../KpiEditPage/KpiPageContent";
import {injectIntl, WrappedComponentProps} from "react-intl";
import Page from "../../hoc/PageContentHoc";

class LoadingPage extends Component<WrappedComponentProps> {
  render() {
    return <Page pageName={this.props.intl.formatMessage({id: 'page.loading'})}/>
  }
}

export default injectIntl(LoadingPage);