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
  MultilineText, injectMainStore, MainStoreInjected, Msg
} from "@cuba-platform/react";

import "../../../app/App.css";

import { Concourse } from "../../../cuba/entities/base/tsadv_Concourse";
import {RootStoreProp} from "../../store";
import {ReadonlyField} from "../../components/ReadonlyField";
import {MarkCriteria} from "../../../cuba/entities/base/tsadv_MarkCriteria";
import TextArea from "antd/es/input/TextArea";

const { Footer, Content, Sider } = Layout;
const {Option} = Select;
const { TabPane } = Tabs;

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  markCriteria: MarkCriteria[] | null | undefined
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


  @observable
  updated = false;
  reactionDisposer: IReactionDisposer;

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

    if (this.props.markCriteria){
      console.log(this.props.markCriteria)
    }

    return (
      <Form style={{width: "100%"}}>
        {
          this.props.markCriteria && this.props.markCriteria.map((el:MarkCriteria)=> (
            el.indicator && el.indicator_relation && [ <h3>{el.name_en}:</h3>,
              (el.indicator_relation.map(chk => (
              <Form.Item key={chk.id} style={{display: "flex", alignItems: "center", justifyItems: "space-between",  margin:"0", marginLeft:"16px"}}
                         label={this.createElement(Msg, {
                           entityName: "tsadv_markCriteria",
                           propertyName: chk.name_en
                         })}>
                <Checkbox value={chk.value}/>
              </Form.Item>)

            ))]
          ))
        }
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
