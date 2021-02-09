import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import CertificateRequestEdit from "./CertificateRequestEdit";
import CertificateRequestList from "./CertificateRequestList";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class CertificateRequestManagement extends React.Component<Props> {
  static PATH = "/certificateRequestManagement";
  static NEW_SUBPATH = "new";

  render() {
    const {entityId} = this.props.match.params;
    return (
      <>
        {entityId ? (
          <CertificateRequestEdit entityId={entityId} />
        ) : (
          <CertificateRequestList/>
        )}
      </>
    );
  }
}
