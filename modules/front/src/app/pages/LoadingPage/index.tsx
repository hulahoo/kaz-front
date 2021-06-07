import React, {Component} from 'react';
import Page from "../../hoc/PageContentHoc";
import {injectIntl, WrappedComponentProps} from "react-intl";

class LoadingPage extends Component<WrappedComponentProps> {
  render() {
    return <Page pageName={this.props.intl.formatMessage({id: 'page.loading'})}/>
  }
}

export default injectIntl(LoadingPage);