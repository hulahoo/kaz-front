import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom'
import {RootStoreProp} from "../../../../../store";
import Section from "../../../../../hoc/Section/";
import DefaultGoalSection from "./DefaultGoalSection";
import {withRouter} from 'react-router-dom'
import {RouteComponentProps} from "react-router";
import {injectIntl, WrappedComponentProps} from "react-intl";

type UrlParams = {
  appId: string
}

@inject("rootStore")
@observer
class DefaultGoalForm extends Component<RootStoreProp & RouteComponentProps<any> & WrappedComponentProps> {
  render() {
    const {kpiEditStore} = this.props.rootStore!;
    const appId = (!kpiEditStore || !kpiEditStore.appId)
      ? this.props.match.params.id
      : kpiEditStore.appId;

    return (
      <Section size={"large"} sectionName={this.props.intl.formatMessage({id: "goal.create"})}>
        <DefaultGoalSection key={"goal-section"}/>
      </Section>
    );
  }
}

export default injectIntl(withRouter(DefaultGoalForm));