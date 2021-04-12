import * as React from "react";
import {createElement} from "react";
import {Card, Form, Input} from "antd";
import {inject, observer} from "mobx-react";
import {injectIntl, WrappedComponentProps} from "react-intl";

import {
  collection,
  getCubaREST,
  injectMainStore,
  instance,
  MainStoreInjected,
  Msg,
  withLocalizedForm
} from "@cuba-platform/react";

import "../../../../../app/App.css";

import {RouteComponentProps, withRouter} from "react-router";
import AbstractBprocEdit from "../../../Bproc/abstract/AbstractBprocEdit";
import {DicRequestStatus} from "../../../../../cuba/entities/base/tsadv$DicRequestStatus";
import LoadingPage from "../../../LoadingPage";
import Page from "../../../../hoc/PageContentHoc";
import Section from "../../../../hoc/Section";
import Button, {ButtonType} from "../../../../components/Button/Button";
import {ReadonlyField} from "../../../../components/ReadonlyField";
import {RootStoreProp} from "../../../../store";
import {PersonExt} from "../../../../../cuba/entities/base/base$PersonExt";
import {ChangeAbsenceDaysRequest} from "../../../../../cuba/entities/base/tsadv_ChangeAbsenceDaysRequest";
import moment from "moment/moment";
import {observable} from "mobx";
import {getFullName} from "../../../../util/util";

type EditorProps = {
  entityId: string;
  personGroupId: string;
};

@inject("rootStore")
@injectMainStore
@observer
class ChangeAbsenceDaysRequestEdit extends AbstractBprocEdit<ChangeAbsenceDaysRequest, EditorProps> {
  dataInstance = instance<ChangeAbsenceDaysRequest>(ChangeAbsenceDaysRequest.NAME, {
    view: "changeAbsenceDaysRequest.edit",
    loadImmediately: false
  });

  statusesDc = collection<DicRequestStatus>(DicRequestStatus.NAME, {
    view: "_minimal"
  });

  fields = [
    "requestNumber",

    "requestDate",

    "status",

    "type",

    "purpose",

    "timeOfStarting",

    "timeOfFinishing",

    "compensation",

    "vacationDay"
  ];

  @observable
  person: PersonExt;

  getUpdateEntityData = (): any => {
    if (this.isNotDraft())
      return {
        ...this.props.form.getFieldsValue(this.fields)
      }

    return {
      employee: {
        id: this.props.personGroupId
      },
      ...this.props.form.getFieldsValue(this.fields)
    }
  };

  processDefinitionKey = "changeAbsenceDaysRequest";

  render() {

    console.log(this.person);

    if (!this.dataInstance) {
      return <LoadingPage/>
    }

    return (
      <Page pageName={this.props.intl.formatMessage({id: "leavingVacationRequest"})}>
        <Section size="large">
          <div>
            <Card className="narrow-layout card-actions-container" actions={[
              <Button buttonType={ButtonType.FOLLOW}
                      onClick={this.props.history!.goBack}>{this.props.intl.formatMessage({id: "close"})}</Button>,
              this.getOutcomeBtns()]}
                  bordered={false}>
              <Form onSubmit={this.validate} layout="vertical">

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="requestNumber"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  disabled={true}
                  getFieldDecoratorOpts={{
                    rules: [{required: true,}]
                  }}
                />

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="status"
                  disabled={true}
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  optionsContainer={this.statusesDc}
                  getFieldDecoratorOpts={{
                    rules: [{required: true,}]
                  }}
                />

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="requestDate"
                  form={this.props.form}
                  disabled={true}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                />

                <div className={"ant-row ant-form-item"} style={{marginBottom: "12px"}}>
                  {createElement(Msg, {entityName: this.dataInstance.entityName, propertyName: "employee"})}
                  <Input disabled={true}
                         value={this.person ? getFullName(this.person, this.props.rootStore!.userInfo!.locale!) || '' : ''}/>
                </div>

                {/*<ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="type"
                  form={this.props.form}
                  disabled={true}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                />*/}

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="purpose"
                  form={this.props.form}
                  disabled={true}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                />

                {this.takCard()}

              </Form>
            </Card>

          </div>
        </Section>
      </Page>
    );
  }

  componentDidMount() {
    super.componentDidMount();

    this.loadPerson().then(value => this.person = value);

    this.setEmployee(this.props.personGroupId);
  }

  loadPerson = (): Promise<PersonExt> => {
    return getCubaREST()!.searchEntities(PersonExt.NAME, {
      conditions: [{
        property: 'group.id',
        operator: '=',
        value: this.props.personGroupId,
      }, {
        property: 'startDate',
        operator: '<',
        value: moment().format('YYYY-MM-DD'),
      }, {
        property: 'endDate',
        operator: '>',
        value: moment().format('YYYY-MM-DD'),

      }]
    }, {
      view: '_local'
    }).then(value => value[0] as PersonExt);
  }
}

const onValuesChange = (props: any, changedValues: any) => {
  // Reset server-side errors when field is edited
  Object.keys(changedValues).forEach((fieldName: string) => {
    props.form.setFields({
      [fieldName]: {
        value: changedValues[fieldName]
      }
    });
  });
};

const component = injectIntl(withLocalizedForm<EditorProps & WrappedComponentProps & RootStoreProp & MainStoreInjected & RouteComponentProps<any>>(
  {onValuesChange})(ChangeAbsenceDaysRequestEdit));
export default withRouter(component);
