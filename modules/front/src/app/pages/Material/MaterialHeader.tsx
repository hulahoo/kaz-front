import React, {Component} from 'react';
import {Col, Form, Rate, Row} from "antd";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import Button, {ButtonType} from "../../components/Button/Button";
import ImageLogo, {ImageLogoProps} from "../../components/ImageLogo";

type MaterialHeaderProps = {
  name: string;
  avgRate: number;
  reviewsCount: number;
  finished: number;
  hasEnrollment: boolean;
  subscribing?: boolean;
  showEnrollment?: boolean;
  imageProps?: ImageLogoProps;
  materialInfoType?: string;
}

type MaterialHeaderHandlers = {
  subscribe?: () => void;
}

class MaterialHeader extends Component<WrappedComponentProps & MaterialHeaderProps & MaterialHeaderHandlers> {
  render() {
    const {showEnrollment = true} = this.props;

    return (
      <Row>
        <Col span={16}>
          <div className="course-info-container">
            <div className={"course-name"}><span>{this.props.name}</span></div>
          </div>
          <div className={"course-info-rate form-item"} style={{marginTop: '32px'}}>
            <><Rate className={"rate-container"} value={this.props.avgRate} allowHalf disabled/>
              ({this.props.reviewsCount} {this.props.intl.formatMessage({id: "ratingCount"})})
            </>
          </div>
          <div className={"course-info-feedback"}>
            <Row>
              <Col style={{display: 'inline-block'}}>
                <Form.Item label={this.props.intl.formatMessage({id: this.props.materialInfoType + ".studentFinished"})}
                           className={"form-item"}
                           key='finished'>{
                  <span>{this.props.finished}</span>
                }
                </Form.Item>
              </Col>
              <Col style={{display: 'inline-block'}}>
                <Form.Item label={this.props.intl.formatMessage({id: "reviewCount"})}
                           className={"form-item"}
                           key='finished'>{
                  <span>{this.props.reviewsCount}</span>
                }
                </Form.Item>
              </Col>
            </Row>
          </div>
          {showEnrollment
            ? this.props.hasEnrollment
              ? <FormattedMessage id={this.props.intl.formatMessage({id: this.props.materialInfoType + ".enrolled"})}/>
              : <Button buttonType={ButtonType.PRIMARY} loading={this.props.subscribing}
                        onClick={this.props.subscribe}>{this.props.intl.formatMessage({id: this.props.materialInfoType + ".subscribe"})}</Button>
            : <></>}
        </Col>
        <Col span={8}>
          <div className="course-info-image">
            <ImageLogo {...this.props.imageProps} />
          </div>
        </Col>
      </Row>
    );
  }
}

export default injectIntl(MaterialHeader);