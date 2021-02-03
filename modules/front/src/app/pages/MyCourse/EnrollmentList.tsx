import React from 'react';
import CourseCard from "../../components/CourseCard";
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

@inject("rootStore")
@observer
class EnrollmentListComponent<T> extends React.Component<RootStoreProp & WrappedComponentProps> {

  @observable
  status = "LOADING";

  dataCollection: DicCategory[] = [];

  onSearch = (value: string) => {
    if (value) {
      restServices.enrollmentService.searchEnrollments({
        courseName: value,
        userId: this.props.rootStore!.userInfo.personGroupId!
      }).then(response => {
        runInAction(() => {
          this.dataCollection = response
        })
      });
    }
  };

  render() {
    const {TabPane} = Tabs;

    return (
      <Page pageName={this.props.intl.formatMessage({id: "myCourses"})}>
        <Spin spinning={this.status === 'LOADING'}>
          <SearchInput onSearch={this.onSearch}/>
          <Tabs>
            {this.status === 'DONE' ? this.dataCollection.map(category => <TabPane tab={category.langValue1}
                                                                                   key={category.id}>
              <div className={"courses-cards-wrapper"}>
                <div className={"courses-cards"}>
                  {category.courses!.map(course => <Link to={EnrollmentManagement.PATH + "/" + course.enrollments![0].id}><CourseCard key={course.id}
                                                                                                     loading={false} {...course}
                                                                                                     courseName={course.name!}
                                                                                                     imgBase64={course.logo}
                                                                                                     imageIcon={!(course as any).isOnline ? require("../../../resources/icons/online.png") : null}
                                                                                                     rateCount={90}
                                                                                                     avgRate={course.avgRate}
                                                                                                     courseId={course.id}/></Link>)}
                </div>
              </div>
            </TabPane>) : <></>}
          </Tabs>
        </Spin>
      </Page>
    );
  }

  componentDidMount(): void {
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