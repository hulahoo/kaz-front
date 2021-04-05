import * as React from "react";
import {observer} from "mobx-react";

import {injectMainStore} from "@cuba-platform/react";
import {injectIntl} from "react-intl";
import MyTeamComponent from "./MyTeamComponent";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";

@injectMainStore
@observer
class MyTeamStructure extends React.Component {

  render() {
    return (
      <Page>
        <Section size={"large"}>
          <MyTeamComponent/>
        </Section>
      </Page>
    )
  }
}

export default injectIntl(MyTeamStructure);
