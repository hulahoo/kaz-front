import * as React from "react";
import {createElement} from "react";

import {getCubaREST, injectMainStore, MainStoreInjected, Msg, withLocalizedForm} from "@cuba-platform/react";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {Button, Form, Input, Row} from "antd";
import {FormComponentProps} from "antd/lib/form";
import moment from "moment";
import {PersonProfile} from "../../../MyTeam/MyTeamCard";
import {PersonExt} from "../../../../../cuba/entities/base/base$PersonExt";
import DefaultDatePicker from "../../../../components/Datepicker";
import {inject, observer} from "mobx-react";
import {PersonalDataRequestManagement} from "../../../PersonalDataRequest/PersonalDataRequestManagement";
import {PersonalDataRequest} from "../../../../../cuba/entities/base/tsadv$PersonalDataRequest";
import {RootStoreProp} from "../../../../store";
import {RouteComponentProps} from "react-router-dom";
import {withRouter} from "react-router";

export  type  PersonCardProps = {
  person?: PersonProfile
}

@injectMainStore
@inject("rootStore")
@observer
class PersonInfo extends React.Component<PersonCardProps & MainStoreInjected & WrappedComponentProps & FormComponentProps & RootStoreProp & RouteComponentProps> {

  person = this.props.person;

  render() {

    return (
      <div>
        <div className={"section-header-container"} style={{display: 'flex'}}>
          <div className={'title'}>
            {this.props.intl.formatMessage({id: "myProfile.mainData"})}
          </div>
          <Button
            type={'link'}
            onClick={this.openRequest}
            style={{marginLeft: 10}}
            key="edit"
          >
            <img alt={this.props.intl.formatMessage({id: "management.browser.edit"})}
                 width={25}
                 src={require("../../../../../resources/icons/user/user-edit-solid.svg")}/>
          </Button>
        </div>
        <Form style={{paddingBottom: 10}}>
          <Row type={"flex"} className={"data-form"}>

            <Form.Item style={{marginBottom: "12px"}}
                       label={createElement(Msg, {entityName: PersonExt.NAME, propertyName: "dateOfBirth"})}>
              {this.props.form.getFieldDecorator("birthDate",
                {
                  initialValue: this.person ? moment(this.person.birthDate) : null
                })(
                <DefaultDatePicker disabled/>
              )}
            </Form.Item>

            <Form.Item style={{marginBottom: "12px"}}
                       label={createElement(Msg, {entityName: PersonExt.NAME, propertyName: "sex"})}>
              {this.props.form.getFieldDecorator("sex",
                {
                  initialValue: this.person ? this.person.sex : null
                })(
                <Input disabled/>
              )}
            </Form.Item>

            <Form.Item style={{marginBottom: "12px"}}
                       label={createElement(Msg, {entityName: PersonExt.NAME, propertyName: "nationality"})}>
              {this.props.form.getFieldDecorator("nationality",
                {
                  initialValue: this.person ? this.person.nationality : ""
                })(
                <Input disabled/>
              )}
            </Form.Item>

            <Form.Item style={{marginBottom: "12px"}}
                       label={<FormattedMessage id={'cityOfResidence'}/>}>
              {this.props.form.getFieldDecorator("cityOfResidence",
                {
                  initialValue: this.person ? this.person.cityOfResidence : null
                })(
                <Input disabled/>
              )}
            </Form.Item>

          </Row>
        </Form>
      </div>
    )
  }

  openRequest = () => {
    this.getPersonalDataRequest()
      .then(value => this.props.history!.push(PersonalDataRequestManagement.PATH + '/' + value));
  }

  getPersonalDataRequest = (): Promise<String> => {
    return getCubaREST()!.searchEntities<PersonalDataRequest>(PersonalDataRequest.NAME, {
      conditions: [{
        property: 'personGroup.id',
        operator: '=',
        value: this.props.rootStore!.userInfo!.personGroupId!
      }, {
        property: 'status.code',
        operator: 'in',
        value: ['DRAFT', 'APPROVING']
      }]
    }, {
      view: 'personalDataRequest-edit'
    }).then(values => {
      if (!values || values.length === 0) {
        return PersonalDataRequestManagement.NEW_SUBPATH;
      } else {
        const approvingRequest = values.find(value => value!.status!.code === 'APPROVING');
        return approvingRequest ? approvingRequest.id : values[0].id;
      }
    })
  }
}

export default injectIntl(
  withLocalizedForm({
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
  })(withRouter(PersonInfo))
);