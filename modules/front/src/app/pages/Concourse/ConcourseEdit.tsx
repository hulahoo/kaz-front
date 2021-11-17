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
import {ConcourseRequest} from "../../../cuba/entities/base/tsadv_ConcourseRequest";
import ConcourseRequestEdit from "../ConcourseRequest/ConcourseRequestEdit";
import {ConcourseRequestManagement} from "../ConcourseRequest/ConcourseRequestManagement";
import ConcourseRequestEditGrade from "../ConcourseRequest/ConcourseRequestEditGrade";

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
  dataInstance = instance<ConcourseRequest>(ConcourseRequest.NAME, {
    view: "concourseRequest-edit",
    loadImmediately: false
  });

  dataCollection = collection<MarkCriteria>(MarkCriteria.NAME, {
    view: "markCriteria-view",
  })

  @observable
  saved = false

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

  setTotalGrade=(sum:number)=>{
    this.dataInstance.item!.totalGrade = sum;
    this.dataInstance.commit().then((data)=>{
      this.saved = true
    }).catch(err=>{console.log(err)})
  }


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
              tab={this.props.intl.formatMessage({id: "concourseGeneralInfoTab"})}
              key="1"
            >
              <ConcourseRequestEditGrade entityId={this.props.entityId}/>
            </TabPane>
            <TabPane
              tab={this.props.intl.formatMessage({id: "concourseMarksTab"})}
              key="2"
            >
              <GradeFormComponent updated={this.saved} setTotalGrade={this.setTotalGrade}
                                  dataInstance={this.dataInstance && this.dataInstance}
                                  personGroupId={this.personGroupId && this.personGroupId}
                                  markCriteria={this.dataInstance.item! && this.dataInstance.item!.concourse!.markCriteria}/>
            </TabPane>

          </Tabs>
        </Section>
      </Page>
    );
  }

  componentDidMount() {
    if (this.props.entityId !== ConcourseRequestManagement.NEW_SUBPATH) {
      this.dataInstance.load(this.props.entityId);
    } else {
      this.dataInstance.setItem(new ConcourseRequest());
    }
    this.reactionDisposer = reaction(
      () => {
        return this.dataInstance.item;
      },
      () => {
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
