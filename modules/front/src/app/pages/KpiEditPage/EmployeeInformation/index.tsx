import React from 'react';
import CommonComponentHoc from "../../../hoc/CommonComponent/CommonComponentHoc";
import Input from "../../../components/Input/Input";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {observer} from "mobx-react";
import FormContainer from "../../../common/FormContainer";

@observer
class EmployeeInformation extends React.Component<WrappedComponentProps> {
  render() {
    const EmployeeInputComponent = CommonComponentHoc(
      <Input type={"text"} placeholder={this.props.intl.formatMessage({id: 'placeholder.employee'})} disabled={true}
             autoComplete={"off"}/>, {name: this.props.intl.formatMessage({id: 'employee'})});

    const PositionInputComponent = CommonComponentHoc(
      <Input type={"text"} placeholder={this.props.intl.formatMessage({id: 'placeholder.positionGroup'})}
             disabled={true}
             autoComplete={"off"}/>, {name: this.props.intl.formatMessage({id: 'positionGroup'})});

    const OrgInputComponent = CommonComponentHoc(
      <Input type={"text"} placeholder={this.props.intl.formatMessage({id: 'placeholder.organization'})} disabled={true}
             autoComplete={"off"}/>, {name: this.props.intl.formatMessage({id: 'organization'})});

    const CompanyInputComponent = CommonComponentHoc(
      <Input type={"text"} placeholder={this.props.intl.formatMessage({id: 'placeholder.company'})} disabled={true}
             autoComplete={"off"}/>, {name: this.props.intl.formatMessage({id: 'company'})});

    const GradeInputComponent = CommonComponentHoc(
      <Input type={"text"} placeholder={this.props.intl.formatMessage({id: 'placeholder.grade'})} disabled={true}
             autoComplete={"off"}/>, {name: this.props.intl.formatMessage({id: 'grade'})});

    const ManagerInputComponent = CommonComponentHoc(
      <Input type={"text"} placeholder={this.props.intl.formatMessage({id: 'placeholder.manager'})} disabled={true}
             autoComplete={"off"}/>, {name: this.props.intl.formatMessage({id: 'manager'})});

    const StartDateInputComponent = CommonComponentHoc(
      <Input type={"text"} placeholder={this.props.intl.formatMessage({id: 'placeholder.date'})} disabled={true}
             autoComplete={"off"}/>, {name: this.props.intl.formatMessage({id: 'kpi.edit.startDate'})});
    const EndDateInputComponent = CommonComponentHoc(
      <Input type={"text"} placeholder={this.props.intl.formatMessage({id: 'placeholder.date'})} disabled={true}
             autoComplete={"off"}/>, {name: this.props.intl.formatMessage({id: 'kpi.edit.endDate'})});

    return (
      <FormContainer>
        <EmployeeInputComponent/>
        <PositionInputComponent/>
        <OrgInputComponent/>
        <CompanyInputComponent/>
        <GradeInputComponent/>
        <ManagerInputComponent/>
        <StartDateInputComponent/>
        <EndDateInputComponent/>
      </FormContainer>
    );
  }
}

export default injectIntl(EmployeeInformation);