import {getCubaREST, injectMainStore, MainStoreInjected, Msg} from "@cuba-platform/react";
import React, {createElement} from "react";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {observer} from "mobx-react";
import {Card, Form, Tabs} from "antd";
import TextArea from "antd/es/input/TextArea";
import {CourseSectionScormResult} from "../../../../cuba/entities/base/tsadv_CourseSectionScormResult";
import {observable} from "mobx";

const {TabPane} = Tabs;

export type LearningHistoryScormResultProps = {
  enrollmentId: string,
}

@injectMainStore
@observer
class LearningHistoryScormResult extends React.Component<LearningHistoryScormResultProps & MainStoreInjected & WrappedComponentProps> {

  @observable
  scormResult: CourseSectionScormResult[] = [];

  @observable messages = this.props.mainStore!.messages!;

  render() {
    return (
      <div>
        <Card className="narrow-layout card-actions-container">
          <Tabs tabPosition='top'>
            {
              this.scormResult.map((scormResult, index) => {
                return <TabPane
                  tab={this.messages[CourseSectionScormResult.NAME + '.' + 'question'] + " " + (1 + index)}
                  key={"" + index}>
                  <div>
                    <Card className="narrow-layout">
                      <Form layout="vertical">

                        <div className={"ant-row ant-form-item"} style={{marginBottom: "12px"}}>
                          {createElement(Msg, {entityName: CourseSectionScormResult.NAME, propertyName: "question"})}
                          <TextArea
                            value={scormResult.question ? scormResult.question.question || '' : ''}
                            disabled={true}
                            rows={4}/>
                        </div>

                        <div className={"ant-row ant-form-item"} style={{marginBottom: "12px"}}>
                          {createElement(Msg, {entityName: CourseSectionScormResult.NAME, propertyName: "answer"})}
                          <TextArea
                            disabled={true}
                            value={scormResult!.answer!}
                            rows={4}/>
                        </div>

                        <div className={"ant-row ant-form-item"} style={{marginBottom: "12px"}}>
                          {createElement(Msg, {entityName: CourseSectionScormResult.NAME, propertyName: "comment"})}
                          <TextArea
                            disabled={true}
                            value={scormResult!.comment!}
                            rows={4}/>
                        </div>
                      </Form>
                    </Card>
                  </div>
                </TabPane>
              })
            }
          </Tabs>
        </Card>
      </div>
    );
  }

  componentDidMount() {
    getCubaREST()!.searchEntities<CourseSectionScormResult>(CourseSectionScormResult.NAME, {
      conditions: [{
        property: 'courseSectionAttempt.enrollment.id',
        operator: '=',
        value: this.props.enrollmentId
      }]
    }, {
      view: 'courseSectionScormResult-view'
    }).then(scormResult => {
      this.scormResult = scormResult;
    });
  }
}

export default injectIntl(LearningHistoryScormResult);