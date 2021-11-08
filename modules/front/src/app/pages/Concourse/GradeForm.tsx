import * as React from "react";
import { FormEvent } from "react";
import { Alert, Button, Card, Form, message, Row, Tabs, Layout, Select, Checkbox } from "antd";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import {inject, observer} from "mobx-react";
import { ConcourseManagement } from "./ConcourseManagement";
import { FormComponentProps } from "antd/lib/form";
import {Link, Redirect, RouteComponentProps} from "react-router-dom";
import { IReactionDisposer, observable, reaction, toJS } from "mobx";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";

import {
  Field,
  instance,
  withLocalizedForm,
  extractServerValidationErrors,
  constructFieldsWithErrors,
  clearFieldErrors, collection,
  MultilineText, injectMainStore, MainStoreInjected, Msg, Instance
} from "@cuba-platform/react";

import "../../../app/App.css";

import { Concourse } from "../../../cuba/entities/base/tsadv_Concourse";
import {RootStoreProp} from "../../store";
import {ReadonlyField} from "../../components/ReadonlyField";
import {MarkCriteria} from "../../../cuba/entities/base/tsadv_MarkCriteria";
import TextArea from "antd/es/input/TextArea";
import {GradeDetail} from "../../../cuba/entities/base/tsadv_GradeDetail";
import {DataInstanceStore} from "@cuba-platform/react/dist/data/Instance";
import {PersonGroupExt} from "../../../cuba/entities/base/base$PersonGroupExt";

const { Footer, Content, Sider } = Layout;
const {Option} = Select;
const { TabPane } = Tabs;

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  markCriteria: MarkCriteria[] | null | undefined,
  submitForm?: any,
  dataInstance: DataInstanceStore<Concourse>,
  personGroupId?: any
};

type ActiveTabProps = RouteComponentProps<{ activeTab?: string }>;
interface IState {
  data: number;
}


@injectMainStore
@inject("rootStore")
@observer
class GradeFormComponent extends React.Component<
  Props & WrappedComponentProps & ActiveTabProps &
  MainStoreInjected  &
  RootStoreProp &
  RouteComponentProps<any>, IState
  > {

  dataInstance = this.props.dataInstance

  gradeInstance = instance<GradeDetail>(GradeDetail.NAME,{
    view: "gradeDetail-view",
    loadImmediately: false
  })

  personGroupDsc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
    view:"personGroup-view",
    filter: {
      conditions: [
        {
          value: this.props.personGroupId,
          operator: "=",
          property: "id"
        }
      ]
    }
  })

  @observable
  updated = false;
  reactionDisposer: IReactionDisposer;

  createElement = React.createElement;

  @observable
  globalErrors: string[] = [];

  pageName: string = "concourseManagement"

  @observable
  submit: Function = this.props.submitForm

  @observable
  optionValue:object = {}

  @observable
  checkboxValue:object = {}

  @observable
  personGroupId:any = this.props.personGroupId

  @observable
  comment:string = ""

  handleChangeOption= (name:string, value:string) =>{
    this.optionValue = {
      [name]:value,
      ...this.optionValue
    }
    console.log("filteredValue", this.optionValue)
  }

  handleChangeCheckbox= (name:string, value:any) =>{
    console.log(value)
    this.checkboxValue[name] = value ? value : false
    console.log("filteredValue", this.checkboxValue)
  }

  handleChangeComment=(e:any)=>{
    this.comment = e.target.value
  }

  submitForm( values1:object, values2:object ){
    let sum = 0
    if (values1){
      for (const property in values1){
        sum += +values1[property]
      }
    }
    if (values2){
      for (const property in values2){
        if (values2[property]) sum++;
      }
    }

    this.gradeInstance.setItem(new GradeDetail())
    let gr = new GradeDetail();
    if (this.personGroupId){
      this.gradeInstance.item!.grade = sum
      this.gradeInstance.item!.personGroup = this.personGroupDsc.items[0]
      this.gradeInstance.item!.comment = this.comment

      // this.dataInstance.item!.grade!.push(gr)
      let newGrades = this.dataInstance.item!.grade
      let check = false
      if (newGrades){
        newGrades.forEach(obj => {
          if (obj.personGroup === this.personGroupId){
            obj.grade = sum
            obj.comment = this.comment
            check = true
          }
        })
      }
      if (check){
        this.dataInstance.update({grade: newGrades})
        this.dataInstance.commit().then((data:any)=>{
          console.log("saved on the db")
        }).catch((error:any)=>{
          console.log(error)
        })
      }
      else{
        gr.grade = this.gradeInstance.item!.grade
        gr.comment = this.gradeInstance.item!.comment
        gr.personGroup = this.gradeInstance.item!.personGroup
        gr.concourse = this.gradeInstance.item!.concourse
        gr.updateTs = this.gradeInstance.item!.updateTs
        gr.createTs = this.gradeInstance.item!.createTs
        gr.updatedBy = this.gradeInstance.item!.updatedBy
        gr.deleteTs = this.gradeInstance.item!.deleteTs
        gr.deletedBy = this.gradeInstance.item!.deletedBy
        newGrades!.push(gr)
        this.dataInstance.update({grade: newGrades})
        this.dataInstance.commit().then((data:any)=>{
          console.log("saved on the db")
        }).catch((error:any)=>{
          console.log(error)
        })
      }

      // this.dataInstance.commit().then(data=>{
      //   console.log("saved on the db")
      // }).catch(error=>{
      //   console.log(error)
      // })
    }

  }

  handleSubmit = (e: FormEvent) => {
    this.submitForm(this.optionValue, this.checkboxValue)
    e.preventDefault();
  }

  render() {

    if (this.updated) {
      return <Redirect to={ConcourseManagement.PATH} />;
    }

    const activeTab = "1";
    const defaultActiveKey = activeTab ? activeTab : "1";

    if (this.props.markCriteria){
      console.log(this.props.markCriteria)
    }

    return (
      <Form style={{width: "100%"}} onSubmit={this.handleSubmit}>
        <Card size="small" className="generalInfo" style={{padding:"5px 20px 20px"}}>
        {
          this.props.markCriteria && this.props.markCriteria.map((el:MarkCriteria) => ([
            el.indicator && el.indicator_relation &&
            <Form.Item style={{ marginTop:"24px"}} required={true} label={this.createElement(Msg, {
              entityName: "tsadv_markCriteria",
              propertyName: el.name_en
            })}>
              {
              el.indicator_relation.map(chk => (
                  <Form.Item key={chk.id} style={{display: "flex", width:"50%", alignItems: "center", margin:"0", marginLeft:"16px", justifyContent:"flex-start"}}
                             label={this.createElement(Msg, {
                               entityName: "tsadv_markCriteria",
                               propertyName: chk.name_en
                             })}>
                    <Checkbox onChange={ value=>this.handleChangeCheckbox(chk.name_en!, value.target.checked) }/>
                  </Form.Item>
              ))
              }
            </Form.Item>,
            [
              !el.indicator && el.ratingScale &&
                <Form.Item style={{marginTop:"24px"}} required={true} label={this.createElement(Msg, {
                  entityName: "tsadv_markCriteria",
                  propertyName: el.ratingScale!.name_ru
                })}>
                  <Select onChange={ value => this.handleChangeOption(el.ratingScale!.name_ru!, value as string)} allowClear={true} placeholder={"Select..."} style={{width:"50%"}} >{
                    el.ratingScale.level_relation!.map((lvl)=>(
                       lvl && <Option key={lvl.id} value={lvl.number!} >{lvl.name_en!}</Option>
                    ))
                  }
                  </Select>
                </Form.Item>

            ]
          ]))
        }
          <Form.Item
            style={{ width: "50%" }}
            label={this.createElement(Msg, {
              entityName: "tsadv_markCriteria",
              propertyName: "Comments"
            })}
            required={true}
          >
            {this.props.form.getFieldDecorator(
              "Comments"
            )(<TextArea value={this.comment} onChange={this.handleChangeComment} rows={6} />)}
          </Form.Item>
          <Form.Item style={{ textAlign: "left", marginTop:"36px" }}>
            <Button
              type="primary"
              htmlType="submit"

              style={{ marginRight: "8px" }}
            >
              <FormattedMessage id="management.editor.submit" />
            </Button>

            <Button
              htmlType="button"
            >
              <FormattedMessage id="management.editor.cancel" />
            </Button>


          </Form.Item>
        </Card>

      </Form>
    );
  }

  componentDidMount() {
  }

  componentWillUnmount() {
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
  })(GradeFormComponent)
);
