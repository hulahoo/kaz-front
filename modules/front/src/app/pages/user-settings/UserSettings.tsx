import React from "react";
import {RootStoreProp} from "../../store";
import Section from "../../hoc/Section";
import {injectIntl, WrappedComponentProps} from "react-intl";
import UserSettingMainSection from "./UserSettingMainSection";
import Page from "../../hoc/PageContentHoc";

class UserSettings extends React.Component<RootStoreProp & WrappedComponentProps> {

  render() {
    return (
      <Page pageName={this.props.intl.formatMessage({id: 'settings'})}>
        <Section>
          <UserSettingMainSection/>
        </Section>
      </Page>
    );
  }
}

export default injectIntl(UserSettings);