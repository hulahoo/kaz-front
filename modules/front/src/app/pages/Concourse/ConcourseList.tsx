import * as React from "react";
import { inject, observer } from "mobx-react";
import { Link, RouteComponentProps } from "react-router-dom";
import Button, { ButtonType } from "../../components/Button/Button";
import { RootStoreProp } from "../../store";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import DataTableFormat from "../../components/DataTable/intex";
import { link } from "../../util/util";
import { observable } from "mobx";

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
import {DataCollectionStore} from "@cuba-platform/react/dist/data/Collection";
import {DataInstanceStore} from "@cuba-platform/react/dist/data/Instance";
import {ICollection} from "@amcharts/amcharts4/.internal/fabric/fabric-impl";
const { Footer, Content, Sider } = Layout;
const {Option} = Select;
const { TabPane } = Tabs;

type ActiveTabProps = RouteComponentProps<{ activeTab?: string }>;
interface IState {
  data: number;
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
  dataCollection = collection<Concourse>(Concourse.NAME, {
    view: "concourse-view",
    sort: "-updateTs"
  });

  dataCollectionConcourse = collection<Concourse>(Concourse.NAME, {
    view: "concourse-view",
    sort: "-updateTs"
  });

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

  dataCollectionConcourseRequestGrade = collection<ConcourseRequest>(
    ConcourseRequest.NAME,
    {
      view: "concourseRequest-edit",
      sort: "-updateTs",
    }
  );

  concourseFields = ["description", "banner"];

  bestConcourseFields = ["name_ru", "category", "year"];

  concourseRequestFields = ["requestNumber", "requestDate", "status", "concourse"];

  concourseGradeFields = ["name_ru", "description", "gradeTotal", "comment"];

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
    organizationBin?: any
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
            <a href="#">{projectName}</a>
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
  newData = collection<Concourse>(Concourse.NAME, {
    view: "concourse-view",
    sort: "-updateTs",
    filter: {
      conditions: [
        {
          value: this.props.rootStore!.userInfo!.personGroupId!,
          operator: "=",
          property: "id"
        }
      ]
    }
  });

  @observable
  concourseYear: number;

  @observable
  concourseCategory: string;

  @observable
  filterCategoryValue:string = ""

  @observable
  filterYearValue:string = ""

  handleChangeCategory = (name:string, value:string) =>{
    this.filterCategoryValue = value
    console.log("filteredValue", this.filterCategoryValue)
  }
  handleChangeYear= (name:string, value:string) =>{
    this.filterYearValue = value
    console.log("filteredValue", this.filterYearValue)
  }



  render() {

    let newCollection = this.dataCollection.items.map((concourse) => {
      concourse.judges!.map(judge=>{
        console.log(judge)
        if (judge.personGroup!.id===this.props.rootStore!.userInfo.personGroupId)
          if (!this.newData.items.includes(concourse)){
            this.newData.items.push(concourse)
          }

      })
    })

    console.log(this.newData)

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
    console.log("USER INFO:", this.dataCollection);
    const { status } = this.dataCollection;

    return (
      <Page pageName={this.props.intl.formatMessage({ id: this.pageName })}>
        <Section size="large">
          <Tabs
            defaultActiveKey={defaultActiveKey}
            onChange={activeKey =>
              (this.pageName =
                "concourse" + (activeKey === "1" ? "" : "Request"))
            }
          >
            <TabPane
              tab={this.props.intl.formatMessage({ id: "concourse" })}
              key="1"
            >
              <div style={{paddingTop:12, paddingBottom:12}}>
                <Spin spinning={status == "LOADING"}>
                  {
                    this.dataCollection.items.map( el => el && this.concourseComponent(el!.banner!.id, el!.id, el!.description)
                  )}
                </Spin>
              </div>
            </TabPane>
            <TabPane
              tab={this.props.intl.formatMessage({ id: "bestConcourse" })}
              key="2"
            >
              <div style={{display:"flex", flexDirection:"row", width:"500px"}}>
                <div style={{width:"200px", marginRight:"50px"}}>
                  <Col  >{this.props.intl.formatMessage({id: "concourse.categories.year"})}</Col>
                  <Col  >
                    <Select allowClear={true} placeholder={"Select..."} onChange={value => this.handleChangeYear("name",value as string)} style={{width:"100%"}} >
                      <Option value={"2018"}>2018</Option>
                      <Option value={"2019"}>2019</Option>
                      <Option value={"2020"}>2020</Option>
                      <Option value={"2021"}>2021</Option>
                    </Select>
                  </Col>
                </div>
                <div style={{width:"200px", marginRight:"50px"}}>
                  <Col  >{this.props.intl.formatMessage({id: "concourse.categories.project"})}</Col>
                  <Col  >
                    <Select allowClear={true} placeholder={"Select..."} onChange={value => this.handleChangeCategory("name",value as string)} style={{width:"100%"}} >
                      <Option value={"PRODUCTIONPROJECTS"}>{this.props.intl.formatMessage({id: "concourse.production.projects"})}</Option>
                      <Option value={"SOCIALPROJECTS"}>{this.props.intl.formatMessage({id: "concourse.social.projects"})}</Option>
                      <Option value={"SAFETYPROJECTS"}>{this.props.intl.formatMessage({id: "concourse.safety.projects"})}</Option>
                    </Select>
                  </Col>
                </div>
              </div>
              <div>
                {this.bestConcoursesList.items.map(
                  (el, index) => {
                    if (this.filterYearValue && this.filterCategoryValue){
                      return (el.year!.toString()===this.filterYearValue && el.category!.toString() === this.filterCategoryValue) && this.bestConcourseComponent(el!.name_ru, index + 1, el!.organizationBin
                      )
                    }
                    else if (this.filterYearValue && !this.filterCategoryValue){
                      return el.year!.toString() === this.filterYearValue && this.bestConcourseComponent(
                          el!.name_ru,
                          index + 1,
                          el!.organizationBin
                        )
                    }
                    else if (!this.filterYearValue && this.filterCategoryValue){
                      return el.category!.toString() === this.filterCategoryValue &&
                        this.bestConcourseComponent(
                          el!.name_ru,
                          index + 1,
                          el!.organizationBin
                        )
                    }
                    return this.bestConcourseComponent( el!.name_ru,
                      index + 1,
                      el!.organizationBin)
                  }

                )}

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
                  {
                    column: this.concourseRequestFields[3],
                    render: (text, record)=>(
                      (record.concourse as Concourse).name_ru
                    )
                  }
                ]}
              />
            </TabPane>

            {
              this.dataCollection.items.map(concourse=>(
                concourse.judges!.length && concourse.judges!.map(judge=>(
                  judge.personGroup!.id===this.props.rootStore!.userInfo.personGroupId
                )) && concourse
              )) && <TabPane
                tab={"Заявки для оценки"}
                key="4"
              >

                <DataTableFormat
                  dataCollection={this.newData}
                  fields={this.concourseGradeFields}
                  hideSelectionColumn={true}
                  render={[
                    {
                      column: this.concourseGradeFields[0],
                      render: (text, record) => (
                        <Link
                          to={
                            ConcourseManagement.PATH +
                            "/" +
                            (record as Concourse).id
                          }
                        >
                          {(record as Concourse).name_ru}
                        </Link>
                      )
                    },
                    {
                      column: this.concourseGradeFields[2],
                      render: (text, record) => {
                        let sum = 0
                        record.grade!.map(el=>{
                          sum+=el.grade
                        })
                        return sum
                      }
                    },
                    {
                      column: this.concourseGradeFields[3],
                      render: (text, record) => (record.grade!.map(el => (el.personGroup==this.props.rootStore!.userInfo!.personGroupId && el.comment)))
                    },
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




  }

  getRecordById(id: string): SerializedEntity<Concourse> {
    const record:
      | SerializedEntity<Concourse>
      | undefined = this.dataCollection.items.find(record => record.id === id);
    if (!record) {
      throw new Error("Cannot find entity with id " + id);
    }

    return record;
  }

  handleRowSelectionChange = (selectedRowKeys: string[]) => {
    this.selectedRowKey = selectedRowKeys[0];
  };

  deleteSelectedRow = () => {
    this.showDeletionDialog(this.getRecordById(this.selectedRowKey!));
  };
}

const ConcourseList = injectIntl(ConcourseListComponent);

export default ConcourseList;
