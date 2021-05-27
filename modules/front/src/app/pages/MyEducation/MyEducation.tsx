import React, {Component} from 'react';
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import {observer} from "mobx-react";
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import {injectIntl, WrappedComponentProps} from "react-intl";
import MyEducationManagement from "./MyEducationManagement";
import {List} from "antd";
import {NavLink} from "react-router-dom";
import {CourseManagement} from "../Course/CourseManagement";
import {EnrollmentManagement} from "../MyCourse/EnrollmentManagement";
import LearningHistoryManagement from "../LearningHistory/LearningHistoryManagement";
import {BooksManagement} from "../Books/BooksManagement";
import {getBlueMenuIcon} from "../../../resources/icons/menu-blue";

@observer
class MyEducation extends Component<WrappedComponentProps> {

  render() {

    const sections = [{
      id: "course-catalog",
      name: this.props.intl.formatMessage({id: "menu.course-catalog"}),
      url: "/" + CourseManagement.PATH
    },
      {
        id: "my-courses",
        name: this.props.intl.formatMessage({id: "menu.my-courses"}),
        url: "/" + EnrollmentManagement.PATH
      },
      {
        id: "learning-history",
        name: this.props.intl.formatMessage({id: "menu.learn-history"}),
        url: "/" + LearningHistoryManagement.PATH
      },
      {
        id: "library",
        name: this.props.intl.formatMessage({id: "menu.library"}),
        url: "/" + BooksManagement.PATH
      }];

    return (
      <Page pageName={this.props.intl.formatMessage({id: "menu.my-education"})}>
        <Section size="large" padding="none" visible={false}>
          <ImageCarousel code={MyEducationManagement.PATH}/>
        </Section>
        <List className="section-list-container"
              grid={{
                gutter: 16,
                column: 4
              }}
              dataSource={sections}
              renderItem={item => (
                <List.Item>
                  <NavLink to={item.url}>
                    <Section className="education-section-container">
                      <img src={getBlueMenuIcon(item.id)} className="education-section-icon"/>
                      {item.name}
                    </Section>
                  </NavLink>
                </List.Item>
              )}
        />
      </Page>
    );
  }
}

export default injectIntl(MyEducation);