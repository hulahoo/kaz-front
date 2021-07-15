import * as React from "react";
import {inject, observer} from "mobx-react";
import {FormComponentProps} from "antd/lib/form";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";

import {getCubaREST, injectMainStore, MainStoreInjected, withLocalizedForm} from "@cuba-platform/react";

import "../../../app/App.css";
import {observable, toJS} from "mobx";
import {OrganizationExt} from "../../../cuba/entities/base/base$OrganizationExt";
import moment from "moment";
import {JSON_DATE_TIME_FORMAT} from "../../util/Date/Date";
import {OrganizationIncentiveIndicators} from "../../../cuba/entities/base/tsadv_OrganizationIncentiveIndicators";
import {RootStoreProp} from "../../store";
import {OrganizationIncentiveResult} from "../../../cuba/entities/base/tsadv_OrganizationIncentiveResult";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import {Card, Input, Table} from "antd";
import Column from "antd/es/table/Column";
import LoadingPage from "../LoadingPage";
import Button, {ButtonType} from "../../components/Button/Button";
import {Link} from "react-router-dom";
import {IncentiveManagement} from "./IncentiveManagement";
import {capitalizeFirstLetter} from "../../util/util";
import Notification from "../../util/Notification/Notification";

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId: string;
};

@injectMainStore
@inject("rootStore")
@observer
class IncentiveEditComponent extends React.Component<Props & MainStoreInjected & WrappedComponentProps & RootStoreProp> {

  @observable
  organization: OrganizationExt;

  @observable
  indicators: OrganizationIncentiveIndicators[] = [];

  @observable
  results: OrganizationIncentiveResult[] = [];

  @observable
  finalResult: number;

  @observable
  committing = false;

  render() {

    if (!this.organization || this.indicators.length !== this.results.length) return <LoadingPage/>;

    const messages = this.props.mainStore!.messages!;

    const dayOptions = {month: 'long', year: 'numeric'};

    return (
      <Page
        pageName={this.props.intl.formatMessage({id: "menu.incentive"}) + ", "
        + this.organization['_instanceName'] + ", "
        + capitalizeFirstLetter(new Date().toLocaleDateString(this.props.rootStore!.userInfo.locale, dayOptions))}>
        <Section size="large">
          <Card className="narrow-layout card-actions-container"
                actions={[
                  <Link
                    to={IncentiveManagement.PATH}
                    key="close">
                    <Button buttonType={ButtonType.PRIMARY}
                            style={{margin: "0 12px 12px 0"}}>
                      <span><FormattedMessage id="close"/></span>
                    </Button>
                  </Link>,
                  <Button buttonType={ButtonType.FOLLOW}
                          onClick={this.save}
                          disabled={this.committing}
                          style={{margin: "0 12px 12px 0"}}>
                    <span><FormattedMessage id="save"/></span>
                  </Button>
                ]}
                bordered={false}>

            <div>
              <h1><FormattedMessage id={'final.result'}/> - {this.finalResult} %</h1>
            </div>

            <Table dataSource={this.indicators}
                   pagination={false}
            >
              <Column title={messages[OrganizationIncentiveResult.NAME + '.indicator']}
                      dataIndex="indicator._instanceName"
                      key="indicator"
              />
              <Column title={messages[OrganizationIncentiveResult.NAME + '.plan']}
                      dataIndex="plan"
                      key="plan"
                      render={(text, record: OrganizationIncentiveIndicators) => {
                        if (record.indicatorType !== 'PLAN_FACT') return '';
                        const result = this.getResult(record);
                        return <Input type={'number'}
                                      value={result.plan || 0}
                                      onChange={async (event) => {
                                        result.plan = event.currentTarget.value || 0;
                                        this.calcAndSaveResult(record, result);
                                        return event;
                                      }
                                      }/>;
                      }}
              />
              <Column title={messages[OrganizationIncentiveResult.NAME + '.fact']}
                      dataIndex="fact"
                      key="fact"
                      render={(text, record: OrganizationIncentiveIndicators) => {
                        if (record.indicatorType !== 'PLAN_FACT') return '';
                        const result = this.getResult(record);
                        return <Input type={'number'}
                                      value={result.fact || 0}
                                      onChange={event => {
                                        result.fact = event.currentTarget.value || 0;
                                        this.calcAndSaveResult(record, result);
                                        return event;
                                      }}
                        />;
                      }}/>
              <Column title={messages[OrganizationIncentiveResult.NAME + '.result']}
                      dataIndex="result"
                      key="result"
                      render={(text, record: OrganizationIncentiveIndicators) => {
                        const result = this.getResult(record);
                        return <Input type={'number'}
                                      disabled={record.indicatorType !== 'RESULT'}
                                      value={result.result || 0}
                                      onChange={async event => {
                                        result.result = event.currentTarget.value;
                                        await this.calcAndSaveResult(record, result);
                                        return event;
                                      }}
                        />;
                      }}/>
              <Column title={messages[OrganizationIncentiveResult.NAME + '.weight']}
                      dataIndex="weight"
                      key="weight"/>
              <Column title={<>{this.props.intl.formatMessage({id: "total"}) + ' %'}</>}
                      dataIndex="total"
                      render={(text, record: OrganizationIncentiveIndicators) => this.getTotal(this.getResult(record))}
                      key="total"/>
            </Table>
          </Card>
        </Section>
      </Page>
    )
  }

  save = async () => {
    this.committing = true;
    for (let result of this.results) {
      await getCubaREST()!.commitEntity(OrganizationIncentiveResult.NAME, toJS(result))
        .then(value => result.id = value.id);
    }
    Notification.success({
      message: this.props.intl.formatMessage({id: "management.editor.success"})
    });
    this.committing = false;
  }

  calcFinalResult = () => {
    this.finalResult = this.results.map(value => this.getTotal(value)).reduce((a, b) => a + b, 0);
  }

  getTotal = (result: OrganizationIncentiveResult) => {
    return Math.round((result.weight * result.result / 100 || 0) * 100) / 100;
  }

  calcAndSaveResult = (indicator: OrganizationIncentiveIndicators, result: OrganizationIncentiveResult) => {
    if (indicator.indicatorType === 'PLAN_FACT' && result.plan && result.fact) result.result = Math.round(result.fact * 10000.0 / result.plan) / 100;
    if (result.weight !== indicator.weight) result.weight = indicator.weight;

    this.results = this.results.map(value => value.indicator === result.indicator ? result : value);
    this.calcFinalResult();
  }

  getResult = (indicator: OrganizationIncentiveIndicators): OrganizationIncentiveResult => {
    return this.results.find(value => value.indicator!.id === indicator.indicator!.id)!;
  }

  loadOrganization = async () => {
    return await getCubaREST()!.searchEntities<OrganizationExt>(OrganizationExt.NAME, {
      conditions: [{
        property: 'group.id',
        operator: '=',
        value: this.props.entityId
      }, {
        property: 'startDate',
        operator: '<=',
        value: moment().format(JSON_DATE_TIME_FORMAT)
      }, {
        property: 'endDate',
        operator: '>=',
        value: moment().format(JSON_DATE_TIME_FORMAT)
      }]
    }, {
      view: '_local'
    }).then(value => value[0]);
  }

  loadIndicators = async () => {
    return await getCubaREST()!.searchEntities<OrganizationIncentiveIndicators>(OrganizationIncentiveIndicators.NAME, {
      conditions: [{
        property: 'organizationGroup.id',
        operator: '=',
        value: this.props.entityId
      }, {
        property: 'responsiblePerson.id',
        operator: '=',
        value: this.props.rootStore!.userInfo!.personGroupId!
      }, {
        property: 'dateFrom',
        operator: '<=',
        value: moment().endOf('month').format(JSON_DATE_TIME_FORMAT)
      }, {
        property: 'dateTo',
        operator: '>=',
        value: moment().startOf('month').format(JSON_DATE_TIME_FORMAT)
      }]
    }, {
      view: 'portal-organizationIncentiveIndicators-view'
    });
  }

  loadResults = async () => {
    return await getCubaREST()!.searchEntities<OrganizationIncentiveResult>(OrganizationIncentiveResult.NAME, {
      conditions: [{
        property: 'organizationGroup.id',
        operator: '=',
        value: this.props.entityId
      }, {
        property: 'periodDate',
        operator: '<=',
        value: moment().endOf('month').format(JSON_DATE_TIME_FORMAT)
      }, {
        property: 'periodDate',
        operator: '>=',
        value: moment().startOf('month').format(JSON_DATE_TIME_FORMAT)
      }]
    }, {
      view: 'portal-organizationIncentiveResult-view'
    });
  }

  componentDidMount() {
    (async () => {
      await this.loadOrganization().then(value => this.organization = value);
      await this.loadIndicators().then(value => this.indicators = value);
      let results: OrganizationIncentiveResult[] = [];
      await this.loadResults().then(value => results = value);

      this.results = this.indicators.map(indicator =>
        results.find(value => value.indicator!.id === indicator.indicator!.id)
        || {
          indicator: indicator.indicator,
          weight: indicator.weight,
          periodDate: moment().startOf('month').format(JSON_DATE_TIME_FORMAT),
          organizationGroup: {id: this.props.entityId}
        } as OrganizationIncentiveResult);

      this.calcFinalResult();
    })()
  }
}

export default injectIntl(
  withLocalizedForm<EditorProps>({
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
  })(IncentiveEditComponent)
);
