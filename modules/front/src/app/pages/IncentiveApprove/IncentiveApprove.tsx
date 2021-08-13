import * as React from "react";
import {createElement} from "react";
import {inject, observer} from "mobx-react";
import {FormComponentProps} from "antd/lib/form";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";

import {injectMainStore, MainStoreInjected, Msg, withLocalizedForm} from "@cuba-platform/react";

import "../../App.css";
import {observable} from "mobx";
import {OrganizationIncentiveIndicators} from "../../../cuba/entities/base/tsadv_OrganizationIncentiveIndicators";
import {RootStoreProp} from "../../store";
import {OrganizationIncentiveResult} from "../../../cuba/entities/base/tsadv_OrganizationIncentiveResult";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import {Card, Form, Table} from "antd";
import Column from "antd/es/table/Column";
import LoadingPage from "../LoadingPage";
import Button, {ButtonType} from "../../components/Button/Button";
import {capitalizeFirstLetter, goBackOrHomePage} from "../../util/util";
import {DicIncentiveIndicatorScoreSetting} from "../../../cuba/entities/base/tsadv_DicIncentiveIndicatorScoreSetting";
import {OrganizationIncentiveMonthResult} from "../../../cuba/entities/base/tsadv_OrganizationIncentiveMonthResult";
import {instanceStore} from "../../util/InstanceStore";
import TextArea from "antd/es/input/TextArea";
import {withRouter} from "react-router";
import {RouteComponentProps} from "react-router-dom";
import {restServices} from "../../../cuba/services";
import Notification from "../../util/Notification/Notification";

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId: string;
};

@injectMainStore
@inject("rootStore")
@observer
class IncentiveApproveComponent extends React.Component<Props & MainStoreInjected & WrappedComponentProps & RootStoreProp & RouteComponentProps<any>> {

  dataInstance = instanceStore<OrganizationIncentiveMonthResult>(OrganizationIncentiveMonthResult.NAME, {
    view: "portal-organizationIncentiveMonthResult-view",
    loadImmediately: false
  });

  @observable
  results: OrganizationIncentiveResult[] = [];

  render() {

    if (this.dataInstance.status === 'LOADING') return <LoadingPage/>;

    const messages = this.props.mainStore!.messages!;

    const dayOptions = {month: 'long', year: 'numeric'};

    return (
      <Page
        pageName={this.props.intl.formatMessage({id: "menu.incentive"}) + ", "
        + capitalizeFirstLetter(new Date().toLocaleDateString(this.props.rootStore!.userInfo.locale, dayOptions))}>
        <Section size="large">
          <Card className="narrow-layout card-actions-container"
                actions={[
                  <Button buttonType={ButtonType.PRIMARY}
                          key={'close'}
                          onClick={event => goBackOrHomePage(this.props.history)}
                          style={{margin: "0 12px 12px 0"}}>
                    <span><FormattedMessage id="close"/></span>
                  </Button>,
                  <Button buttonType={ButtonType.PRIMARY}
                          key={'REVISION'}
                          disabled={!!(this.dataInstance.item && this.dataInstance.item.status)}
                          className={'REVISION'.toLowerCase()}
                          onClick={event => this.save('REVISION')}
                          style={{margin: "0 12px 12px 0"}}>
                    <span><FormattedMessage id="REVISION"/></span>
                  </Button>,
                  <Button buttonType={ButtonType.PRIMARY}
                          key={'APPROVE'}
                          disabled={!!(this.dataInstance.item && this.dataInstance.item.status)}
                          onClick={event => this.save('APPROVED')}
                          className={'APPROVE'.toLowerCase()}
                          style={{margin: "0 12px 12px 0"}}>
                    <span><FormattedMessage id="APPROVE"/></span>
                  </Button>]}
                bordered={false}>

            <Table dataSource={this.results}
                   pagination={false}>
              <Column title={messages[OrganizationIncentiveResult.NAME + '.organizationGroup']}
                      dataIndex="organizationGroup._instanceName"
                      key="organizationGroup"
              />
              <Column title={messages[OrganizationIncentiveResult.NAME + '.indicator']}
                      dataIndex="indicator._instanceName"
                      key="indicator"
              />
              <Column title={messages[OrganizationIncentiveResult.NAME + '.plan']}
                      dataIndex="plan"
                      key="plan"/>
              <Column title={messages[OrganizationIncentiveResult.NAME + '.fact']}
                      dataIndex="fact"
                      key="fact"/>
              <Column title={messages[OrganizationIncentiveResult.NAME + '.result']}
                      dataIndex="result"
                      key="result"/>
              <Column title={messages[OrganizationIncentiveResult.NAME + '.weight']}
                      dataIndex="weight"
                      key="weight"/>
              <Column title={<>{this.props.intl.formatMessage({id: "total"}) + ' %'}</>}
                      dataIndex="total"
                      render={(text, record: OrganizationIncentiveIndicators) => this.getTotal(record)}
                      key="total"/>
            </Table>

            <Form.Item
              style={{marginTop: 20}}
              label={createElement(Msg, {entityName: this.dataInstance.entityName, propertyName: "comment"})}>
              {this.props.form.getFieldDecorator("comment", {
                rules: [{
                  required: true,
                  message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.comment']})
                }]
              })(
                <TextArea
                  rows={4}/>
              )}
            </Form.Item>

          </Card>
        </Section>
      </Page>
    )
  }

  save = (status: string) => {
    this.props.form.validateFields(['comment'], {force: true}, (err, values) => {
      if (err) {
        Notification.error({
            message: this.props.intl.formatMessage({
              id: "management.editor.validationError"
            })
          }
        );
        return;
      }
      restServices.incentiveService.saveMonthResult(status, this.props.form.getFieldValue('comment'), this.props.entityId)
        .then(value => {
          Notification.success({
            message: this.props.intl.formatMessage({id: `bproc.${status}.success`})
          });
          goBackOrHomePage(this.props.history);
        })
        .catch((e: any) => {
          Notification.error({
            message: this.props.intl.formatMessage({id: "management.editor.error"})
          });
        })
    })
  }

  getTotal = (result: OrganizationIncentiveResult) => {
    const scoreSettings = result.indicator!.scoreSettings as DicIncentiveIndicatorScoreSetting[];
    if (!scoreSettings) return 0;

    const score = scoreSettings.find(value => parseFloat(value.minPercent!) <= result.result && result.result <= parseFloat(value.maxPercent!));

    return score && score.totalScore;
  }

  componentDidMount() {
    (async () => {
      await this.dataInstance.load(this.props.entityId);

      this.results = this.dataInstance.item && this.dataInstance.item.incentiveResults || [];
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
  })(withRouter(IncentiveApproveComponent))
);
