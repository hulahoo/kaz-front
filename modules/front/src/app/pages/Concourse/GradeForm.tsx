import * as React from "react";
import {FormEvent, FunctionComponent} from "react";
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
import {ConcourseRequestManagement} from "../ConcourseRequest/ConcourseRequestManagement";
import moment from "moment";
import {ConcourseRequest} from "../../../cuba/entities/base/tsadv_ConcourseRequest";

const { Footer, Content, Sider } = Layout;
const {Option} = Select;
const { TabPane } = Tabs;

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  markCriteria: MarkCriteria[] | null | undefined,
  setTotalGrade: Function,
  dataInstance: DataInstanceStore<ConcourseRequest>,
  personGroupId?: any,
  updated:boolean
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

  concoursesDsc = collection<ConcourseRequest>(ConcourseRequest.NAME, {
    view: "concourseRequest-edit",
    filter:{
      conditions:[
        {
          value: this.dataInstance.item!.id,
          operator: "=",
          property: "id"
        }
      ]
    }
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

  gradeDataCollection = collection<GradeDetail>(GradeDetail.NAME, {
    view: "gradeDetail-view",
    filter: {
      conditions: [
        {
          value: this.props.personGroupId,
          operator: "=",
          property: "personGroup.id"
        }
      ]
    }
  })

  totalGradeDataCollection = collection<GradeDetail>(GradeDetail.NAME, {
    view: "gradeDetail-view",
    filter: {
      conditions: [
        {
          value: this.dataInstance.item!.id,
          operator: "=",
          property: "concourse.id"
        }
      ]
    }
  })

  @observable
  updated = this.props.updated;
  reactionDisposer: IReactionDisposer;

  @observable
  goBack = false;

  createElement = React.createElement;

  @observable
  globalErrors: string[] = [];

  pageName: string = "concourseManagement"


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

  totalGradeHandler=(localSum:number)=>{
    let sum = 0;
    sum+=localSum;
    this.totalGradeDataCollection.items.map(el=>{
      if (el.grade){
        sum+=el.grade;
      }
    })
    this.props.setTotalGrade(sum)
    // this.dataInstance.item!.gradeTotal = sum;
    // this.dataInstance.commit().then((data)=>{
    //   this.updated=true
    // }).catch(err=>{console.log(err)})
    // this.dataInstance.update({
    //   gradeTotal: sum
    // })

  }

  submitForm( values1:object, values2:object ){
    let promise: Promise<any> = new Promise<boolean>(resolve => resolve(false));
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
    console.log(this.gradeInstance)

    let grade = this.gradeDataCollection.items.filter((elem)=>elem.concourseRequest!.id === this.concoursesDsc.items[0]!.id)
    console.log(grade)
    if (grade.length){
      this.gradeInstance.update({
        id: grade[0].id,
        personGroup: this.personGroupDsc.items[0],
        concourseRequest: this.concoursesDsc.items[0],
        comment: this.comment,
        grade: sum
      }).then(data=>{
        message.success(
          this.props.intl.formatMessage({ id: "management.editor.success" })
        );
        this.totalGradeHandler(sum)
        // this.updated = true

      }).catch((e: any) => {
        if (e.response && typeof e.response.json === "function") {
          e.response.json().then((response: any) => {
            clearFieldErrors(this.props.form);
            const {
              globalErrors,
              fieldErrors
            } = extractServerValidationErrors(response);
            this.globalErrors = globalErrors;
            if (fieldErrors.size > 0) {
              this.props.form.setFields(
                constructFieldsWithErrors(fieldErrors, this.props.form)
              );
            }

            if (fieldErrors.size > 0 || globalErrors.length > 0) {
              message.error(
                this.props.intl.formatMessage({
                  id: "management.editor.validationError"
                })
              );
            } else {
              message.error(
                this.props.intl.formatMessage({
                  id: "management.editor.error"
                })
              );
            }
          });
        } else {
          message.error(
            this.props.intl.formatMessage({ id: "management.editor.error" })
          );
        }
      });
    }
    else{
      this.gradeInstance.update({
        personGroup: this.personGroupDsc.items[0],
        concourseRequest: this.concoursesDsc.items[0],
        comment: this.comment,
        grade: sum
      }).then(data=>{
        message.success(
          this.props.intl.formatMessage({ id: "management.editor.success" })
        );
        this.totalGradeHandler(sum)
        // this.updated = true
      }).catch((e: any) => {
        if (e.response && typeof e.response.json === "function") {
          e.response.json().then((response: any) => {
            clearFieldErrors(this.props.form);
            const {
              globalErrors,
              fieldErrors
            } = extractServerValidationErrors(response);
            this.globalErrors = globalErrors;
            if (fieldErrors.size > 0) {
              this.props.form.setFields(
                constructFieldsWithErrors(fieldErrors, this.props.form)
              );
            }

            if (fieldErrors.size > 0 || globalErrors.length > 0) {
              message.error(
                this.props.intl.formatMessage({
                  id: "management.editor.validationError"
                })
              );
            } else {
              message.error(
                this.props.intl.formatMessage({
                  id: "management.editor.error"
                })
              );
            }
          });
        } else {
          message.error(
            this.props.intl.formatMessage({ id: "management.editor.error" })
          );
        }
      });
    }


  }

  handleSubmit = (e: FormEvent) => {
    this.submitForm(this.optionValue, this.checkboxValue)
    e.preventDefault();
  }



  render() {

    let isDisabled = false

    if (this.concoursesDsc.items[0]){
      let dateNow = moment(Date.now()) ;
      let requestDate = moment(this.concoursesDsc.items[0]!.endDate)
      console.log(requestDate)
      if (dateNow.isAfter(requestDate)){
        isDisabled = true
        console.log(dateNow, requestDate)
      }

    }

    if (this.updated) {
      return <Redirect exact={true} to={"/concourse"} />;
    }

    if (this.goBack){
      return <Redirect exact={true} to={"/concourse"} />;
    }

    const activeTab = "1";
    const defaultActiveKey = activeTab ? activeTab : "1";



    return (
      <Form style={{width: "100%"}} onSubmit={this.handleSubmit}>
        <Card size="small" className="generalInfo" style={{padding:"5px 20px 20px"}}>
        {
          this.props.markCriteria && this.props.markCriteria.map((el:MarkCriteria) => ([
            el.indicator && el.indicator_relation &&
            <Form.Item style={{ marginTop:"24px", width:"80%"}} required={true} label={this.createElement(Msg, {
              entityName: "tsadv_markCriteria",
              propertyName: el.name_en
            })}>
              {
              el.indicator_relation.map(chk => (
                  <Form.Item key={chk.id} style={{display: "flex", alignItems: "center", margin:"0", marginLeft:"16px", justifyContent:"flex-start"}}
                             label={this.createElement(Msg, {
                               entityName: "tsadv_markCriteria",
                               propertyName: chk.name_en
                             })}>
                    <Checkbox disabled={isDisabled} onChange={ value=>this.handleChangeCheckbox(chk.name_en!, value.target.checked) }/>
                  </Form.Item>
              ))
              }
            </Form.Item>,
            [
              !el.indicator && el.ratingScale && <Form.Item style={{marginTop:"24px"}} required={true} label={this.createElement(Msg, {
                  entityName: "tsadv_markCriteria",
                  propertyName: this.props.mainStore!.locale=="ru" ? el.ratingScale!.name_ru : el.ratingScale!.name_en
                })}>
                  <Select disabled={isDisabled} onChange={ value => this.handleChangeOption(el.ratingScale!.name_ru!, value as string)} allowClear={true} placeholder={"....."} style={{width:"80%"}} >{
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
            style={{ width: "80%" }}
            label={this.createElement(Msg, {
              entityName: "tsadv_markCriteria",
              propertyName: "Comments"
            })}
            required={true}
          >
            {this.props.form.getFieldDecorator(
              "Comments"
            )(<TextArea disabled={isDisabled} value={this.comment} onChange={this.handleChangeComment} rows={6} />)}
          </Form.Item>
          <Form.Item style={{ textAlign: "left", marginTop:"36px" }}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={isDisabled}
              style={{ marginRight: "8px" }}
            >
              <FormattedMessage id="management.editor.submit" />
            </Button>

            <Button
              htmlType="button"
              onClick={()=>this.goBack=true}
            >
              <FormattedMessage id="management.editor.cancel" />
            </Button>


          </Form.Item>
        </Card>

      </Form>
    );
  }

  componentDidMount() {
    this.gradeInstance.setItem(new GradeDetail())
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
