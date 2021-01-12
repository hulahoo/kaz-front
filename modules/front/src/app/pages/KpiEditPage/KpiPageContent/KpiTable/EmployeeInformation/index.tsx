import React from 'react';
import CommonComponentHoc from "../../../../../hoc/CommonComponent/CommonComponentHoc";
import Input from "../../../../../components/Input/Input";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {inject, observer} from "mobx-react";
import FormContainer from "../../../../../common/FormContainer";
import {RootStoreProp} from "../../../../../store";
import DefaultDatePicker from "../../../../../components/Datepicker";
import moment from "moment";

//@inject("rootStore")
@observer
class EmployeeInformation extends React.Component<WrappedComponentProps & RootStoreProp> {
  render() {
    const {kpiEditStore} = this.props.rootStore!;

    const EmployeeInputComponent = CommonComponentHoc(
      <Input type={"text"} placeholder={this.props.intl.formatMessage({id: 'placeholder.employee'})} disabled={true}
             value={kpiEditStore.state.personFullName}
             autoComplete={"off"}/>, {name: this.props.intl.formatMessage({id: 'employee'})});

    const PositionInputComponent = CommonComponentHoc(
      <Input type={"text"} placeholder={this.props.intl.formatMessage({id: 'placeholder.positionGroup'})}
             value={kpiEditStore.state.positionName}
             disabled={true}
             autoComplete={"off"}/>, {name: this.props.intl.formatMessage({id: 'positionGroup'})});

    const OrgInputComponent = CommonComponentHoc(
      <Input type={"text"} placeholder={this.props.intl.formatMessage({id: 'placeholder.organization'})} disabled={true}
             value={kpiEditStore.state.orgName}
             autoComplete={"off"}/>, {name: this.props.intl.formatMessage({id: 'organization'})});

    const CompanyInputComponent = CommonComponentHoc(
      <Input type={"text"} placeholder={this.props.intl.formatMessage({id: 'placeholder.company'})} disabled={true}
             value={kpiEditStore.state.compName}
             autoComplete={"off"}/>, {name: this.props.intl.formatMessage({id: 'company'})});

    const GradeInputComponent = CommonComponentHoc(
      <Input type={"text"} placeholder={this.props.intl.formatMessage({id: 'placeholder.grade'})} disabled={true}
             value={kpiEditStore.state.gradeName}
             autoComplete={"off"}/>, {name: this.props.intl.formatMessage({id: 'grade'})});

    const ManagerInputComponent = CommonComponentHoc(
      <Input type={"text"} placeholder={this.props.intl.formatMessage({id: 'placeholder.manager'})} disabled={true}
             value={kpiEditStore.state.managerName}
             autoComplete={"off"}/>, {name: this.props.intl.formatMessage({id: 'manager'})});

    const StartDateInputComponent = CommonComponentHoc(
      <DefaultDatePicker placeholder={this.props.intl.formatMessage({id: 'placeholder.date'})} disabled={true}
                         value={kpiEditStore.state.startDate}/>,
      {name: this.props.intl.formatMessage({id: 'kpi.edit.startDate'})});
    const EndDateInputComponent = CommonComponentHoc(
      <DefaultDatePicker placeholder={this.props.intl.formatMessage({id: 'placeholder.date'})} disabled={true}
                         value={kpiEditStore.state.endDate}/>,
      {name: this.props.intl.formatMessage({id: 'kpi.edit.endDate'})});

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