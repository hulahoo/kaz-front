import * as React from "react";
import { inject, observer } from "mobx-react";
import { Link, RouteComponentProps } from "react-router-dom";
import Button, {ButtonType} from "../../components/Button/Button";
import {RootStoreProp} from "../../store";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import {Tabs} from "antd";
import DataTableFormat from "../../components/DataTable/intex";
import {link} from "../../util/util";
import { observable } from "mobx";

import { Modal, Layout, Row, Col, Divider} from "antd";



import {
  collection,
  injectMainStore,
  MainStoreInjected,
  DataTable, getCubaREST,
} from "@cuba-platform/react";

import { Concourse } from "../../../cuba/entities/base/tsadv_Concourse";
import { ConcourseRequest } from "../../../cuba/entities/base/tsadv_ConcourseRequest";
import { SerializedEntity } from "@cuba-platform/rest";
import { ConcourseManagement } from "./ConcourseManagement";
import { ConcourseRequestManagement } from "../ConcourseRequest/ConcourseRequestManagement";
import {ConcourseImage} from "./ConcourseImage";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";
const {Footer, Content, Sider } = Layout

const {TabPane} = Tabs;

type ActiveTabProps = RouteComponentProps<{ activeTab?: string }>;
interface IState {
  data: number;
}


@injectMainStore
@inject("rootStore")
@observer
class ConcourseListComponent extends React.Component<ActiveTabProps & MainStoreInjected & WrappedComponentProps & RootStoreProp & RouteComponentProps<any>, IState> {

  dataCollection = collection<Concourse>(Concourse.NAME, {
    view: "concourse-view",
    sort: "-updateTs",
   });

  dataCollectionConcourse = collection<Concourse>(Concourse.NAME, {
    view: "concourse-view",
    sort: "-updateTs",
   });

  dataCollectionConcourseRequest = collection<ConcourseRequest>(ConcourseRequest.NAME, {
    view: "concourseRequest-view",
    sort: "-updateTs",
  });

  concourseFields = [
    "description",
    "banner",
  ];

  bestConcourseFields = [
    "name_ru",
    "category",
    "year",
  ]

  concourseRequestFields = [
    "requestNumber",
    "requestDate",
    "status",
    "concourseName"
  ]

  constructor(props:any) {
    super(props);
    this.state={
      data:0
    }
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

  concourseComponent  = (imgUrl?:any, btnLink?:string, concourseDesc?:any) => {
      return <Layout style={{marginTop:"30px", marginBottom:"30px"}} key={imgUrl}>
                <Row>
                  <Col span={19} className="concourse-image"><ConcourseImage imageId={imgUrl}/></Col>
                  <Col span={5} className="concourse-button">
                    <Link
                          to={ConcourseRequestManagement.PATH + "/" + ConcourseRequestManagement.NEW_SUBPATH + "?concourseId="+btnLink}
                          key="createConcourseRequest">
                          <Button buttonType={ButtonType.PRIMARY} block>
                            <span><FormattedMessage id="management.browser.create"/></span>

                          </Button>
                    </Link>
                  </Col>
                </Row>


                 <h3 style={{marginTop:"30px"}} id="concourseDesc"><FormattedMessage id="concourseDesc"/></h3>
                 <Row style={{marginTop:"5px", border:"2px solid black", borderRadius:"8px", padding:" 10px 20px"}} >

                    <Col style={{borderWidth:"2px"}} span={24} >{concourseDesc}</Col>
                 </Row>
                  <Divider style={{marginTop:"30px"}}/>
               </Layout>
  }

    bestConcourseComponent = (projectName?: any, index?: number, organizationBin?:any) => {

      return  <Row style={{marginTop:"30px", border:"2px solid black", borderRadius:"8px", padding:" 10px 20px"}} key={projectName+index+projectName}>
                      <Col span={20} className="best-concourse">
                        <p><FormattedMessage id="concoursePlace"/> {index}</p>
                        <h2><a href="#">{projectName}</a></h2>
                        <Row style={{marginTop:"30px"}}>
                            <Col span={4}><h4><FormattedMessage id="concourseCompany"/></h4></Col>
                            <Col><h4>{organizationBin}</h4></Col>
                        </Row>
                      </Col>
                  </Row>



    }

  @observable
  concourseYear:number

  @observable
  concourseCategory:string

  render() {
    const btns = [<Link
      to={ConcourseRequestManagement.PATH + "/" + ConcourseRequestManagement.NEW_SUBPATH}
      key="createConcourseRequest">
      <Button buttonType={ButtonType.PRIMARY}
              style={{margin: "0 12px 12px 0"}}>
        <span><FormattedMessage id="management.browser.create"/></span>
      </Button>
    </Link>,
    ];

    const {activeTab} = this.props.match.params;
    const defaultActiveKey = activeTab ? activeTab : "1";
    console.log(this.dataCollection);
    return (
      <Page pageName={this.props.intl.formatMessage({id: this.pageName})}>
        <Section size="large">
          <Tabs defaultActiveKey={defaultActiveKey}
                onChange={activeKey => this.pageName = "concourse" + (activeKey === "1" ? "" : "Request")}>
            <TabPane tab={this.props.intl.formatMessage({id: "concourse"})} key="1">
              <div>

                {
                this.dataCollection.items.map((el)=>(
                    el && this.concourseComponent(el!.banner!.id, el.id, el.description)
                ))
                }


              </div>
            </TabPane>
            <TabPane tab={this.props.intl.formatMessage({id: "bestConcourse"})} key="3">
              <div>
                  {
                    this.bestConcoursesList.items.map((el, index) => (
                        el && this.bestConcourseComponent(el!.name_ru, index+1, el!.organizationBin)
                    ))
                  }
              </div>
            </TabPane>
            <TabPane tab={this.props.intl.formatMessage({id: "concourseRequest"})} key="4">
                <DataTableFormat
                  dataCollection={this.dataCollectionConcourseRequest}
                  fields={this.concourseRequestFields}
                  hideSelectionColumn={true}
                  render={[{
                        column: this.concourseRequestFields[0],
                        render: (text, record) => <Link
                        to={ConcourseRequestManagement.PATH + "/" + (record as ConcourseRequest).id}
                        >{text}</Link>
                        },{
                        column: this.concourseRequestFields[3],
                        render: (text, record) =>{
                              let res = this.dataCollection.items.filter((el)=>el.id === (record as ConcourseRequest).concourseId)
                             return <Link to={"/"}>{res?res:"Link is coming"}</Link>
                        }

                        }

                ]}
                />
            </TabPane>
          </Tabs>
        </Section>
      </Page>
    );
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
