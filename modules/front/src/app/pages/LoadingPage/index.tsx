import React, {Component} from 'react';
import PageContentHoc from "../../hoc/PageContentHoc";
import KpiPageContent from "../KpiEditPage/KpiPageContent";
import {injectIntl, WrappedComponentProps} from "react-intl";

class LoadingPage extends Component<WrappedComponentProps> {
  render() {
    const PageContentComponent = PageContentHoc(
      {pageName: this.props.intl.formatMessage({id: 'page.loading'})});
    return <PageContentComponent/>
  }
}

export default injectIntl(LoadingPage);