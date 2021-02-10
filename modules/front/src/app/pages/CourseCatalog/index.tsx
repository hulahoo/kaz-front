import React from 'react';
import Page from "../../hoc/PageContentHoc";
import {observer} from "mobx-react";
import CourseList from "../Course/CourseList";
import {injectIntl, WrappedComponentProps} from "react-intl";

@observer
class CourseCatalog extends React.Component<WrappedComponentProps> {
  render() {
    return (
      <Page pageName={this.props.intl.formatMessage({id: "menu.course-catalog"})}>
        <CourseList/>
      </Page>
    );
  }
}

export default injectIntl(CourseCatalog);