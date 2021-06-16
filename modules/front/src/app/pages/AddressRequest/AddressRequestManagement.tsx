import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import AddressRequestEdit from "./AddressRequestEdit";

type Props = RouteComponentProps<{ entityId: string, addressId?: string }>;

@observer
export class AddressRequestManagement extends React.Component<Props> {
  static PATH = "/addressRequest";
  static NEW_SUBPATH = "new";

  render() {
    const {entityId, addressId} = this.props.match.params;
    return (
      <>
        <AddressRequestEdit entityId={entityId} addressId={addressId}/>
      </>
    );
  }
}
