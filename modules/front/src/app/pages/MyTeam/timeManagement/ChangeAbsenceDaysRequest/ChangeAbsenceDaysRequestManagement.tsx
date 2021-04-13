import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import ChangeAbsenceDaysRequestEdit from "./ChangeAbsenceDaysRequestEdit";

type Props = RouteComponentProps<{ entityId: string, absenceId: string }>;

@observer
export class ChangeAbsenceDaysRequestManagement extends React.Component<Props> {
  static PATH_WITH_PARAMS = "/changeAbsenceDaysRequest/:entityId/:absenceId?";
  static PATH = "/changeAbsenceDaysRequest";
  static NEW_SUBPATH = "new";

  render() {
    const {entityId, absenceId} = this.props.match.params;
    return (
      <>
        <ChangeAbsenceDaysRequestEdit entityId={entityId} absenceId={absenceId}/>
      </>
    );
  }
}
