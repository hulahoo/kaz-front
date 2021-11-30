import * as React from "react";
import { inject, observer } from "mobx-react";
import { Link, RouteComponentProps } from "react-router-dom";
import Button, { ButtonType } from "../../components/Button/Button";
import { RootStoreProp } from "../../store";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import DataTableFormat from "../../components/DataTable/intex";
import { link } from "../../util/util";
import {action, IReactionDisposer, observable, reaction} from "mobx";

import { Modal, Tabs, Layout, Row, Col, Divider, Select, Spin } from "antd";

import {
  collection,
  injectMainStore,
  MainStoreInjected,
  DataTable,
  getCubaREST
} from "@cuba-platform/react";

import { Concourse } from "../../../cuba/entities/base/tsadv_Concourse";
import { ConcourseRequest } from "../../../cuba/entities/base/tsadv_ConcourseRequest";
import { SerializedEntity } from "@cuba-platform/rest";
import { ConcourseManagement } from "./ConcourseManagement";
import { ConcourseRequestManagement } from "../ConcourseRequest/ConcourseRequestManagement";
import { ConcourseImage } from "./ConcourseImage";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";
import { DataCollectionStore } from "@cuba-platform/react/dist/data/Collection";
import { DataInstanceStore } from "@cuba-platform/react/dist/data/Instance";
import { ICollection } from "@amcharts/amcharts4/.internal/fabric/fabric-impl";
import { GradeDetail } from "../../../cuba/entities/base/tsadv_GradeDetail";
const { Footer, Content, Sider } = Layout;
const { Option } = Select;
const { TabPane } = Tabs;

type ActiveTabProps = RouteComponentProps<{ activeTab?: string }>;
interface IState {
  data: number;
}

interface bestConcourseList {
  projectName?: any;
  index?: number;
  organizationBin?: any;
  concourseId?: string;
}

@injectMainStore
@inject("rootStore")
@observer
class ConcourseListComponent extends React.Component<
  ActiveTabProps &
    MainStoreInjected &
    WrappedComponentProps &
    RootStoreProp &
    RouteComponentProps<any>,
  IState
> {

  reactionDisposer: IReactionDisposer;

  dataCollection = collection<Concourse>(Concourse.NAME, {
    view: "concourse-view",
    sort: "-updateTs",
    filter: {
      conditions: [
        {
          value: "ACTIVE",
          operator: "=",
          property: "concourseStatus"
        }
      ]
    }
  });

  concourseCollection = collection<Concourse>(Concourse.NAME, {
    view: "concourse-view",
  });

  dataCollectionConcourse = collection<ConcourseRequest>(
    ConcourseRequest.NAME,
    {
      view: "concourseRequest-edit",
      sort: "-updateTs"
    }
  );

  bestConcourseRequests = collection<ConcourseRequest>(
    ConcourseRequest.NAME,
    {
      view: "concourseRequest-edit",
      loadImmediately: false
    }
  );

  dataCollectionConcourseRequest = collection<ConcourseRequest>(
    ConcourseRequest.NAME,
    {
      view: "concourseRequest-edit",
      sort: "-updateTs",
      filter: {
        conditions: [
          {
            value: this.props.rootStore!.userInfo!.personGroupId!,
            operator: "=",
            property: "personGroup.id"
          }
        ]
      }
    }
  );

  newData = collection<ConcourseRequest>(
    ConcourseRequest.NAME,
    {
      view: "concourseRequest-edit",
      sort: "-updateTs",
      loadImmediately: false,
      filter: {
        conditions: [
          {
            value: "APPROVED",
            operator: "=",
            property: "status.code"
          }
        ]
      }
    }
  );

  dataCollectionConcourseRequestGrade = collection<ConcourseRequest>(
    ConcourseRequest.NAME,
    {
      view: "concourseRequest-edit",
      sort: "-updateTs",
      filter: {
        conditions: [
          {
            value: "APPROVED",
            operator: "=",
            property: "status.code"
          }
        ]
      }
    }
  );

  gradeDataCollection = collection<GradeDetail>(GradeDetail.NAME, {
    view: "gradeDetail-view",
    filter: {
      conditions: [
        {
          value: this.props.rootStore!.userInfo!.personGroupId!,
          operator: "=",
          property: "personGroup.id"
        }
      ]
    }
  });

  concourseFields = ["description", "banner"];

  bestConcourseFields = ["name_ru", "category", "year"];

  concourseRequestFields = [
    "requestNumber",
    "requestDate",
    "status",
    this.props.mainStore!.locale == "ru" ? "requestNameRu" : "requestNameEn"
  ];

  concourseGradeFields = [
    this.props.mainStore!.locale == "ru" ? "requestNameRu" : "requestNameEn",
    this.props.mainStore!.locale == "ru"
      ? "shortProjectDescriptionRu"
      : "shortProjectDescriptionEn",
    "totalGrade",
    "comment"
  ];

  constructor(props: any) {
    super(props);
    this.state = {
      data: 0
    };
  }

  @observable selectedRowKey: string | undefined;

  @observable
  pageName = "concourse";

  @observable
  bestConcoursesList = this.dataCollectionConcourse;

  showDeletionDialog = (e: SerializedEntity<Concourse>) => {
    Modal.confirm({
      title: this.props.intl.formatMessage(
        { id: "management.browser.delete.areYouSure" },
        { instanceName: e._instanceName }
      ),
      okText: this.props.intl.formatMessage({
        id: "management.browser.delete.ok"
      }),
      cancelText: this.props.intl.formatMessage({
        id: "management.browser.delete.cancel"
      }),
      onOk: () => {
        this.selectedRowKey = undefined;

        return this.dataCollection.delete(e);
      }
    });
  };

  concourseComponent = (
    imgUrl?: any,
    btnLink?: string,
    concourseDesc?: any
  ) => {
    return (
      <Layout style={{ marginTop: "30px", marginBottom: "30px" }} key={imgUrl}>
        <Row>
          <Col span={19} className="concourse-image">
            <ConcourseImage imageId={imgUrl} />
          </Col>
          <Col span={5} className="concourse-button">
            <Link
              to={
                ConcourseRequestManagement.PATH +
                "/" +
                ConcourseRequestManagement.NEW_SUBPATH +
                "?concourseId=" +
                btnLink
              }
              key="createConcourseRequest"
            >
              <Button buttonType={ButtonType.PRIMARY} block>
                <span>
                  <FormattedMessage id="management.browser.create" />
                </span>
              </Button>
            </Link>
          </Col>
        </Row>

        <h3 style={{ marginTop: "30px" }} id="concourseDesc">
          <FormattedMessage id="concourseDesc" />
        </h3>
        <Row
          style={{
            marginTop: "5px",
            border: "2px solid black",
            borderRadius: "8px",
            padding: " 10px 20px"
          }}
        >
          <Col style={{ borderWidth: "2px" }} span={24}>
            {concourseDesc}
          </Col>
        </Row>
        <Divider style={{ marginTop: "30px" }} />
      </Layout>
    );
  };

  bestConcourseComponent = (
    projectName?: any,
    index?: number,
    organizationBin?: any,
    concourseId?: string
  ) => {
    return (
      <Row
        style={{
          marginTop: "30px",
          border: "2px solid black",
          borderRadius: "8px",
          padding: " 10px 20px"
        }}
        key={projectName + index + projectName}
      >
        <Col span={20} className="best-concourse">
          <p>
            <FormattedMessage id="concoursePlace" /> {index}
          </p>
          <h2>
            <Link
              to={ConcourseRequestManagement.PATH + "/" +  concourseId }
              key="concourseRequestDetail"
            >
              <a>{projectName}</a>
            </Link>
          </h2>
          <Row style={{ marginTop: "30px" }}>
            <Col span={4}>
              <h4>
                <FormattedMessage id="concourseCompany" />
              </h4>
            </Col>
            <Col>
              <h4>{organizationBin}</h4>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  @observable
  concourseYear: number;

  @observable
  concourseCategory: string;

  @observable
  filterCategoryValue: string = "";

  @observable
  filterYearValue: string = "";

  handleChangeCategory = (name: string, value: string) => {
    this.filterCategoryValue = value;
    this.bestConcourseRequestListUpdater();
  };
  handleChangeYear = (name: string, value: string) => {
    this.filterYearValue = value;
  };


  @action
  bestConcourseRequestListUpdater = () => {
    this.bestConcourseRequests.items = []
    if (this.filterYearValue && !this.filterCategoryValue){
      this.bestConcourseRequests.filter = {
        conditions: [
          {
            property: "concourse.year",
            operator: "=",
            value: this.filterYearValue
          },
          {
            property: "place",
            operator:">=",
            value: "1"
          }
        ]
      }
      this.bestConcourseRequests.load()
    }
    if (!this.filterYearValue && this.filterCategoryValue){
      this.bestConcourseRequests.filter = {
        conditions: [
          {
            property: "category",
            operator: "=",
            value: this.filterCategoryValue
          },
          {
            property: "place",
            operator:">=",
            value: "1"
          }
        ]
      }
      this.bestConcourseRequests.load()
    }
    if (this.filterYearValue && this.filterCategoryValue){
      this.bestConcourseRequests.filter = {
        conditions: [
          {
            property: "category",
            operator: "=",
            value: this.filterCategoryValue
          },
          {
            property: "concourse.year",
            operator: "=",
            value: this.filterYearValue
          },
          {
            property: "place",
            operator:">=",
            value: "1"
          }
        ]
      }
      this.bestConcourseRequests.load()
    }
    else{
      this.bestConcourseRequests.items = []
    }


  }


  render() {

    const btns = [
      <Link
        to={
          ConcourseRequestManagement.PATH +
          "/" +
          ConcourseRequestManagement.NEW_SUBPATH
        }
        key="createConcourseRequest"
      >
        <Button
          buttonType={ButtonType.PRIMARY}
          style={{ margin: "0 12px 12px 0" }}
        >
          <span>
            <FormattedMessage id="management.browser.create" />
          </span>
        </Button>
      </Link>
    ];

    const { activeTab } = this.props.match.params;
    const defaultActiveKey = activeTab ? activeTab : "1";


    if (this.dataCollectionConcourseRequestGrade.status==="DONE"){
      this.dataUpdater()
    }

    const { status } = this.dataCollection;

    let dates = this.concourseCollection.items.map(
      el => el.year
    );
    let uniqueYears = [...new Set(dates)];
    uniqueYears.sort((a, b)=>b!-a!)

    const isRus = this.props.mainStore!.locale == "ru";

    return (
      <Page pageName={this.props.intl.formatMessage({ id: this.pageName })}>
        <Section size="large">
          <Tabs
            defaultActiveKey={defaultActiveKey}
            onChange={activeKey => {
              switch(activeKey){
                case "1":
                  this.pageName = "concourseRequest"
                  return 'concourseRequest'
                case "2":
                  this.pageName = "bestConcourse"
                  return 'bestConcourse'
                case "3":
                  this.pageName = "concourseRequest"
                  return 'concourseRequest'
                case "4":
                  this.dataUpdater()
                  this.pageName = "concourseMarks"
                  return 'concourseMarks'
                case "5":
                  this.pageName = "bestConcourse"
                  return 'bestConcourse'
                default:
                  this.pageName = "concourseRequest"
                  return 'concourseRequest'
              }
            }

            }
          >
            <TabPane
              tab={this.props.intl.formatMessage({ id: "concourse" })}
              key="1"
            >
              <div style={{ paddingTop: 12, paddingBottom: 12 }}>
                <Spin spinning={status == "LOADING"}>
                  {this.dataCollection.items.map(
                    el =>
                      el &&
                      this.concourseComponent(
                        el!.banner!.id,
                        el!.id,
                        el!.description
                      )
                  )}
                </Spin>
              </div>
            </TabPane>
            <TabPane
              tab={this.props.intl.formatMessage({ id: "bestConcourse" })}
              key="2"
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "500px"
                }}
              >
                <div style={{ width: "200px", marginRight: "50px" }}>
                  <Col>
                    {this.props.intl.formatMessage({
                      id: "concourse.categories.year"
                    })}
                  </Col>
                  <Col>
                    <Select
                      allowClear={true}
                      placeholder={"....."}
                      onChange={value =>
                        this.handleChangeYear("name", value as string)
                      }
                      style={{ width: "100%" }}
                    >
                      {uniqueYears.map((el, id) => el&& (
                        <Option value={el} key={el + id}>
                          {el}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                </div>
                <div style={{ width: "200px", marginRight: "50px" }}>
                  <Col>
                    {this.props.intl.formatMessage({
                      id: "concourse.categories.project"
                    })}
                  </Col>
                  <Col>
                    <Select
                      allowClear={true}
                      placeholder={"....."}
                      onChange={value =>
                        this.handleChangeCategory("name", value as string)
                      }
                      style={{ width: "100%" }}
                    >
                      <Option value={"PRODUCTIONPROJECTS"}>
                        {this.props.intl.formatMessage({
                          id: "concourse.production.projects"
                        })}
                      </Option>
                      <Option value={"SOCIALPROJECTS"}>
                        {this.props.intl.formatMessage({
                          id: "concourse.social.projects"
                        })}
                      </Option>
                      <Option value={"SAFETYPROJECTS"}>
                        {this.props.intl.formatMessage({
                          id: "concourse.safety.projects"
                        })}
                      </Option>
                    </Select>
                  </Col>
                </div>
              </div>
              <div>
                {this.bestConcoursesList.items
                  .filter(
                    el =>
                      el.place &&
                      (el.place.toString() === "1" ||
                        el.place.toString() === "2" ||
                        el.place.toString() === "3")
                  )
                  .sort((a, b)=> a.place! - b.place! ).map((el, index) => {
                    if (this.filterYearValue && this.filterCategoryValue) {
                      return (
                        el.concourse!.year!.toString() ===
                          this.filterYearValue.toString() &&
                        el.category!.toString() === this.filterCategoryValue &&
                        this.bestConcourseComponent(
                          this.props.mainStore!.locale == "ru"
                            ? el!.requestNameRu
                            : el!.requestNameEn,
                          el.place!,
                          isRus
                            ? el!.personGroup!.company!.langValue2
                            : el!.personGroup!.company!.langValue1,
                          el.id!
                        )
                      );
                    } else if (
                      this.filterYearValue &&
                      !this.filterCategoryValue
                    ) {
                      return (
                        el.concourse!.year!.toString() ===
                          this.filterYearValue.toString() &&
                        this.bestConcourseComponent(
                          isRus ? el!.requestNameRu : el!.requestNameEn,
                          el.place!,
                          isRus
                            ? el!.personGroup!.company!.langValue2
                            : el!.personGroup!.company!.langValue1,
                          el.id!
                        )
                      );
                    } else if (
                      !this.filterYearValue &&
                      this.filterCategoryValue
                    ) {
                      return (
                        el.category &&
                        el.category!.toString() === this.filterCategoryValue &&
                        this.bestConcourseComponent(
                          isRus ? el!.requestNameRu : el!.requestNameEn,
                          el.place!,
                          isRus
                            ? el!.personGroup!.company!.langValue2
                            : el!.personGroup!.company!.langValue1,
                          el.id!
                        )
                      );
                    }
                    return null
                  })}
              </div>
            </TabPane>

            <TabPane
              tab={this.props.intl.formatMessage({ id: "concourseRequest" })}
              key="3"
            >
              <DataTableFormat
                dataCollection={this.dataCollectionConcourseRequest}
                fields={this.concourseRequestFields}
                hideSelectionColumn={true}
                render={[
                  {
                    column: this.concourseRequestFields[0],
                    render: (text, record) => (
                      <Link
                        to={
                          ConcourseRequestManagement.PATH +
                          "/" +
                          (record as ConcourseRequest).id
                        }
                      >
                        {text}
                      </Link>
                    )
                  },
                ]}
              />
            </TabPane>
            {
              <TabPane
                tab={this.props.intl.formatMessage({ id: "concourseMarks" })}
                key="4"
              >
                <DataTableFormat
                  dataCollection={this.newData && this.newData}
                  fields={this.concourseGradeFields}
                  hideSelectionColumn={true}
                  render={[
                    {
                      column: isRus ? "requestNameRu" : "requestNameEn",
                      render: (text, record) => (
                        <Link
                          to={
                            ConcourseManagement.PATH +
                            "/" +
                            (record as ConcourseRequest).id
                          }
                        >
                          {text}
                        </Link>
                      )
                    },
                    {
                      column: isRus ? "requestNameRu" : "requestNameEn",
                      render: (text, record) => ({ text })
                    },
                    {
                      column: this.concourseGradeFields[2],
                      render: (text, record) => {
                        // @ts-ignore
                        const elem = this.gradeDataCollection.items.filter(
                          (el: GradeDetail) => {
                            // if (el.concourse!.id === record.id){
                            //   console.log(`${el.grade}=> `, el)
                            //   return el
                            // }
                            return el.concourseRequest!.id === record.id;
                          }
                        );

                        if (elem[0]) return elem[0]!.grade!;
                        return;
                      }
                    },
                    {
                      column: this.concourseGradeFields[3],
                      render: (text, record) => {
                        // @ts-ignore
                        const elem = this.gradeDataCollection.items.filter(
                          (el: GradeDetail) => {
                            // if (el.concourse!.id === record.id){
                            //   console.log(`${el.grade}=> `, el)
                            //   return el
                            // }
                            return el.concourseRequest!.id === record.id;
                          }
                        );

                        if (elem[0]) return elem[0]!.comment!;
                        return;
                      }
                    }
                  ]}
                />
              </TabPane>
            }

          </Tabs>
        </Section>
      </Page>
    );
  }

  componentDidMount() {
    this.dataUpdater();
  }

  componentWillUpdate() {
    this.dataUpdater();
  }

  // componentWillMount() {
  //   this.dataUpdater();
  // }

  @action
  dataUpdater = () => {
    this.newData.items = [];
    if (this.dataCollectionConcourseRequestGrade.status === "DONE"){
      let data;
      this.dataCollectionConcourseRequestGrade.items.map(
        item => {
          item!.concourse!.judges!.map(judge => {
            if (
              judge.id! ===
              this.props.rootStore!.userInfo!.personGroupId && !this.newData.items.includes(item)
            ){
              this.newData.items.push(item);
            }
          });
        }
      );

      // this.newData.load()
    }

  };

  getRecordById(id: string): SerializedEntity<Concourse> {
    const record:
      | SerializedEntity<Concourse>
      | undefined = this.dataCollection.items.find(record => record.id === id);
    if (!record) {
      throw new Error("Cannot find entity with id " + id);
    }

    return record;
  }

  // loadConcourseRequest = () =>{
  //   this.newData = collection<ConcourseRequest>(ConcourseRequest.NAME, {
  //     view: "concourse-view",
  //     sort: "-updateTs",
  //     filter: {
  //       conditions: [
  //         {
  //           value: this.props.rootStore!.userInfo!.personGroupId!,
  //           operator: "=",
  //           property: "id"
  //         },
  //         {
  //           value: "APPROVED",
  //           operator: "=",
  //           property: "status.code"
  //         }
  //       ]
  //     }
  //   });
  //   this.newData.load();
  // }



  handleRowSelectionChange = (selectedRowKeys: string[]) => {
    this.selectedRowKey = selectedRowKeys[0];
  };

  deleteSelectedRow = () => {
    this.showDeletionDialog(this.getRecordById(this.selectedRowKey!));
  };
}

const ConcourseList = injectIntl(ConcourseListComponent);

export default ConcourseList;
