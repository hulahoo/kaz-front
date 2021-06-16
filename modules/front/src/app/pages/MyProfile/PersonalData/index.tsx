import * as React from "react";
import {observer} from "mobx-react";

import {injectMainStore, MainStoreInjected, withLocalizedForm} from "@cuba-platform/react";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {FormComponentProps} from "antd/lib/form";
import {PersonProfile} from "../../MyTeam/MyTeamCard";
import PersonDocumentList from "../../PersonDocument/PersonDocumentList";
import MsgEntity from "../../../components/MsgEntity";
import {PersonDocument} from "../../../../cuba/entities/base/tsadv$PersonDocument";
import PersonInfo from "./PersonInfo";
import {PersonEducation} from "../../../../cuba/entities/base/tsadv$PersonEducation";
import PersonEducationList from "../../PersonEducation/PersonEducationList";
import {Address} from "../../../../cuba/entities/base/tsadv$Address";
import AddressList from "../../Address/AddressList";

export  type  PersonCardProps = {
  person?: PersonProfile
}

@injectMainStore
@observer
class PersonalData extends React.Component<PersonCardProps & MainStoreInjected & WrappedComponentProps & FormComponentProps> {

  render() {

    return (
      <div>
        <PersonInfo person={this.props.person}/>

        <div className={"section-header-container"}><MsgEntity entityName={PersonDocument.NAME}/></div>
        <PersonDocumentList/>

        <div
          className={"section-header-container"}><MsgEntity entityName={Address.NAME}/></div>
        <AddressList personGroupId={this.props.person!.groupId}/>

        <div
          className={"section-header-container"}><MsgEntity entityName={PersonEducation.NAME}/></div>
        <PersonEducationList/>

      </div>
    )
  }
}

export default injectIntl(
  withLocalizedForm({
    onValuesChange: (props: any, changedValues: any) => {
      // Reset server-side errors when field is edited
      Object.keys(changedValues).forEach((fieldName: string) => {
        props.form.setFields({
          [fieldName]: {
            value: changedValues[fieldName]
          }
        });
      });
    }
  })(PersonalData)
);