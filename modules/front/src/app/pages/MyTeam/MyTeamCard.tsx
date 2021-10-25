import * as React from "react";
import {inject, observer} from "mobx-react";

import {getCubaREST, injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {Card, List, Tabs} from "antd";
import Meta from "antd/lib/card/Meta";
import {observable} from "mobx";
import {restServices} from "../../../cuba/services";
import Notification from "../../util/Notification/Notification";
import MyTeamPersonCard from "./personalData/MyTeamPersonCard/MyTeamPersonCard";
import MyTeamAbsence from "./timeManagement/MyTeamAbsence/MyTeamAbsence";
import MyTeamPersonRvd from "./timeManagement/rvd/MyTeamPersonRvd/MyTeamPersonRvd";
import PositionOverlappingRequestListComponent from "../PositionOverlappingRequest/PositionOverlappingRequestList";
// import CurrentSchedule from "./shiftSchedules/MyTeamCurrentSchedule/CurrentSchedule";
import AbsenceRvdRequestList from "./timeManagement/rvd/MyTeamPersonRvdRequest/AbsenceRvdRequestList";
import {RootStoreProp} from "../../store";
import AssignmentScheduleStandard from "./AssignmentScheduleStandard";
import MyTeamScheduleOffsetRequestList from "./MyTeamScheduleOffsetRequestList";
import MyTeamAbsenceRequest from "./timeManagement/MyTeamAbsenceRequest/MyTeamAbsenceRequest";
import {MyTeamData} from "./MyTeamComponent";
import {PersonContact} from "../../../cuba/entities/base/tsadv$PersonContact";
import PunishmentRequestList from "./assignment/PunishmentRequestList";
import PunishmentList from "./assignment/punishment/PunishmentList";

const {TabPane} = Tabs;

export type PersonProfile = {
  id: string,
  groupId: string,
  positionGroupId: string,
  organizationGroupId: string,
  assignmentGroupId: string,
  positionId: string,
  fullName: string,
  firstLastName: string,
  hireDate?: any,
  birthDate?: any,
  sex?: string,
  cityOfResidence?: string,
  citizenship?: string,
  nationality?: string,
  imageId?: string,
  organizationName?: string,
  positionName?: string,
  email?: string,
  phone?: string,
  companyCode?: string,
}
export type PersonContact= {
  id:string,
  type: any,
  contactValue: any
}
export type MyTeamCardProps = {
  personGroupId: string,
  selectedData?: MyTeamData,
  selectedTab?: string,
  selectedLeftMenu?: string,
  onChangeSelectedInfo?: (selectedData?: MyTeamData, selectedTab?: string, selectedLeftMenu?: string) => void,
};

export type Menu = {
  id: string,
  caption?: string,
};

@injectMainStore
@inject("rootStore")
@observer
class MyTeamCard extends React.Component<MyTeamCardProps & MainStoreInjected & WrappedComponentProps & RootStoreProp> {

  @observable person?: PersonProfile;
  @observable urlImg?: string;
  @observable type: Array<PersonContact>
  @observable selectedTab: string = this.props.selectedTab || 'personalData';
  @observable selectedLeftMenu: string = this.props.selectedLeftMenu || 'personalData';



  callSetSelectedTabOrLeftMenu = () => {
    if (this.props.onChangeSelectedInfo)
      this.props.onChangeSelectedInfo(this.props.selectedData, this.selectedTab, this.selectedLeftMenu);
  }

  renderContent = (): React.ReactNode => {
    if (!this.person) return <></>;
    switch (this.selectedLeftMenu) {
      case 'personalData':
        return <MyTeamPersonCard person={this.person}/>
      case 'absence':
        return <MyTeamAbsence personGroupId={this.person!.groupId}/>
      case 'absenceRequest':
        return <MyTeamAbsenceRequest personGroupId={this.person!.groupId}/>
      case 'workOnWeekend':
        return <MyTeamPersonRvd personGroupId={this.person!.groupId}/>
      case 'workOnWeekendRequest':
        return <AbsenceRvdRequestList personGroupId={this.person!.groupId}/>
      case 'scheduleStandard':
        return <AssignmentScheduleStandard personGroupId={this.person!.groupId}/>
      case 'scheduleOffsetRequest':
        return <MyTeamScheduleOffsetRequestList personGroupId={this.person!.groupId}/>
      case 'positionOverlappingRequest':
        return <PositionOverlappingRequestListComponent person={this.person} />
      case 'punishmentRequest':
        return <PunishmentRequestList personGroupId={this.person!.groupId}/>
      case 'punishment':
        return <PunishmentList personGroupId={this.person!.groupId}/>
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
    }, {
      id: 'assignment'
    },{
      id: 'positionOverlappingRequest'
    },]
  }

  getLeftMenu = (): Menu[] => {
    switch (this.selectedTab) {
      case 'timeManagement':
        return [{
          id: 'absence'
        }, {
          id: 'absenceRequest'
        }, {
          id: 'workOnWeekend'
        }, {
          id: 'workOnWeekendRequest'
        }, {
          id: 'scheduleStandard'
        }, {
          id: 'scheduleOffsetRequest'
        }]
      case 'positionOverlappingRequest':
        return [{id: 'positionOverlappingRequest'}]
      case 'assignment':
        return [{
          id: 'punishmentRequest'
        },
          {
            id: 'punishment'
          }]
    }
    return [{
      id: 'personalData'
    }];
  }

  render() {
    const arr = (this.type && this.type!.map(item=>item))
    if (!this.person) return <></>;
    return (

      <div style={{height: '100%', overflowY: 'auto'}}>
        <div style={{
          float: 'left', marginTop: '40px',
          marginRight: "10px",
          width: "200px",
        }}>
          <Card
            hoverable
            cover={<img alt="example"
                        src={this.urlImg ? this.urlImg : require('../../../resources/img/my-team-person-logo.jpg')}/>}>
            <span className={'ant-tree-node-content-wrapper ant-tree-node-content-wrapper-normal'}
                  title={this.person.fullName}>
            <Meta title={<div style={{fontSize: 10, marginTop: '10px'}}>{this.person.firstLastName}</div>}/>
            </span>
            <span className={'ant-tree-node-content-wrapper ant-tree-node-content-wrapper-normal'}
                  title={this.person.organizationName || ''}>
            <Meta title={<span style={{fontSize: 10}}>{this.person.organizationName || ''}</span>}/>
            </span>
            <span className={'ant-tree-node-content-wrapper ant-tree-node-content-wrapper-normal'}
                  title={this.person.positionName || ''}>
            <Meta title={<span style={{fontSize: 10}}>{this.person.positionName || ''}</span>}/>
            </span>
              {typeof arr != "undefined" && arr != null && arr.length > 0 ?
                  arr && arr.filter((item) =>item!.type!.code === "email" || item!.type!.code ==="person email"
                ).map(item=><Meta title={<span style={{fontSize: 10}}><span>e-mail: </span>
                <a href={'mailto:' + item.contactValue}>{item.contactValue}</a>
                </span>}/>)
                  :<Meta title={<span style={{fontSize: 10}}><span>e-mail: </span>
                    <a href={'mailto:' }></a>
                </span>}/>
              }
              {typeof arr != "undefined" && arr != null && arr.length > 0 ?
                arr && arr.filter(item=> {
                  return item!.type!.code === "M" || item!.type!.code ==="W1" || item!.type!.code ==="H1"|| item!.type!.code === "mobile"
                }).map(item=> <Meta title={<span style={{fontSize: 9}}> <FormattedMessage id={"personInfo.phone"}/> {": " + item.contactValue }</span>}/>)
                : <Meta title={<span style={{fontSize: 9}}>{"тел: "  }</span>}/>
              }

          </Card>
          <List style={{fontSize: 'smaller'}}>
            {this.getLeftMenu().map((menu: Menu) => <List.Item
              style={this.selectedLeftMenu === menu.id ? {
                backgroundColor: '#bae7ff',
                marginTop: '10px',
                padding: '10px'
              } : {marginTop: '10px', padding: '10px'}}
              key={menu.id}
              onClick={() => {
                this.selectedLeftMenu = menu.id;
                this.callSetSelectedTabOrLeftMenu();
              }}><FormattedMessage id={menu.id}/></List.Item>)}
          </List>
        </div>
        <div style={{whiteSpace: 'nowrap'}}>
          <Tabs defaultActiveKey={this.selectedTab} onChange={activeKey => {
            this.selectedTab = activeKey;
            this.selectedLeftMenu = this.getLeftMenu()[0].id;
            this.callSetSelectedTabOrLeftMenu();
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
        getCubaREST()!.searchEntities<PersonContact>(PersonContact.NAME,{
          conditions:[{
            property:"personGroup.id",
            operator:"=",
            value:this.person.groupId
          }]
          },{view:"personContact.full"})
          .then(value=> this.type = value)
          .catch(() => {})
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
