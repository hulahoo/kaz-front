import React, {Component} from 'react';
import {Col, Form, Row} from "antd";
import {injectIntl, WrappedComponentProps} from "react-intl";

type MaterialDescriptionProps = {
  descriptionHtml?: string | null
}

class MaterialDescription extends Component<WrappedComponentProps & MaterialDescriptionProps> {

  render() {
    return (
      <>
        <Row>
          <Col>
            <Form.Item label={this.props.intl.formatMessage({id: "course.description"})} className={"form-item"}
                       key='description'>
              {this.props.descriptionHtml ?
                <div dangerouslySetInnerHTML={{__html: this.props.descriptionHtml}}/> : <></>}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          {this.props.children}
        </Row>
      </>
    );
  }
}

export default injectIntl(MaterialDescription);