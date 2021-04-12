import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import ChangeAbsenceDaysRequestEdit from "./ChangeAbsenceDaysRequestEdit";

type Props = RouteComponentProps<{ entityId: string, personGroupId: string }>;

@observer
export class ChangeAbsenceDaysRequestManagement extends React.Component<Props> {
  static PATH_WITH_PARAMS = "/changeAbsenceDaysRequest/:entityId/:personGroupId";
  static PATH = "/changeAbsenceDaysRequest";
  static NEW_SUBPATH = "new";

  render() {
    const {entityId, personGroupId} = this.props.match.params;
    return (
      <>
        <ChangeAbsenceDaysRequestEdit entityId={entityId} personGroupId={personGroupId}/>
      </>
    );
  }
}
