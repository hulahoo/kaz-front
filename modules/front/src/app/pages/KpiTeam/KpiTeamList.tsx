import * as React from "react";
import {inject, observer} from "mobx-react";

import {observable} from "mobx";

import {Col, Row, Select} from "antd";

import {injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {SerializedEntity} from "@cuba-platform/rest";

import {injectIntl, WrappedComponentProps} from "react-intl";
import {RootStoreProp} from "../../store";
import {PerformancePlan} from "../../../cuba/entities/base/tsadv$PerformancePlan";
import KpiCard from "./KpiCard";
import {restQueries} from "../../../cuba/queries";
import MyTeamComponent from "../MyTeam/MyTeamComponent";

@injectMainStore
@inject("rootStore")
@observer
class KpiTeamListComponent extends React.Component<MainStoreInjected & WrappedComponentProps & RootStoreProp> {

  @observable
  performancePlan?: string;

  @observable
  performancePlans: SerializedEntity<PerformancePlan>[];

  personCard = (personGroupId: string): React.ReactElement => {
    if (!personGroupId) return <></>;
    return <KpiCard key={personGroupId + "/" + this.performancePlan}
                    personGroupId={personGroupId}
                    performancePlan={this.performancePlan}/>
  }

  render() {
    const {Option} = Select;

    return (
      <div style={{height: '100%'}}>
        <Row style={{"margin": '10px 0'}}>
          <Col span={8} style={{height: '100%'}}>
            <Select onChange={value => this.performancePlan = value ? value as string : undefined}
                    style={{width: '100%'}}
                    allowClear
                    placeholder={this.props.intl.formatMessage({id: "kpiTeam.list.filter.performancePlan"})}>
              {this.performancePlans ? this.performancePlans.map(pp => {
                return <Option value={pp.id} key={pp.id}>{pp._instanceName}</Option>
              }) : <Option key={"empty"}/>}
            </Select>
          </Col>
        </Row>
        <MyTeamComponent
          selectedTab={() => this.props.rootStore!.myTeamInfo.selectedTab}
          selectedLeftMenu={() => this.props.rootStore!.myTeamInfo.selectedMenu}
          selectedData={this.props.rootStore!.myTeamInfo.selectedMyTeamData}
          onChangeSelectedInfo={this.props.rootStore!.myTeamInfo.setMyTeamInfo}
          positionGroupId={this.props.rootStore!.userInfo!.positionGroupId!}
          personCard={this.personCard}/>
      </div>
    );
  }

  componentDidMount() {
    restQueries.kpiTeamPerformancePlans(this.props.rootStore!.userInfo.personGroupId!).then(response => {
      this.performancePlans = response.filter(((value, index, array) => {
        for (let i = 0; i < index; i++) {
          if (array[i].id === value.id) {
            return false;
          }
        }
        return true;
      }));
    }).catch(() => {
    });
  }
}

export default injectIntl(KpiTeamListComponent);
