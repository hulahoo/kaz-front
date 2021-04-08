import * as React from "react";
import {observer} from "mobx-react";

import {getCubaREST, injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {Card, List, Tabs} from "antd";
import Meta from "antd/lib/card/Meta";
import {observable} from "mobx";
import {restServices} from "../../../cuba/services";
import Notification from "../../util/Notification/Notification";
import MyTeamPersonCard from "./personalData/MyTeamPersonCard/MyTeamPersonCard";
import MyTeamAbsence from "./timeManagement/MyTeamAbsence/MyTeamAbsence";

const {TabPane} = Tabs;

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

export type MyTeamCardProps = {
  personGroupId: string
};

export type Menu = {
  id: string
};

@injectMainStore
@observer
class MyTeamCard extends React.Component<MyTeamCardProps & MainStoreInjected & WrappedComponentProps> {

  @observable person?: PersonProfile;
  @observable urlImg?: string;

  @observable selectedTab: string = 'personalData';
  @observable selectedLeftMenu: string = 'personalData';

  renderContent = (): React.ReactNode => {
    if (!this.person) return <></>;
    switch (this.selectedLeftMenu) {
      case 'personalData':
        return <MyTeamPersonCard person={this.person}/>
      case 'absence':
        return <MyTeamAbsence personGroupId={this.person!.groupId}/>
    }
    return <div>
      Here is {this.selectedLeftMenu}
    </div>
  }

  getTabs = (): Menu[] => {
    return [{
      id: 'personalData'
    }, {
      id: 'timeManagement'
    }]
  }

  getLeftMenu = (): Menu[] => {
    switch (this.selectedTab) {
      case 'timeManagement':
        return [{
          id: 'absence'
        }, {
          id: 'absenceRequest'
        }]
    }
    return [{
      id: 'personalData'
    }];
  }

  render() {

    if (!this.person) return <></>;

    return (
      <div>
        <div style={{float: 'left', marginTop: '40px'}}>
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
          <List>
            {this.getLeftMenu().map((menu: Menu) => <List.Item
              style={this.selectedLeftMenu === menu.id ? {
                backgroundColor: '#bae7ff',
                marginTop: '10px',
                padding: '10px'
              } : {marginTop: '10px', padding: '10px'}}
              key={menu.id}
              onClick={() => this.selectedLeftMenu = menu.id}><FormattedMessage id={menu.id}/></List.Item>)}
          </List>
        </div>
        <div style={{whiteSpace: 'nowrap'}}>
          <Tabs defaultActiveKey="personalData" onChange={activeKey => {
            this.selectedTab = activeKey;
            this.selectedLeftMenu = this.getLeftMenu()[0].id;
          }}>
            {this.getTabs().map(tabInfo => <TabPane tab={<FormattedMessage id={tabInfo.id}/>}
                                                    key={tabInfo.id}>
            </TabPane>)}
          </Tabs>
          <div style={{display: 'flow-root'}}>
            {this.renderContent()}
          </div>
        </div>
      </div>
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

export default injectIntl(MyTeamCard);
