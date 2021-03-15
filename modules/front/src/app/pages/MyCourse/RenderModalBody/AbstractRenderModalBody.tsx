import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Card, Icon, Modal} from "antd";
import Button, {ButtonType} from "../../../components/Button/Button";
import {FormattedMessage} from "react-intl";
import TextArea from "antd/es/input/TextArea";
import {observable, toJS} from "mobx";
import {CoursePersonNote} from "../../../../cuba/entities/base/tsadv_CoursePersonNote";
import {getCubaREST} from "@cuba-platform/react";
import {rootStore} from "../../../store";
import Notification from "../../../util/Notification/Notification";

type AbstractRenderModalBodyProps = {
  changeModalScreenSize: () => void,
  courseId: string
  loadingFinishCourse?: boolean
}

@observer
class AbstractRenderModalBody<T> extends Component<T & AbstractRenderModalBodyProps> {

  @observable noteVisible = false;

  note: CoursePersonNote = new CoursePersonNote();

  @observable noteValue: string = "";

  render() {
    return (<Card className={"modal-body card-actions-container"}
                  actions={this.cardActionButtons()}>
        {this.props.changeModalScreenSize
          ? <div className="fullscreen-icon">
            <Icon type="fullscreen" onClick={this.props.changeModalScreenSize}/>
          </div>
          : <></>}
        {this.getModalBody()}
        <Modal visible={this.noteVisible}
               onCancel={() => this.noteVisible = false}
               onOk={this.saveNote}>
          <TextArea rows={5}
                    value={this.noteValue}
                    onChange={event => {
                      this.noteValue = event.currentTarget.value;
                      console.log(this.noteValue);
                    }}/>
        </Modal>
      </Card>
    );
  }

  componentDidMount() {
    getCubaREST()!.searchEntities(CoursePersonNote.NAME, {
      conditions: [
        {
          property: "course.id",
          operator: "=",
          value: this.props.courseId
        },
        {
          property: "personGroup.id",
          operator: "=",
          value: rootStore.userInfo!.personGroupId!
        }]
    }).then(value => {
      if (value.length > 0) {
        this.note = value[0] as CoursePersonNote;
      }
      this.noteValue = this.note.note ? this.note.note : "";
    })
  }

  saveNote = (): Promise<any> => {
    this.note.course = {
      id: this.props.courseId
    };

    this.note.personGroup = {
      id: rootStore.userInfo!.personGroupId!
    };
    this.note.note = this.noteValue;

    return getCubaREST()!.commitEntity(CoursePersonNote.NAME, toJS(this.note))
      .then((value) => {
        this.noteVisible = false;
        this.note = value;
        console.log(value);
      })
      .catch(() => Notification.error({message: "Error"}));
  };

  getModalBody = (): React.ReactNode => {
    return null;
  };

  onFinishSection = (): void => {

  };

  cardActionButtons = (): React.ReactNode[] => {
    return [<Button buttonType={ButtonType.FOLLOW}
                    onClickCapture={() => this.noteVisible = true}><FormattedMessage id="notes"/></Button>,
      <Button buttonType={ButtonType.PRIMARY} loading={this.props.loadingFinishCourse}
              onClick={this.onFinishSection}><FormattedMessage id="course.section.finish"/></Button>];
  }
}

export default AbstractRenderModalBody;