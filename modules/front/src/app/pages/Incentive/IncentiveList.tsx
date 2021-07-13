import * as React from "react";
import {observer} from "mobx-react";

import {handleTableChange, injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {RootStoreProp} from "../../store";
import {serviceCollection} from "../../util/ServiceDataCollectionStore";
import {restServices} from "../../../cuba/services";
import {IncentivePojo} from "../../../cuba/entities/base/tsadv_IncentivePojo";
import {Table} from "antd";
import Column from "antd/es/table/Column";
import {formatDate} from "../../util/Date/Date";
import {Link} from "react-router-dom";
import {IncentiveManagement} from "./IncentiveManagement";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import {action} from "mobx";
import {PaginationConfig} from "antd/es/pagination";
import {SorterResult} from "antd/es/table";

@injectMainStore
@observer
class IncentiveListComponent extends React.Component<MainStoreInjected & WrappedComponentProps & RootStoreProp> {
  dataCollection = serviceCollection(
    (pagination) => restServices.incentiveService.getIncentiveList(pagination), IncentivePojo.NAME)

  fields = ["date", "organizationName", "result"];

  @action
  handleChange = (pagination: PaginationConfig, tableFilters: Record<string, string[]>, sorter: SorterResult<any>): void => {
    handleTableChange({
      pagination: pagination,
      filters: tableFilters,
      sorter: sorter,
      defaultSort: '-updateTs',
      fields: this.fields,
      mainStore: this.props.mainStore!,
      dataCollection: this.dataCollection
    });
  };

  render() {

    return (
      <Page pageName={this.props.intl.formatMessage({id: "menu.incentive"})}>
        <Section size="large">
          <Table dataSource={this.dataCollection.items.slice()}
                 size="default"
                 bordered={false}
                 onChange={this.handleChange}
                 pagination={{
                   showSizeChanger: true,
                   total: this.dataCollection.count,
                 }}
                 rowKey="id">
            <Column title={<>{this.props.intl.formatMessage({id: "period"})}</>}
                    dataIndex="date"
                    key="date" render={(text, record: any) => {
              return formatDate(record.date, 'YYYY.MM');
            }}/>
            <Column title={<>{this.props.intl.formatMessage({id: "organization"})}</>}
                    dataIndex="organizationName"
                    key="organizationName"
                    render={(text, record: IncentivePojo) => {
                      if (formatDate(record.date, 'YYYY.MM') === formatDate(new Date(), 'YYYY.MM'))
                        return <Link to={`${IncentiveManagement.PATH}/${record.organizationGroupId}`}>{text}</Link>
                      else return text
                    }}
            />
            <Column title={<>{this.props.intl.formatMessage({id: "result"})}</>}
                    dataIndex="result"
                    key="result"/>
          </Table>
        </Section>
      </Page>
    );
  }

  componentDidMount() {
    this.dataCollection.load();
  }
}

const IncentiveList = injectIntl(IncentiveListComponent);

export default IncentiveList;
