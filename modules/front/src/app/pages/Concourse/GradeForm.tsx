import * as React from "react";
import { FormEvent, FunctionComponent } from "react";
import {
  Button,
  Card,
  Form,
  message,
  Select,
  Checkbox,
  Spin
} from "antd";

import { inject, observer } from "mobx-react";

import { FormComponentProps } from "antd/lib/form";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { IReactionDisposer, observable } from "mobx";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";

import {
  instance,
  withLocalizedForm,
  extractServerValidationErrors,
  constructFieldsWithErrors,
  clearFieldErrors,
  collection,
  injectMainStore,
  MainStoreInjected,
  Msg,
  Instance
} from "@cuba-platform/react";

import "../../../app/App.css";

import { Concourse } from "../../../cuba/entities/base/tsadv_Concourse";
import { RootStoreProp } from "../../store";

import { MarkCriteria } from "../../../cuba/entities/base/tsadv_MarkCriteria";
import TextArea from "antd/es/input/TextArea";
import { GradeDetail } from "../../../cuba/entities/base/tsadv_GradeDetail";
import { DataInstanceStore } from "@cuba-platform/react/dist/data/Instance";


import moment from "moment";
import { ConcourseRequest } from "../../../cuba/entities/base/tsadv_ConcourseRequest";

import {Levels} from "../../../cuba/entities/base/tsadv_Levels";

const { Option } = Select;

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  markCriteria: MarkCriteria[] | null | undefined;
  setTotalGrade: Function;
  dataInstance: DataInstanceStore<ConcourseRequest>;
  personGroupId?: any;
  updated: boolean;
};

type ActiveTabProps = RouteComponentProps<{ activeTab?: string }>;

interface IState {
  data: number;
}

@injectMainStore
@inject("rootStore")
@observer
class GradeFormComponent extends React.Component<
  Props &
    WrappedComponentProps &
    ActiveTabProps &
    MainStoreInjected &
    RootStoreProp &
    RouteComponentProps<any>,
  IState
> {
  dataInstance = this.props.dataInstance;

  gradeInstance = instance<GradeDetail>(GradeDetail.NAME, {
    view: "gradeDetail-view",
    loadImmediately: false
  });


  concoursesDsc = collection<Concourse>(Concourse.NAME, {
    view: "concourse-view",
    filter: {
      conditions: [
        {
          value: this.dataInstance.item!.concourse!.id,
          operator: "=",
          property: "id"
        }
      ]
    }
  });

  gradeDataCollection = collection<GradeDetail>(GradeDetail.NAME, {
    view: "gradeDetail-view",
    filter: {
      conditions: [
        {
          value: this.props.personGroupId,
          operator: "=",
          property: "personGroup.id"
        },
        {
          value: this.dataInstance.item!.id,
          operator: "=",
          property: "concourseRequest.id"
        }
      ]
    }
  });


  @observable
  updated = this.props.updated;
  reactionDisposer: IReactionDisposer;

  @observable
  goBack = false;

  createElement = React.createElement;

  @observable
  globalErrors: string[] = [];

  pageName: string = "concourseManagement";

  @observable
  optionValue: object = {};

  @observable
  checkboxValue: object = {};

  @observable
  personGroupId: any = this.props.personGroupId;

  @observable
  comment: string = "";
  isDisabled: boolean = false;

  @observable
  mainStore = this.props.mainStore!

  handleChangeOption = (name: string, val: any) => {
    let [item, value] = val.split("$");
    console.log(val)
    this.optionValue[name] = {
      [item]: value
    };
    console.log("SCALE CHANGE: ",this.optionValue[name])
  };

  handleChangeCheckbox = (item: string, name: string, value: any) => {
    this.checkboxValue[item] = {
      ...this.checkboxValue[item],
      [name]: value ? value : false
    };
    console.log("CHECKBOX CHANGE:",this.checkboxValue[item])
  };

  handleChangeComment = (e: any) => {
    this.comment = e.target.value;
  };

  totalGradeHandler = (localSum: number) => {
    let sum = 0;
    sum += localSum;
    this.props.setTotalGrade(sum);
  };

  @observable
  innerHtml: string = "";

  submitForm(values1: object, values2: object) {
    let promise: Promise<any> = new Promise<boolean>(resolve => resolve(false));
    let sum = 0;
    if (values1) {
      for (const property in values1) {
        if (values1.hasOwnProperty(property)) {
          for (const val in values1[property]) {
            if (values1[property].hasOwnProperty(val))
              sum += +values1[property][val];
          }
        }
      }
      console.log("Scale", sum)
    }
    if (values2) {
      for (const property in values2) {
        if (values2.hasOwnProperty(property)) {
          for (const val in values2[property]) {
            if (values2[property].hasOwnProperty(val))
              if (values2[property][val]) sum++;
          }
        }
      }
      console.log("Check", sum)
    }

    let grade = this.gradeDataCollection.items;
    const indicators = (checkboxValue: any, optionValue: any) => {
      let html = `
          <form class="ant-form ant-form-horizontal" style="width: 100%;">
                    <div class="ant-card generalInfo ant-card-bordered ant-card-small" style="padding: 5px 20px 20px;">
                        <div class="ant-card-body">
      `;
      if (checkboxValue)
        for (let key in checkboxValue) {
          if (checkboxValue.hasOwnProperty(key)) {
            html += `
              <div class="ant-row ant-form-item" style="margin-top: 24px;">
                  <div class="ant-col ant-form-item-label">
                      <label class="ant-form-item-required" title="">${key}</label>
                  </div>
              `;
            for (let values in checkboxValue[key])
              if (checkboxValue[key].hasOwnProperty(values))
                html += `
                  <span class="ant-form-item-children">
                      <div class="ant-row ant-form-item default-form-item" style="display: flex; align-items: center; margin: 0px 0px 0px 0px; width: 80%;">
                          <div class="ant-col ant-form-item-label">
                              <label class="" title="">${values}</label>
                          </div>
                          <div class="ant-col ant-form-item-control-wrapper">
                              <div class="ant-form-item-control">
                                  <span class="ant-form-item-children">
                                      <label class="ant-checkbox-wrapper">
                                          <span  class="ant-checkbox ${
                                            checkboxValue[key][values]
                                              ? "ant-checkbox-checked"
                                              : ""
                                          }">
                                              <input disabled type="checkbox" class="ant-checkbox-input" value="">
                                              <span class="ant-checkbox-inner"></span>
                                          </span>
                                      </label>
                                  </span>
                              </div>
                          </div>
                      </div>
                  </span>`;
          }
          html += `</div>`;
        }

      if (optionValue) {
        for (let key in optionValue) {
          if (optionValue.hasOwnProperty(key)) {
            html += `
              <div class="ant-row ant-form-item" style="margin-top: 24px;">
                  <div class="ant-col ant-form-item-label">
                      <label class="ant-form-item-required" title="">${key}</label>
                  </div>
              `;
            for (let values in optionValue[key]) {
              if (optionValue[key].hasOwnProperty(values))
                html += `
                          <div class="ant-col ant-form-item-control-wrapper">
                              <div class="ant-form-item-control">
                                  <span class="ant-form-item-children">
                                      <div class="ant-select ant-select-enabled ant-select-allow-clear" style="width: 80%;">
                                          <div class="ant-select-selection ant-select-selection--single" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-controls="80c4bf7f-823b-44a5-93fe-83b3d92a612b" aria-expanded="false" tabindex="0">
                                            <div class="ant-select-selection__rendered">
                                                <div disabled class="ant-select-selection-selected-value" title="${values}" style="display: block; opacity: 1;">
                                                  ${values}
                                                </div>
                                            </div>
                                          </div>
                                      </div>
                                  </span>
                              </div>
                          </div>`;
            }
          }
          html += `</div>`;
        }
      }

      html += `
      <div class="ant-row ant-form-item" style="width: 80%;">
          <div class="ant-col ant-form-item-label">
              <label for="Comments" class="ant-form-item-required" title="">
                  ${
                    this.props.mainStore!.locale === "ru"
                      ? "Комментарии"
                      : "Comment"
                  }
              </label>
          </div>
          <div class="ant-col ant-form-item-control-wrapper">
              <div class="ant-form-item-control">
                  <span class="ant-form-item-children">
                      <textarea disabled rows="6" id="Comments" data-__meta="[object Object]" data-__field="[object Object]" class="ant-input">${
                        this.comment
                      }</textarea>
                  </span>
              </div>
          </div>
      </div>
      
      `;

      html += `</div> </div> </form> `;

      return html;
    };

    if (grade.length) {

      this.gradeInstance
        .update({
          id: grade[0].id,
          personGroup: this.props.personGroupId,
          concourseRequest: this.dataInstance.item!.id,
          comment: this.comment,
          grade: sum,
          indicatorsList: indicators(this.checkboxValue, this.optionValue)
        })
        .then(data => {
          message.success(
            this.props.intl.formatMessage({ id: "management.editor.success" })
          );

          // this.totalGradeHandler(sum)
          // this.updated = true
        })
        .catch((e: any) => {
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
    } else {
      this.innerHtml = indicators(this.checkboxValue, this.optionValue);

      this.gradeInstance
        .update({
          personGroup: this.props.personGroupId,
          concourseRequest: this.dataInstance.item!.id,
          comment: this.comment,
          grade: sum,
          indicatorsList: indicators(this.checkboxValue, this.optionValue)
        })
        .then(data => {
          message.success(
            this.props.intl.formatMessage({ id: "management.editor.success" })
          );
          this.totalGradeHandler(sum);
          // this.updated = true
        })
        .catch((e: any) => {
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
    e.preventDefault();
    this.dataInstance.status = "LOADING";
    this.submitForm(this.optionValue, this.checkboxValue);

  };

  checkDates = () => {
    if (this.concoursesDsc.items[0]) {
      let dateNow = moment(Date.now());
      let requestDate = moment(this.concoursesDsc.items[0]!.endVoting);

      if (dateNow.isAfter(requestDate)) {
        this.isDisabled = true;
      }
    }
  };

  checkGradeExists = () => {
    let grade = this.gradeDataCollection.items;
    if (grade.length) {
      this.isDisabled = true;
    }
  };

  render() {
    if (this.updated) {
      return <Redirect exact={true} to={"/concourse/4"} />;
    }

    if (this.goBack) {
      return <Redirect exact={true} to={"/concourse/4"} />;
    }

    const activeTab = "1";
    const defaultActiveKey = activeTab ? activeTab : "1";
    const messages = this.mainStore.messages!;

    const isRu = this.props.mainStore!.locale === "ru";

    const { status } = this.dataInstance;

    this.checkDates();
    this.checkGradeExists();

    return this.isDisabled && this.gradeDataCollection.items[0] ? (
      [
        <span
          dangerouslySetInnerHTML={{
            __html: this.gradeDataCollection.items![0].indicatorsList!
          }}
        />,
        <Button
          htmlType="button"
          onClick={() => (this.goBack = true)}
          style={{ marginTop: 24, textTransform: "capitalize" }}
        >
          <FormattedMessage id="back" />
        </Button>
      ]
    ) : (
      <Form style={{ width: "100%" }} onSubmit={this.handleSubmit}>
        <Spin spinning={status == "LOADING"}>
          <Card
            size="small"
            className="generalInfo"
            style={{ padding: "5px 20px 20px" }}
          >
            {this.props.markCriteria &&
              this.props.markCriteria.map((el: MarkCriteria) => [
                el.indicator && el.indicator_relation && (
                  <Form.Item
                    key={isRu ? el.name_ru : el.name_en}
                    style={{ marginTop: "24px", width: "80%" }}
                    required={true}
                    label={this.createElement(Msg, {
                      entityName: "tsadv_markCriteria",
                      propertyName: isRu ? el.name_ru : el.name_en
                    })}

                  >
                    {el.indicator_relation!.map(chk => ( chk &&
                      <Form.Item
                        key={chk.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          margin: "0",
                          marginLeft: "8px"
                        }}
                        className={"default-form-item"}
                        label={this.createElement(Msg, {
                          entityName: "tsadv_markCriteria",
                          propertyName: isRu ? chk.name_ru : chk.name_en
                        })}
                      >
                        <Checkbox
                          disabled={this.isDisabled}
                          onChange={value => {
                            if (value) {
                              this.handleChangeCheckbox(
                                isRu ? el.name_ru! : el.name_en!,
                                isRu ? chk.name_ru! : chk.name_en!,
                                value.target.checked
                              )
                            }
                          }
                          }
                        />
                      </Form.Item>
                    ))}
                  </Form.Item>
                ),

                !el.indicator && el.ratingScale && (
                  <Form.Item
                    key={isRu ? el.name_ru : el.name_en}
                    style={{ marginTop: "24px" }}
                    required={true}
                    label={this.createElement(Msg, {
                      entityName: "tsadv_markCriteria",
                      propertyName: isRu ? el.name_ru : el.name_en
                    })}
                  >{this.props.form.getFieldDecorator("ratingScale", {
                    rules: [
                      {
                        required: true,
                        message: this.props.intl.formatMessage(
                          { id: "form.validation.required" },
                          {
                            fieldName:
                              messages["tsadv_markCriteria" + ".ratingScale"]
                          }
                        )
                      }
                    ],
                  })
                  (<Select
                      disabled={this.isDisabled}
                      // value={this.optionValue[isRu ? el.ratingScale!.name_ru! : el.ratingScale!.name_en!]}
                      onChange={value =>{
                        if (value){
                          this.handleChangeOption(
                            isRu ? el.name_ru! : el.name_en!,
                            value
                          )
                        }
                      }}
                      allowClear={true}
                      placeholder={"....."}
                      style={{ width: "80%" }}
                    >
                      {el.ratingScale!.level_relation!.map(
                        (lvl:Levels, idx) =>{
                          return lvl && (
                            <Option
                              key={
                                lvl.id ? lvl.id : idx + "option-" + el.name_en!
                              }
                              value={`${
                                isRu
                                  ? lvl.name_ru! + "$" + lvl.number!
                                  : lvl.name_en! + "$" + lvl.number!
                              }`}
                            >
                              {isRu ? lvl.name_ru : lvl.name_en!}
                            </Option>
                          )
                        }
                      )}
                    </Select>
                  )}
                  </Form.Item>
                )
              ])}
            <Form.Item
              style={{ width: "80%" }}
              label={this.createElement(Msg, {
                entityName: "tsadv_markCriteria",
                propertyName: isRu ? "Комментарии" : "Comments"
              })}
              required={true}
            >
              {this.props.form.getFieldDecorator("comments", {
                rules: [
                  {
                    required: true,
                    message: this.props.intl.formatMessage(
                      { id: "form.validation.required" },
                      {
                        fieldName:
                          messages["tsadv_markCriteria" + ".comments"]
                      }
                    )
                  }
                ],
              })(
                <TextArea
                  disabled={this.isDisabled}
                  value={this.comment}
                  onChange={this.handleChangeComment}
                  required={true}
                  rows={6}
                />
              )}
            </Form.Item>
            <Form.Item style={{ textAlign: "left", marginTop: "36px" }}>
              <Button
                type="primary"
                htmlType="submit"
                disabled={this.isDisabled}
                style={{ marginRight: "8px" }}
              >
                <FormattedMessage id="management.editor.submit" />
              </Button>

              <Button
                htmlType="button"
                onClick={() => (this.goBack = true)}
                style={{ textTransform: "capitalize" }}
              >
                <FormattedMessage id="management.editor.cancel" />
              </Button>
            </Form.Item>
            {/*{*/}
            {/*  this.innerHtml.length &&  <span dangerouslySetInnerHTML={{__html:this.innerHtml}}>*/}
            {/*  </span>*/}
            {/*}*/}
          </Card>
        </Spin>
      </Form>
    );
  }

  componentDidMount() {
    this.gradeInstance.setItem(new GradeDetail());
  }

  componentWillUnmount() {}
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
      if (changedValues["comments"]!==null) props.form.validateFields(['comments'], {force: true});
    }
  })(GradeFormComponent)
);
