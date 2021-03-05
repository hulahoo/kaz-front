import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Card, Icon} from "antd";
import Button, {ButtonType} from "../../../components/Button/Button";
import {FormattedMessage} from "react-intl";

type AbstractRenderModalBodyProps = {
  changeModalScreenSize: () => void
}

@observer
class AbstractRenderModalBody<T> extends Component<T & AbstractRenderModalBodyProps> {

  render() {
    return (<Card className={"modal-body card-actions-container"}
                  actions={this.cardActionButtons()}>
        {this.props.changeModalScreenSize
          ? <div className="fullscreen-icon">
            <Icon type="fullscreen" onClick={this.props.changeModalScreenSize}/>
          </div>
          : <></>}
        {this.getModalBody()}
      </Card>
    );
  }

  getModalBody = (): React.ReactNode => {
    return null;
  };

  onFinishSection = (): void => {

  };

  cardActionButtons = (): React.ReactNode[] => {
    return [<Button buttonType={ButtonType.PRIMARY}
                    onClick={this.onFinishSection}><FormattedMessage id="course.section.finish"/></Button>];
  }
}

export default AbstractRenderModalBody;