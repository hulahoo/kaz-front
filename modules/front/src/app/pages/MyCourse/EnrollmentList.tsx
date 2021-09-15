import React from 'react';
import {Select, Spin, Tabs} from "antd";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";
import SearchInput from "../../components/SearchInput";
import {observable, runInAction} from "mobx";
import {RootStoreProp} from "../../store";
import Page from "../../hoc/PageContentHoc";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {EnrollmentCatalogModel, restServices} from "../../../cuba/services";
import PanelCard from "../../components/CourseCard";
import Meta from "antd/es/card/Meta";
import ImageLogo from "../../components/ImageLogo";
import Section from "../../hoc/Section";
import {CourseManagement} from "../Course/CourseManagement";
import Notification from "../../util/Notification/Notification";
import Rate from "../../components/Rate/Rate";
import {getFileUrl} from "../../util/util";
import CardIconFactory from "../CourseCatalog/CardIconFactory";
import {SerializedEntity} from "@cuba-platform/rest";

@inject("rootStore")
@observer
class EnrollmentListComponent<T> extends React.Component<RootStoreProp & WrappedComponentProps> {

  @observable
  status = "LOADING";

  @observable
  dataCollection: EnrollmentCatalogModel[] = [];

  @observable
  filterValue:string = ""
  handleChange = (name:string, value:string) =>{
    this.filterValue = value
    console.log("filteredValue",this.filterValue)
  }

  onSearch = (value: string) => {
    if (value) {
      restServices.enrollmentService.searchEnrollments({
        personGroupId: this.props.rootStore!.userInfo.personGroupId!,
        courseName: value
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
    const { Option } = Select;
    const defaultTabKey = this.props.rootStore!.courseCatalogStore ? this.props.rootStore!.courseCatalogStore.selectedEnrollmentId : undefined;

    return (
      <Page pageName={this.props.intl.formatMessage({id: "menu.my-courses"})}>
        <Section size="large" visible={false}>
          <Spin spinning={this.status === 'LOADING'}>
            <div style={{display:"flex"}}>
              <div style={{width:"70%"}}>
                <SearchInput onSearch={this.onSearch}/>
              </div>
              <div style={{width:"20%", marginLeft:"30px"}}>
                <Select allowClear={true} placeholder={"Выберите..."} onChange={value => this.handleChange("name",value as string)} style={{width:"100%"}} >
                  <Option value={"1"}>{this.props.intl.formatMessage({id: "filter.AtoZ"})}</Option>
                  <Option value={"2"}>{this.props.intl.formatMessage({id: "filter.ZtoA"})}</Option>
                  <Option value={"3"}>{this.props.intl.formatMessage({id: "filter.Newest"})}</Option>
                  <Option value={"4"}>{this.props.intl.formatMessage({id: "filter.Oldest"})}</Option>
                </Select>
              </div>
            </div>
            {this.status === 'DONE' ? <Tabs onChange={this.tabOnChange} defaultActiveKey={defaultTabKey}>
              {this.dataCollection.map((category: SerializedEntity<EnrollmentCatalogModel>) => <TabPane
                tab={category.langValue}
                key={category.id}>
                <div className={"courses-cards-wrapper"}>
                  <div className={"courses-cards"}>
                    {category.courses!.sort((a:any,b:any) => {
                      return   this.filterValue ==='1'?
                        a.name.localeCompare(b.name,'en',{numeric:true})
                        :this.filterValue ===""? 0
                          :this.filterValue ==="2"?  b.name.localeCompare(a.name,'en',{numeric:true})
                            :this.filterValue==="3"? new Date(b.createTs).valueOf() - new Date (a.createTs).valueOf()
                              :this.filterValue==="4"?new Date(a.createTs).valueOf() - new Date (b.createTs).valueOf()
                                :""

                    }).map(course => <Link
                      to={"/" + CourseManagement.PATH + "/" + course.id}><PanelCard key={course.id}
                                                                                    loading={false} {...course}
                                                                                    name={course.name!}
                                                                                    header={(<>
                                                                                      {
                                                                                        course.enrollmentStatus && CardIconFactory.getIcon(course.enrollmentStatus) != null
                                                                                          ? React.createElement(CardIconFactory.getIcon(course.enrollmentStatus)!, {className: "course-icon left-icon"})
                                                                                          : null
                                                                                      }
                                                                                      {course.isOnline ?
                                                                                        <img
                                                                                          src={require("../../../resources/icons/online.png")}
                                                                                          alt="online"
                                                                                          className="course-icon right-icon"/> :
                                                                                        null}
                                                                                      <ImageLogo
                                                                                        type="src"
                                                                                        imgSrc={course.logo ? getFileUrl(course.logo) : undefined}
                                                                                        name={course.name!}/>
                                                                                    </>)}>

                      <Meta title={course.name}
                            description={<><Rate disabled defaultValue={course.rating || 0}
                                                 allowHalf/>({course.commentCount || 0})</>}/>
                    </PanelCard></Link>)}
                  </div>
                </div>
              </TabPane>)}
            </Tabs> : <></>}
          </Spin>
        </Section>
      </Page>
    );
  }

  componentDidMount(): void {
    this.loadData();
    const {courseCatalogStore} = this.props.rootStore!;
    if (!courseCatalogStore) {
      this.props.rootStore!.createCourseCatalogStore();
    }
  }

  loadData = () => {
    restServices.enrollmentService.searchEnrollments({
      personGroupId: this.props.rootStore!.userInfo.personGroupId!
    }).then(response => {
      runInAction(() => {
        this.dataCollection = response;
        this.status = "DONE";
      });
    }).catch(() => {
      this.status = "DONE";
    })
  };

  tabOnChange = (activeKey: string) => {
    this.props.rootStore!.courseCatalogStore!.setSelectedEnrollmentId(activeKey);
  }
}

export default injectIntl(EnrollmentListComponent);