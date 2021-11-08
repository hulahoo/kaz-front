import * as React from "react";
import { FormEvent } from "react";
import { Alert, Button, Card, Form, message, Row, Tabs, Layout, Select } from "antd";
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
  MultilineText, injectMainStore, MainStoreInjected, Msg
} from "@cuba-platform/react";

import "../../../app/App.css";

import { Concourse } from "../../../cuba/entities/base/tsadv_Concourse";
import {RootStoreProp} from "../../store";
import {ReadonlyField} from "../../components/ReadonlyField";
import {MarkCriteria} from "../../../cuba/entities/base/tsadv_MarkCriteria";
import TextArea from "antd/es/input/TextArea";
import GradeFormComponent from "./GradeForm";
import {GradeDetail} from "../../../cuba/entities/base/tsadv_GradeDetail";
import {BaseUuidEntity} from "../../../cuba/entities/base/sys$BaseUuidEntity";

const { Footer, Content, Sider } = Layout;
const {Option} = Select;
const { TabPane } = Tabs;

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId: string;
};

type ActiveTabProps = RouteComponentProps<{ activeTab?: string }>;
interface IState {
  data: number;
}


@injectMainStore
@inject("rootStore")
@observer
class ConcourseEditComponent extends React.Component<
  Props & WrappedComponentProps & ActiveTabProps &
  MainStoreInjected  &
  RootStoreProp &
  RouteComponentProps<any>, IState
> {
  dataInstance = instance<Concourse>(Concourse.NAME, {
    view: "concourse-view",
    loadImmediately: false
  });

  dataCollection = collection<MarkCriteria>(MarkCriteria.NAME, {
    view: "markCriteria-view",
  })

  @observable
  updated = false;
  reactionDisposer: IReactionDisposer;

  fields = [
    "description",

    "name_ru",

    "concourseStatus",

    "category",

    "judgeInsturction",

    "name_en",

    "year",

    "startVoting",

    "endVoting",

    "legacyId",

    "banner",

    "requestTemplate"

  ];

  @observable
  personGroupId:any

  createElement = React.createElement;

  @observable
  globalErrors: string[] = [];

  pageName: string = "concourseManagement"


  render() {
    if (this.updated) {
      return <Redirect to={ConcourseManagement.PATH} />;
    }

    const activeTab = "1";
    const defaultActiveKey = activeTab ? activeTab : "1";

    const { status } = this.dataInstance;

    return (
      <Page>
        <Section size="large">
          <Tabs
            defaultActiveKey={defaultActiveKey}
            onChange={activeKey =>
              (this.pageName =
                "concourseManagement" + (activeKey === "1" ? "" : "Оценки"))
            }
          >
            <TabPane
              tab={this.props.intl.formatMessage({ id: "concourseGeneralInfoTab" })}
              key="1"
            >

              <Form layout="vertical">
                <Card size="small" className="generalInfo" style={{
                  paddingLeft: "20px"}
                }>
                  <Row
                    type={"flex"}
                    align="middle"
                    style={{
                      marginTop: "8px",
                    }}
                    justify={"start"}
                  >

                    <ReadonlyField
                      entityName={Concourse.NAME}
                      propertyName="name_ru"
                      form={this.props.form}
                      disabled={true}
                      formItemOpts={{ style: { marginBottom: "12px", minWidth: "30%" } }}
                      getFieldDecoratorOpts={{
                        rules: [{ required: true }]
                      }}
                    />

                    <ReadonlyField
                      entityName={Concourse.NAME}
                      propertyName="name_en"
                      form={this.props.form}
                      disabled
                      formItemOpts={{ style: { marginBottom: "12px", marginLeft:"20px", minWidth: "30%" } }}
                      getFieldDecoratorOpts={{
                        rules: [{ required: true }]
                      }}
                    />
                  </Row>
                  <Row
                    type={"flex"}
                    align="middle"
                    style={{
                      marginTop: "8px"
                    }}
                    justify={"start"}
                  >
                    <ReadonlyField
                      entityName={Concourse.NAME}
                      propertyName="concourseStatus"
                      form={this.props.form}
                      disabled={true}
                      formItemOpts={{ style: { marginBottom: "12px", minWidth: "30%" } }}
                      getFieldDecoratorOpts={{
                        rules: [{ required: true }]
                      }}
                    />

                    <ReadonlyField
                      entityName={Concourse.NAME}
                      propertyName="category"
                      form={this.props.form}
                      disabled={true}
                      formItemOpts={{ style: { marginBottom: "12px", marginLeft:"20px", minWidth: "30%" } }}
                      getFieldDecoratorOpts={{
                        rules: [{ required: true }]
                      }}
                    />
                  </Row>

                  <Row
                    type={"flex"}
                    align="middle"
                    style={{
                      marginTop: "8px"
                    }}
                    justify={"start"}
                  >

                    <ReadonlyField
                      entityName={Concourse.NAME}
                      propertyName="startVoting"
                      form={this.props.form}
                      disabled={true}
                      formItemOpts={{ style: { marginBottom: "12px",  minWidth: "30%" } }}
                      getFieldDecoratorOpts={{
                        rules: [{ required: true }]
                      }}
                    />
                    <ReadonlyField
                      entityName={Concourse.NAME}
                      propertyName="endVoting"
                      form={this.props.form}
                      disabled={true}
                      formItemOpts={{ style: { marginBottom: "12px", marginLeft:"20px", minWidth: "30%" } }}
                      getFieldDecoratorOpts={{
                        rules: [{ required: true }]
                      }}
                    />

                  </Row>

                  <Row
                    type={"flex"}
                    align="middle"
                    style={{
                      marginTop: "8px"
                    }}
                    justify={"start"}
                  >
                    <ReadonlyField
                      entityName={Concourse.NAME}
                      propertyName="judgeInsturction"
                      form={this.props.form}
                      disabled={true}
                      formItemOpts={{ style: { marginBottom: "12px", minWidth: "30%" } }}
                      getFieldDecoratorOpts={{
                        rules: [{ required: true }]
                      }}
                    />

                    <ReadonlyField
                      entityName={Concourse.NAME}
                      propertyName="year"
                      disabled={true}
                      form={this.props.form}
                      formItemOpts={{ style: { marginBottom: "12px", marginLeft:"20px", minWidth: "30%" } }}
                      getFieldDecoratorOpts={{
                        rules: [{ required: true }]
                      }}
                    />

                  </Row>

                  <Row
                    type={"flex"}
                    align="middle"
                    style={{
                      marginTop: "8px"
                    }}
                    justify={"start"}

                  >

                    <Form.Item
                      style={{ width: "49%" }}
                      label={this.createElement(Msg, {
                        entityName: Concourse.NAME,
                        propertyName: "description"
                      })}
                      required={true}
                    >
                      {this.props.form.getFieldDecorator(
                        "description"
                      )(<TextArea rows={6} disabled={true} />)}
                    </Form.Item>

                    <ReadonlyField
                      entityName={Concourse.NAME}
                      propertyName="banner"
                      disabled={true}
                      form={this.props.form}
                      formItemOpts={{ style: { marginBottom: "12px", minWidth: "30%" } }}
                      getFieldDecoratorOpts={{}}
                    />

                    <ReadonlyField
                      entityName={Concourse.NAME}
                      propertyName="requestTemplate"
                      disabled={true}
                      form={this.props.form}
                      formItemOpts={{ style: { marginBottom: "12px", minWidth: "30%" } }}
                      getFieldDecoratorOpts={{}}
                    />
                  </Row>
                  {this.globalErrors.length > 0 && (
                    <Alert
                      message={<MultilineText lines={toJS(this.globalErrors)} />}
                      type="error"
                      style={{ marginBottom: "24px" }}
                    />
                  )}
                </Card>

              </Form>


            </TabPane>
            <TabPane
              tab={this.props.intl.formatMessage({ id: "concourseMarksTab" })}
              key="2"
            >
              <GradeFormComponent dataInstance={this.dataInstance} personGroupId={this.personGroupId && this.personGroupId}  markCriteria={ this.dataInstance.item && this.dataInstance.item.markCriteria}/>

            </TabPane>

          </Tabs>
        </Section>
      </Page>
    );
  }

  componentDidMount() {
    if (this.props.entityId !== ConcourseManagement.NEW_SUBPATH) {
      this.dataInstance.load(this.props.entityId);
    } else {
      this.dataInstance.setItem(new Concourse());
    }
    this.reactionDisposer = reaction(
      () => {
        return this.dataInstance.item;
      },
      () => {
        console.log(this.props)
        this.personGroupId = this.props.rootStore!.userInfo!.personGroupId
        this.props.form.setFieldsValue(
          this.dataInstance.getFieldValues(this.fields)
        );
      }
    );
  }

  componentWillUnmount() {
    this.reactionDisposer();
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
  })(ConcourseEditComponent)
);
