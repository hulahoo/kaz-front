import React from 'react';
import {Tabs} from "antd";
import {injectIntl, WrappedComponentProps} from "react-intl";

class KpiTable extends React.Component<WrappedComponentProps> {
  render() {
    const {TabPane} = Tabs;

    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab={this.props.intl.formatMessage({id: "kpi.edit.tabs.ratingForm"})} key="1">
          <div>
          </div>
        </TabPane>
        <TabPane tab={this.props.intl.formatMessage({id: "kpi.edit.tabs.approvers"})} key="2">
          <div>
          </div>
        </TabPane>
        <TabPane tab={this.props.intl.formatMessage({id: "kpi.edit.tabs.ratingForm"})} key="3">
          <div>
          </div>
        </TabPane>
        <TabPane tab={this.props.intl.formatMessage({id: "kpi.edit.tabs.tree"})} key="4">
          <div>
          </div>
        </TabPane>
      </Tabs>
    );
  }
}

export default injectIntl(KpiTable);