import * as React from "react";
import {observer} from "mobx-react";

import {getCubaREST, injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {Card} from "antd";
import Meta from "antd/lib/card/Meta";
import {observable} from "mobx";
import {restServices} from "../../../../cuba/services";
import Notification from "../../../util/Notification/Notification";

export type PersonProfile = {
  id: string,
  groupId: string,
  fullName: string,
  hireDate?: any,
  birthDate?: any,
  sex?: string,
  cityOfResidence?: string,
  citizenship?: string,
  imageId?: string,
  organizationName?: string,
  positionName?: string,
  email?: string,
  phone?: string,
}

export type PersonCardProps = {
  personGroupId: string
};

@injectMainStore
@observer
class MyTeamPersonCard extends React.Component<PersonCardProps & MainStoreInjected & WrappedComponentProps> {

  @observable person?: PersonProfile;
  @observable urlImg?: string;

  render() {

    if (!this.person) return <></>;

    return (
      <Card
        hoverable
        style={{width: 300}}
        cover={<img alt="example"
                    src={this.urlImg ? this.urlImg : "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"}/>}>
        <Meta title={<span style={{fontSize: 13}}>{this.person.fullName}</span>}/>
        <Meta title={<span style={{fontSize: 13}}>{this.person.organizationName || ''}</span>}/>
        <Meta title={<span style={{fontSize: 13}}>{this.person.positionName || ''}</span>}/>
        <Meta title={<span style={{fontSize: 13}}><span>e-mail: </span>
          {(this.person.email ?
            <a href={'mailto:' + this.person.email}>{this.person.email}</a> : <></>)}
        </span>}/>
        <Meta title={<span style={{fontSize: 13}}>{"тел: " + (this.person.phone || '')}</span>}/>
      </Card>
    );
  }


  componentDidMount() {
    restServices.employeeService.personProfile(this.props.personGroupId)
      .then(value => {
        this.person = value;
        if (this.person && this.person.imageId)
          getCubaREST()!.getFile(this.person.imageId).then((value: Blob) => this.urlImg = URL.createObjectURL(value));
      })
      .catch(() => {
          Notification.error({
            message: this.props.intl.formatMessage({id: "management.editor.error"})
          });
        }
      )
  }
}

export default injectIntl(MyTeamPersonCard);
