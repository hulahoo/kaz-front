import React from 'react';
import Page from "../../hoc/PageContentHoc";
import {observer} from "mobx-react";
import CourseList from "../Course/CourseList";
import {injectIntl, WrappedComponentProps} from "react-intl";
import Section from "../../hoc/Section";
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import {CourseManagement} from "../Course/CourseManagement";

@observer
class CourseCatalog extends React.Component<WrappedComponentProps> {

  render() {
    return (
      <Page pageName={this.props.intl.formatMessage({id: "menu.course-catalog"})}>
        <Section size="large" visible={false}>
          <CourseList/>
        </Section>
      </Page>
    );
  }
}

export default injectIntl(CourseCatalog);