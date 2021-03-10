import React, {Component} from 'react';
import Page from "../../hoc/PageContentHoc";
import {Card, Col, Form, Rate, Row, Skeleton} from "antd";
import {Link} from "react-router-dom";
import Button, {ButtonType} from "../../components/Button/Button";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import Section from "../../hoc/Section";
import MaterialHeader from "../Material/MaterialHeader";
import MaterialDescription from "../Material/MaterialDescription";
import MaterialReviews, {Comment, RateRenderMeta} from "../Material/MaterialReviews";
import {inject, observer} from "mobx-react";
import {observable} from "mobx";
import {collection, getCubaREST, instance} from "@cuba-platform/react";
import {Book} from "../../../cuba/entities/base/tsadv$Book";
import {getBlobUrl} from "../../util/util";
import {bookFileProperties} from "./DicBookCategoryCards";
import {BookReview} from "../../../cuba/entities/base/tsadv$BookReview";
import {SerializedEntity} from "@cuba-platform/rest";
import {PersonExt} from "../../../cuba/entities/base/base$PersonExt";
import moment from "moment";
import Notification from "../../util/Notification/Notification";
import {RootStoreProp} from "../../store";

type EditorProps = {
  entityId: string;
};

@inject("rootStore")
@observer
class BookInfo extends Component<WrappedComponentProps & EditorProps & RootStoreProp> {

  dataInstance = instance<Book>(Book.NAME, {
    view: "portal-book-info"
  });

  reviews = collection<BookReview>(BookReview.NAME, {
    view: "portal-book-info-reviews",
    filter: {
      conditions: [{
        property: "book",
        operator: "=",
        value: this.props.entityId
      }]
    }
  });

  @observable
  sendingComment: boolean = false;

  sendComment = (rate: number, text: string): void => {
    this.sendingComment = true;

    const requestData = {
      reviewText: text,
      rating: rate,
      book: {
        id: this.props.entityId
      },
      author: {
        id: this.props.rootStore!.userInfo.personGroupId
      }
    };

    getCubaREST()!.commitEntity(BookReview.NAME, (requestData as any)).then((response: BookReview) => {
      this.sendingComment = false;

      Notification.success({
        message: this.props.intl.formatMessage({id: "course.rate.notification"})
      });
      this.reviews.load();
      this.dataInstance.load(this.props.entityId);
    }).catch(() => {
      this.sendingComment = false;
    });
  };

  render() {
    return (
      <Page>
        <Card className="narrow-layout card-actions-container" actions={[
          <Link to={"/books"}>
            <Button buttonType={ButtonType.FOLLOW}>
              <FormattedMessage id="back"/>
            </Button>
          </Link>
        ]} bordered={false}>
          <div className={"course-edit-container"}>
            <Section size={"large"}>
              {this.dataInstance.status === 'DONE' && this.dataInstance.item
                ? <MaterialHeader
                  name={this.dataInstance.item._instanceName!}
                  finished={0}
                  showEnrollment={false}
                  materialInfoType="book"
                  avgRate={this.dataInstance.item.reviews
                    ? this.dataInstance.item.reviews.map(r => (r.rating as number)).reduce((i1, i2) => i1 + i2, 0)
                    : 0}
                  imageProps={{
                    type: "promise",
                    imgSrcProp: this.dataInstance.item.image ? getBlobUrl(this.dataInstance.item.image.id) : undefined
                  }}
                  reviewsCount={this.dataInstance.item.reviews ? this.dataInstance.item.reviews.length : 0}
                  // subscribe={this.subscribeToCourse}
                  // subscribing={this.subscribingToCourse}
                />
                : <Skeleton active paragraph={{rows: 3}}/>}
            </Section>
            <Section size={"large"} sectionName={this.props.intl.formatMessage({id: "book.information"})}>
              <MaterialDescription
                descriptionHtml={this.dataInstance.item ? this.dataInstance.item.bookDescriptionLang1 : null}>
                <Row>
                  <Col span={8}>
                    <Form.Item label={this.props.intl.formatMessage({id: "book.extension"})}
                               className={"form-item"}
                               key='preRequisitions'>
                      {this.dataInstance.item ? bookFileProperties.filter(fp => this.dataInstance.item!.hasOwnProperty(fp)).join(", ") : ""}
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={this.props.intl.formatMessage({id: "book.author"})} className={"form-item"}
                               key='duration'>
                      {this.dataInstance.item ? this.dataInstance.item.authorLang1 : ""}
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={this.props.intl.formatMessage({id: "book.pageCount"})} className={"form-item"}
                               key='duration'>
                      {
                        //TODO: затычка
                      }
                      {this.dataInstance.item ? 20 : ""}
                    </Form.Item>
                  </Col>
                </Row>
              </MaterialDescription>
            </Section>
            <Section sectionName={this.props.intl.formatMessage({id: "reviews"})} size={"large"}>
              {this.reviews.status === "DONE"
                ? <MaterialReviews avgRate={this.reviews.items.map(r => r.rating).reduce((i1, i2) => i1 + i2, 0) / this.reviews.items.length}
                                   comments={this.reviews.items.map(r => {
                                     return ({
                                       user: (r.author ? (r.author as SerializedEntity<PersonExt>)._instanceName : undefined),
                                       comment: r.reviewText,
                                       date: moment(r.postDate),
                                       rating: r.rating
                                     } as Comment)
                                   })}
                                   rateList={this.mapReviewToRateList(this.reviews.items)}
                                   sendComment={this.sendComment}
                                   sendingComment={this.sendingComment}/>
                : <Skeleton active paragraph={{rows: 3}}/>}
            </Section>
          </div>
        </Card>
      </Page>
    );
  }

  mapReviewToRateList = (reviews: BookReview[]): RateRenderMeta[] => {
    const rateList: RateRenderMeta[] = [];
    for (let i = 5; i > 0; i--) {
      const rateCount = reviews.filter(r => r.rating === i);

      rateList.push({
        rate: <Rate disabled value={i} key={i}/>,
        finished: rateCount ? rateCount.length : 0
      })
    }
    return rateList;
  };

  componentDidMount(): void {
    this.dataInstance.load(this.props.entityId);
    this.reviews.load();
  }
}

export default injectIntl(BookInfo);