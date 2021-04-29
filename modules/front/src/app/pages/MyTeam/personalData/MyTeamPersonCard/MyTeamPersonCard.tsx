import * as React from "react";
import {createElement} from "react";
import {observer} from "mobx-react";

import {injectMainStore, MainStoreInjected, Msg, withLocalizedForm} from "@cuba-platform/react";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {PersonProfile} from "../../MyTeamCard";
import {Col, DatePicker, Form, Input, Row} from "antd";
import {PersonExt} from "../../../../../cuba/entities/base/base$PersonExt";
import {FormComponentProps} from "antd/lib/form";
import moment from "moment";
import {DEFAULT_DATE_FORMAT} from "../../../../components/Datepicker";

export  type  PersonCardProps = {
  person?: PersonProfile
}

@injectMainStore
@observer
class MyTeamPersonCard extends React.Component<PersonCardProps & MainStoreInjected & WrappedComponentProps & FormComponentProps> {

  person = this.props.person;

  render() {

    return (
      <div>
        <Form>
          <Row type={"flex"} className={"data-form"}>
            <Col md={18} lg={9} style={{marginRight: '30px'}}>
              <Form.Item style={{marginBottom: "12px"}}
                         label={createElement(Msg, {entityName: PersonExt.NAME, propertyName: "fullName"})}>
                {this.props.form.getFieldDecorator("fullName",
                  {
                    initialValue: this.person ? this.person.fullName : ""
                  })(
                  <Input disabled/>
                )}
              </Form.Item>

              <Form.Item style={{marginBottom: "12px"}}
                         label={createElement(Msg, {entityName: PersonExt.NAME, propertyName: "dateOfBirth"})}>
                {this.props.form.getFieldDecorator("birthDate",
                  {
                    initialValue: this.person ? moment(this.person.birthDate) : null
                  })(
                  <DatePicker format={DEFAULT_DATE_FORMAT} disabled/>
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

            </Col>
            <Col md={18} lg={9}>
              <Form.Item style={{marginBottom: "12px"}}
                         label={createElement(Msg, {entityName: PersonExt.NAME, propertyName: "citizenship"})}>
                {this.props.form.getFieldDecorator("citizenship",
                  {
                    initialValue: this.person ? this.person.citizenship : ""
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

              <Form.Item style={{marginBottom: "12px"}}
                         label={createElement(Msg, {entityName: PersonExt.NAME, propertyName: "hireDate"})}>
                {this.props.form.getFieldDecorator("hireDate",
                  {
                    initialValue: this.person ? moment(this.person.hireDate) : null
                  })(
                  <DatePicker format={DEFAULT_DATE_FORMAT} disabled/>
                )}
              </Form.Item>

            </Col>
          </Row>
        </Form>
      </div>
    )
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
  })(MyTeamPersonCard)
);