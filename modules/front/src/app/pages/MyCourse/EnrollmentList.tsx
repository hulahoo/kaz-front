import React from 'react';
import {Spin, Tabs} from "antd";
import {inject, observer} from "mobx-react";
import {DicCategory} from "../../../cuba/entities/base/tsadv$DicCategory";
import {Link} from "react-router-dom";
import SearchInput from "../../components/SearchInput";
import {restQueries} from "../../../cuba/queries";
import {observable, runInAction} from "mobx";
import {RootStoreProp} from "../../store";
import Page from "../../hoc/PageContentHoc";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {restServices} from "../../../cuba/services";
import {EnrollmentManagement} from "./EnrollmentManagement";
import PanelCard from "../../components/CourseCard";
import Meta from "antd/es/card/Meta";
import ImageLogo from "../../components/ImageLogo";
import Section from "../../hoc/Section";
import {CourseManagement} from "../Course/CourseManagement";
import Notification from "../../util/Notification/Notification";
import Rate from "../../components/Rate/Rate";
import {ReactComponent as SvgFinishedCourse} from "../../../resources/icons/check-circle-regular.svg";

@inject("rootStore")
@observer
class EnrollmentListComponent<T> extends React.Component<RootStoreProp & WrappedComponentProps> {

  @observable
  status = "LOADING";

  @observable
  dataCollection: DicCategory[] = [];

  onSearch = (value: string) => {
    if (value) {
      restServices.enrollmentService.searchEnrollments({
        courseName: value,
        userId: this.props.rootStore!.userInfo.personGroupId!
      }).then(response => {
        if (response.length === 0) {
          Notification.info({
            message: this.props.intl.formatMessage({id: "courses.search.noFound"})
          });
          return;
        }
        runInAction(() => {
          this.dataCollection = response
        })
      });
    } else {
      this.loadData();
    }
  };

  render() {
    const {TabPane} = Tabs;

    return (
      <Page pageName={this.props.intl.formatMessage({id: "menu.my-courses"})}>
        <Section size="large" visible={false}>
          <Spin spinning={this.status === 'LOADING'}>
            <SearchInput onSearch={this.onSearch} />
            <Tabs>
              {this.status === 'DONE' ? this.dataCollection.map(category => <TabPane tab={category.langValue1}
                                                                                     key={category.id}>
                <div className={"courses-cards-wrapper"}>
                  <div className={"courses-cards"}>
                    {category.courses!.map(course => <Link
                      to={"/" + CourseManagement.PATH + "/" + course.id}><PanelCard key={course.id}
                                                                                                  loading={false} {...course}
                                                                                                  name={course.name!}
                                                                                                  header={(<>
                                                                                                    {
                                                                                                      course.enrollments!.find(e => e.status === 'COMPLETED')
                                                                                                        ?
                                                                                                        <SvgFinishedCourse className="course-icon left-icon"/>
                                                                                                        : null
                                                                                                    }
                                                                                                    {course.isOnline ?
                                                                                                      <img
                                                                                                        src={require("../../../resources/icons/online.png")}
                                                                                                        alt="online"
                                                                                                        className="course-icon right-icon"/> :
                                                                                                      null}
                                                                                                    <ImageLogo
                                                                                                      type="base64"
                                                                                                      imgSrc={course.logo}
                                                                                                      name={course.name!}/>
                                                                                                  </>)}>

                      <Meta title={course.name}
                            description={<><Rate disabled defaultValue={course.rating || 0}
                                                 allowHalf/>({course.commentCount || 0})</>}/>
                    </PanelCard></Link>)}
                  </div>
                </div>
              </TabPane>) : <></>}
            </Tabs>
          </Spin>
        </Section>
      </Page>
    );
  }

  componentDidMount(): void {
    this.loadData();
  }

  loadData = () => {
    restServices.enrollmentService.searchEnrollments({userId: this.props.rootStore!.userInfo.personGroupId!}).then(response => {
      runInAction(() => {
        this.dataCollection = response;
        this.status = "DONE";
      });
    }).catch(() => {
      this.status = "DONE";
    })
  }
}

export default injectIntl(EnrollmentListComponent);