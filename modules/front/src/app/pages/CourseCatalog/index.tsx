import React from 'react';
import Page from "../../hoc/PageContentHoc";
import {observer} from "mobx-react";
import CourseList from "../Course/CourseList";

@observer
class CourseCatalog extends React.Component {
  render() {
    return (
      <Page pageName={"Каталог курсов"}>
        <CourseList/>
      </Page>
    );
  }
}

export default CourseCatalog;