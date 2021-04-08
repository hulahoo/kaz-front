import * as React from "react";
import {observer} from "mobx-react";

import {injectMainStore} from "@cuba-platform/react";
import {injectIntl} from "react-intl";
import MyTeamComponent from "./MyTeamComponent";

@injectMainStore
@observer
class MyTeamStructure extends React.Component {

  render() {
    return (
      <MyTeamComponent/>
    )
  }
}

export default injectIntl(MyTeamStructure);
