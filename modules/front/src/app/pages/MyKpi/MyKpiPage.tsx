import React from 'react';
import Section from "../../hoc/Section";
import {injectIntl, WrappedComponentProps} from "react-intl";
import MyKpi from "./MyKpi";
import {RouteComponentProps} from "react-router";
import Page from "../../hoc/PageContentHoc";

class MyKpiPage extends React.Component<WrappedComponentProps & RouteComponentProps<any>> {
  render() {
    return <Page pageName={this.props.intl.formatMessage({id: 'menu.my-kpi'})}>
      <Section size={"large"}>
        <MyKpi/>
      </Section>
    </Page>
  }
}

export default injectIntl(MyKpiPage);