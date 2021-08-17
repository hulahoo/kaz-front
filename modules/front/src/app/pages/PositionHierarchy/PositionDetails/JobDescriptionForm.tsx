import * as React from "react";
import {Button, Card, Icon} from "antd";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {PositionDetailsProps} from "./PositionDetails";
import {observable} from "mobx";
import {JobDescription} from "../../../../cuba/entities/base/tsadv_JobDescription";
import {getCubaREST, injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import LoadingPage from "../../LoadingPage";
import {observer} from "mobx-react";
import {downloadFile} from "../../../util/util";
import {FileDescriptor} from "../../../../cuba/entities/base/sys$FileDescriptor";


@injectMainStore
@observer
class JobDescriptionForm extends React.Component<WrappedComponentProps & PositionDetailsProps & MainStoreInjected> {

  @observable
  jobDescription?: JobDescription
  @observable
  mainStore = this.props.mainStore!;

  messages = this.mainStore.messages!;

  componentDidMount(): void {
    if (this.props.selectedPosition && this.props.selectedPosition.length > 0) {
      getCubaREST()!.searchEntities<JobDescription>(JobDescription.NAME, {
        conditions: [{
          property: "positionGroup.id",
          operator: '=',
          value: this.props.selectedPosition ? this.props.selectedPosition : null
        }]
      }, {
        view: 'jobDescription-for-position-edit'
      }).then(values => {
        if (values && values[0]) {
          this.jobDescription = values[0]
          console.log(this.jobDescription)
        }
      });
    } else {
      console.log('123')
    }
  }

  render(): React.ReactNode {
    const messages = this.mainStore.messages!;
    if (!messages) return <LoadingPage/>
    let file: FileDescriptor | null | undefined;
    file = this.jobDescription ? this.jobDescription.file : null;
    let fileName: string | null | undefined;
    fileName = file ? file.name : null;
    console.log(this.props.selectedPosition)
    return <div style={{height: 'calc(100% - 58px)', overflow: "auto"}}>
      <Card title={this.props.intl.formatMessage({
        id: "formJD"
      })} style={{
        padding: "10px",
        width: "100%",
      }} type="inner">
        <div style={{padding: "10px"}}>
          <span style={{padding: "10px"}}>{fileName}</span>
          {file ? <Button
            onClick={() => downloadFile(file ? file.id : null, file ? file.name ? file.name : "" : "",
              file ? file.extension ? file.extension : "" : ""
              , "")}
            type="primary">
            <Icon type="download"/>
          </Button> : <div/>}
        </div>
        <Card title={messages[JobDescription.NAME + '.positionDuties']}
              style={{
                padding: "10px",
                width: "100%",
                height: "auto"
              }} type="inner">
          <p style={{padding: "10px"}}>
            {this.jobDescription ? this.jobDescription.positionDuties : null}</p>
        </Card>
        <Card title={messages[JobDescription.NAME + '.basicInteractionsAtWork']} style={{
          padding: "10px",
          width: "100%",
        }} type="inner">
          <p style={{padding: "10px"}}>
            {this.jobDescription ? this.jobDescription.basicInteractionsAtWork : null}</p>
        </Card>
        <Card title={messages[JobDescription.NAME + '.compulsoryQualificationRequirements']} style={{
          padding: "10px",
          width: "100%",
        }} type="inner">
          <p style={{padding: "10px"}}>
            {this.jobDescription ? this.jobDescription.compulsoryQualificationRequirements : null}</p>
        </Card>
        <Card title={messages[JobDescription.NAME + '.generalAdditionalRequirements']} style={{
          padding: "10px",
          width: "100%",
        }} type="inner">
          <p style={{padding: "10px"}}>
            {this.jobDescription ? this.jobDescription.generalAdditionalRequirements : null}</p>
        </Card>
      </Card>
      <Button/>
    </div>
  }
}

export default injectIntl(JobDescriptionForm);