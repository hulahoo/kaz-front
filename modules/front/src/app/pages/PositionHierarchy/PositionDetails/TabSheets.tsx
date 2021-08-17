import * as React from "react";
import {Tabs} from "antd";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {PositionDetailsProps} from "./PositionDetails";
import JobDescriptionForm from "./JobDescriptionForm";
import "./TabSheets.css";

const {TabPane} = Tabs;

class TabSheets extends React.Component<WrappedComponentProps & PositionDetailsProps> {

  render(): React.ReactNode {
    return <Tabs className={"tabSheet"} defaultActiveKey="1" type="card">
      <TabPane tab={this.props.intl.formatMessage({
        id: "jobDescriptionRequests"
      })} key="1">
        {this.props.selectedPosition}
      </TabPane>
      <TabPane tab={this.props.intl.formatMessage({
        id: "jobDescription"
      })} key="2">
        <JobDescriptionForm selectedPosition={this.props.selectedPosition}/>
      </TabPane>
    </Tabs>
  }
}

export default injectIntl(TabSheets);