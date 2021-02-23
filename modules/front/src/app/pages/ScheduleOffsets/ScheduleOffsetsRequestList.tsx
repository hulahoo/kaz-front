import * as React from "react";
import { observer } from "mobx-react";

import {
  collection,
  Field,
  injectMainStore,
  MainStoreInjected,
} from "@cuba-platform/react";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";
import ShiftSchedulesList from "./ShiftSchedulesComponent";
import { PersonGroupExt } from "../../../cuba/entities/base/base$PersonGroupExt";
import { Alert, Card, Col, Form, InputNumber, message, Row, Select, Spin } from "antd";
import Page from "../../hoc/PageContentHoc";
import { observable } from "mobx";
import { ScheduleOffsetsRequestManagement } from "./ScheduleOffsetsRequestManagement";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import Button, { ButtonType } from "../../components/Button/Button";

@injectMainStore
@observer
class ScheduleOffsetsRequestListComponent extends React.Component<MainStoreInjected & WrappedComponentProps & RouteComponentProps> {
  personGroupsDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
    view: "_minimal",
    sort: "-createTs"
  });

  @observable selectedId: any;

  emplChange = (value: string, option: React.ReactElement<HTMLLIElement>) => {
    console.log(value);
    this.selectedId = value;
  };

  render() {
    const { Option } = Select;
    return (
      <Card style={{ margin: "10px" }}>
        <Row>
          <Col span={8}>
            <Link  to={ScheduleOffsetsRequestManagement.PATH + "/" + ScheduleOffsetsRequestManagement.NEW_SUBPATH} >
              <Button style={{ width: "300px", margin: "10px" }} children={<span>Новая заявка</span>} buttonType={ButtonType.FOLLOW} />
            </Link>
          </Col>

          <Col span={8}>
            <Spin spinning={this.personGroupsDc.status === 'LOADING'}>
              <Select onChange={this.emplChange} style={{ width: "300px", margin: "10px" }}>
                {this.personGroupsDc.items.map(gl => {
                  //@ts-ignore
                  return <Option value={gl.id}
                    category={gl.id!}>{gl._instanceName!}</Option>
                })}
              </Select>
            </Spin>
          </Col>
        </Row>
        <ShiftSchedulesList personGroupId={this.selectedId} key={this.selectedId} />
      </Card>
    );
  }





}

const ScheduleOffsetsRequestList = injectIntl(
  ScheduleOffsetsRequestListComponent
);

export default withRouter(ScheduleOffsetsRequestList);
