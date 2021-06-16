import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import PersonalDataRequestEdit from "./PersonalDataRequestEdit";

type Props = RouteComponentProps<{ entityId: string }>;

@observer
export class PersonalDataRequestManagement extends React.Component<Props> {
  static PATH = "/personalDataRequest";
  static NEW_SUBPATH = "new";

  render() {
    const {entityId} = this.props.match.params;
    return (
      <PersonalDataRequestEdit entityId={entityId}/>
    );
  }
}
