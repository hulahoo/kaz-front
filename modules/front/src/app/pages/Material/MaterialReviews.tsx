import React, {Component, FormEvent} from 'react';
import {Card, Col, Form, List, message, Row, Spin} from "antd";
import moment from "moment";
import {injectIntl, WrappedComponentProps} from "react-intl";
import Button, {ButtonType} from "../../components/Button/Button";
import {FormComponentProps} from "antd/es/form";
import TextArea from "antd/es/input/TextArea";
import {withLocalizedForm} from "@cuba-platform/react";
import Notification from "../../util/Notification/Notification";
import Rate from "../../components/Rate/Rate";

export type Comment = {
  user?: string;
  date?: moment.Moment;
  comment?: string;
  rating?: number
}

export type RateRenderMeta = {
  rate: React.ReactNode,
  finished: number
}

type MaterialReviewsProps = {
  comments?: Comment[],
  rateList?: RateRenderMeta[];
  avgRate?: number
  sendingComment?: boolean
}

type MaterialReviewsHandlers = {
  sendComment?: (rate: number, text: string) => void
}

class MaterialReviews extends Component<WrappedComponentProps & MaterialReviewsProps & MaterialReviewsHandlers & FormComponentProps> {

  submitCommentForm = (e: FormEvent) => {
    e.preventDefault();
    if (this.props.sendComment) {
      this.props.form.validateFields((err, values) => {
        if (err) {
          Object.keys(err).forEach(key => {
            err[key].errors!.forEach((error: any) => {
              Notification.error({
                message: error.message
              })
            })
          });

          return;
        }

        this.props.sendComment!(this.props.form.getFieldValue("rate"), this.props.form.getFieldValue("text"));
        this.props.form.resetFields();
        this.props.form.setFieldsValue({
          rate: null
        });
      });

    }
  };

  render() {
    const {avgRate = 0, comments, rateList, sendingComment} = this.props;

    return (
      <>
        <Row type={"flex"}>
          <Col span={6} className={"centered-flex-container"}>
            <div className={"large-rate centered-flex-container"}>
              <span className={"large-text"}>{avgRate.toFixed(1)}</span>
              <Rate allowHalf disabled value={avgRate}/>
              <span className="default-font">{this.props.intl.formatMessage({id: "rating"})}</span>
            </div>
          </Col>
          <Col span={18}>
            <List className={"rates-list"}
                  itemLayout="horizontal"
                  dataSource={rateList}
                  renderItem={item => (
                    <List.Item
                      style={{}}>
                      <List.Item.Meta
                        title={item.rate}
                      />
                      <div>{item.finished} {this.props.intl.formatMessage({id: "course.students"})}</div>
                    </List.Item>
                  )}
            />
          </Col>
        </Row>
        {comments && comments.length > 0
          ? <Row>
            <List itemLayout="horizontal"
                  dataSource={comments}
                  renderItem={item => (
                    <List.Item
                      style={{backgroundColor: "#F3F3F3", margin: '5px 0', borderRadius: '4px', border: 'none'}}>
                      <List.Item.Meta
                        style={{margin: '0 5px'}}
                        title={<div className={"comment-header"}
                                    style={{display: 'flex', justifyContent: "space-between"}}>
                          <div className="comment-name default-font">
                            <span>{item.user}</span>
                            {item.rating ?
                              <Rate allowHalf disabled defaultValue={item.rating} style={{fontSize: '15px'}}/> : <></>}
                          </div>
                          <div className="comment-date">{moment(item.date).format('DD.MM.yyyy')}</div>
                        </div>}
                        description={<span className="default-font">{item.comment}</span>}
                      />
                    </List.Item>
                  )}
            />
          </Row>
          : <> </>}
        <Row>
          <Col>
            <Spin tip={this.props.intl.formatMessage({id: "course.sendingReview"})}
                  spinning={sendingComment}>
              <Card bordered={false} style={{marginTop: '20px'}}>
                <Form onSubmit={this.submitCommentForm}>
                  {this.props.form.getFieldDecorator("rate", {
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: 'comment.rate.error.required'})
                    }]
                  })(
                    <Rate/>
                  )}
                  {this.props.form.getFieldDecorator("text", {
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: 'comment.error.required'})
                    }]
                  })(
                    <TextArea/>
                  )}
                  <Row type="flex" justify="end">
                    <Col>
                      <Button buttonType={ButtonType.FOLLOW} style={{marginTop: '10px'}} htmlType={"submit"}>
                        {this.props.intl.formatMessage({id: "course.sendComment"})}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Spin>
          </Col>
        </Row>
      </>
    );
  }
}

export default injectIntl(withLocalizedForm<MaterialReviewsProps & MaterialReviewsHandlers>({})(MaterialReviews));