import React, {Component, Ref, RefObject} from 'react';
import FormContainer from "../../../../../../common/FormContainer";
import CommonComponentHoc from "../../../../../../hoc/CommonComponent/CommonComponentHoc";
import {injectIntl, WrappedComponentProps} from "react-intl";
import DefaultDropdown from "../../../../../../components/Dropdown/DefaultDropdown";
import {RootStoreProp} from "../../../../../../store";
import {inject, observer} from "mobx-react";
import LoadingPage from "../../../../../LoadingPage";
// import Input from "../../../../../../components/Input/Input";
import DefaultDatePicker from "../../../../../../components/Datepicker";
import * as moment from "moment";
import DefaultInputNumber from "../../../../../../components/DefaultInputNumber";
import Input from "../../../../../../components/Input/Input";
import Goal from "./Goal";

//@inject("rootStore")
@observer
class DefaultGoalSection extends Component<WrappedComponentProps & RootStoreProp> {

  componentDidMount(): void {
    // this.props.rootStore!.createDefaultGoalStore();
  }

  render() {
    const {goalStore} = this.props.rootStore!;
    // if (!goalStore) {
    //   return <LoadingPage/>
    // }

    // const CategorySelect = CommonComponentHoc(
    //   <DefaultDropdown menu={goalStore.categories ? goalStore.categories.map(e => {
    //     return {
    //       id: e.id,
    //       value: e.name
    //     }
    //   }) : goalStore.categories}
    //                    selected={goalStore.selectedCategory}
    //                    placeholder={this.props.intl.formatMessage({id: 'placeholder.category'})}
    //                    handleMenuClick={goalStore.setSelectedCategory}/>,
    //   {name: this.props.intl.formatMessage({id: 'category'})});
    //
    // const GoalComponent = CommonComponentHoc(
    //   <Input type={"text"} placeholder={this.props.intl.formatMessage({id: 'placeholder.goal'})}
    //          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
    //            goalStore.setGoalName(e.target.value)
    //          }}
    //          key={"1"}
    //          value={goalStore.goalName}
    //          autoComplete={"off"}/>, {name: this.props.intl.formatMessage({id: 'goal'})});
    //
    const DescriptionComponent = CommonComponentHoc(
      <Input type={"text"} placeholder={this.props.intl.formatMessage({id: 'placeholder.description'})}
             onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
               goalStore.setDescription(e.target.value)
             }}
             key={"2"}
             value={goalStore.description}
             autoComplete={"off"}/>, {name: this.props.intl.formatMessage({id: 'description'})});

    // const WeightComponent = CommonComponentHoc(
    //   <DefaultInputNumber type={"text"} placeholder={this.props.intl.formatMessage({id: 'placeholder.weight'})}
    //                       // onChange={(value: number) => {
    //                       //   goalStore.setWeight(value)
    //                       // }}
    //                       // value={goalStore.weight}
    //                       autoComplete={"off"}/>, {name: this.props.intl.formatMessage({id: 'weight'})});
    //
    // const ExpiredDateComponent = CommonComponentHoc(
    //   <DefaultDatePicker placeholder={this.props.intl.formatMessage({id: 'placeholder.date'})}
    //                      // onChange={(date: moment.Moment) => {
    //                      //   goalStore.setExpiredDate(date)
    //                      // }}
    //                      // value={goalStore.expiredDate}
    //   />, {name: this.props.intl.formatMessage({id: 'expiredDate'})});
    //
    // const CommentComponent = CommonComponentHoc(
    //   <Input type={"text"} placeholder={this.props.intl.formatMessage({id: 'placeholder.comment'})}
    //          // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
    //          //   goalStore.setComment(e.target.value)
    //          // }}
    //          // value={goalStore.comment}
    //          autoComplete={"off"}/>, {name: this.props.intl.formatMessage({id: 'comment'})});
    return (
      <FormContainer>
        <Input type={"text"} placeholder={this.props.intl.formatMessage({id: 'placeholder.goal'})}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                 goalStore.setGoalName(e.target.value)
               }}
               key={"333"}
               value={goalStore.goalName}
               autoComplete={"off"}/>
        <Input type={"text"} placeholder={this.props.intl.formatMessage({id: 'placeholder.goal'})}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                 goalStore.setDescription(e.target.value)
               }}
               value={goalStore.description}
               autoComplete={"off"}/>
        {/*<CategorySelect/>*/}
        {/*<GoalComponent/>*/}
        <DescriptionComponent/>
        {/*<WeightComponent/>*/}
        {/*<ExpiredDateComponent/>*/}
        {/*<CommentComponent/>*/}
      </FormContainer>
    );
  }
}

export default injectIntl(DefaultGoalSection);