import * as React from "react";
import Page from "../../hoc/PageContentHoc";
import PersonalDataRequestEdit from "./PersonalDataRequestEdit";
import {observer} from "mobx-react";
import {injectIntl, WrappedComponentProps} from "react-intl";

@observer
class PersonalDataRequestEditPage extends React.Component<WrappedComponentProps> {
  render() {
    return <Page pageName={this.props.intl.formatMessage({id: "menu.my-profile"})}>
      <PersonalDataRequestEdit/>
    </Page>;
  }
}


export default injectIntl(PersonalDataRequestEditPage);