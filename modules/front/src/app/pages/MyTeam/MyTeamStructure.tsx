import * as React from "react";
import {observer} from "mobx-react";

import {observable} from "mobx";

import {injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {Col, Icon, Row, Tree} from "antd";
import {AntTreeNode, AntTreeNodeExpandedEvent} from "antd/lib/tree/Tree";
import {restServices} from "../../../cuba/services";
import LoadingPage from "../LoadingPage";
import {rootStore} from "../../store";
import Page from "../../hoc/PageContentHoc";
import Search from "antd/es/input/Search";
import {MyTeamNew} from "../../../cuba/entities/base/tsadv$MyTeamNew";
import MyTeamPersonCard from "./PersonCard/MyTeamPersonCard";
import ScrollContainer from "react-indiana-drag-scroll";

const {TreeNode} = Tree;

export type MyTeamData = {
  id: string,
  parentId?: string,
  personGroupId: string,
  positionGroupId: string,
  fullName?: string,
  hasChild?: boolean,
  children?: MyTeamData[]
};

@injectMainStore
@observer
class MyTeamStructure extends React.Component<MainStoreInjected & WrappedComponentProps> {

  @observable myTeamData: MyTeamData[] = [];
  @observable isSearch = false;
  @observable expandedKeys: string[] = [];
  @observable selectedData?: MyTeamData;

  onSearch = (searchText: string): Promise<MyTeamData[]> => {
    this.selectedData = undefined;
    if (!searchText || searchText === "") {
      if (this.isSearch) this.isSearch = false
      this.expandedKeys = [];
      return this.loadData()
        .then(value => this.myTeamData = [...value,]);
    }

    return restServices.myTeamService.searchMyTeam({
      parentPositionGroupId: rootStore!.userInfo!.positionGroupId!,
      searchFio: searchText,
    }).then(value => {
      const allTeamData = value.map(this.parseToMyTeamData);
      const teamData = allTeamData.filter(team => team.parentId === undefined)
      teamData.forEach(myTeam => {
        myTeam.children = allTeamData.filter(data => data.parentId === myTeam.id);
      })
      this.isSearch = true;
      this.myTeamData = teamData;
      this.expandedKeys = this.getDefaultExpandedKeys();
      return teamData;
    });
  }

  onLoadData = (treeNode: AntTreeNode): PromiseLike<void> => {
    return new Promise(resolve => {
      const key = treeNode.props.eventKey;
      if (treeNode.props.children || !key) {
        resolve();
        return;
      }

      const positionGroupId = key.substring(key.indexOf("/") + 1);
      return restServices.myTeamService.getChildren({parentPositionGroupId: positionGroupId})
        .then(value => value.map(this.parseToMyTeamData))
        .then(value => {
          treeNode.props.dataRef.children = [...value]
          this.myTeamData = [...this.myTeamData]
          resolve();
        });
    });
  }

  renderTreeNodes = (data: MyTeamData[]): any => {
    return data.map(item => {
      return <TreeNode title={item.fullName}
                       icon={<Icon type="user" style={{color: "black"}}/>}
                       key={this.getKey(item)}
                       dataRef={item}
                       isLeaf={!item.hasChild}>
        {item.children ? this.renderTreeNodes(item.children) : null}
      </TreeNode>
    });
  }

  initDefaultExpandedKeys = (data: MyTeamData): string[] => {
    if (!data) return [];
    const keys = [data.id + "/" + data.positionGroupId];
    if (data.children) {
      const childKeys = data.children
        .map(this.initDefaultExpandedKeys)
        .reduce((previousValue, currentValue) => [...previousValue, ...currentValue], []);
      return [...keys, ...childKeys];
    }
    return keys;
  }

  getDefaultExpandedKeys = (): string[] => {
    if (!this.isSearch || !this.myTeamData) return [];
    return this.myTeamData
      .map(this.initDefaultExpandedKeys)
      .reduce((previousValue, currentValue) => [...previousValue, ...currentValue], []);
  }

  renderSearch = (myTeams?: MyTeamData[]): any => {
    if (!myTeams) return <></>;
    return myTeams.map(item => {

        if (!item.children && item.hasChild)
          return this.renderTreeNodes([item]);

        return <TreeNode title={item.fullName}
                         expanded
                         icon={<Icon type="user" style={{color: "black"}}/>}
                         key={this.getKey(item)}
                         isLeaf={!item.hasChild}
                         dataRef={item}>
          {this.renderSearch(item.children)}
        </TreeNode>
      }
    )
  }

  onExpand = (expandedKeys: string[], info: AntTreeNodeExpandedEvent) => {
    if (info.expanded) {
      this.expandedKeys = [...this.expandedKeys, info.node.props.eventKey!];
    } else {
      this.expandedKeys.splice(this.expandedKeys.indexOf(info.node.props.eventKey!), 1);
    }
    this.expandedKeys = [...this.expandedKeys];
  }

  render() {
    if (!this.myTeamData)
      return <LoadingPage/>
    return (

      <Page pageName={this.props.intl.formatMessage({id: "menu.my-team"})}>
        <div className={"large-section section-container mb-0"}>
          <Row>
            <Col md={24} lg={6}>
              <div style={{borderRight: '2px solid #e8e8e8', marginRight: '20px', paddingRight: '20px'}}>
                <Search style={{marginBottom: 8}}
                        placeholder="Search"
                        onSearch={this.onSearch}/>

                <ScrollContainer
                  className="scroll-container attendance-scroller"
                  hideScrollbars={false}
                  nativeMobileScroll={true}>

                  <Tree
                    expandedKeys={[...this.expandedKeys]}
                    onExpand={this.onExpand}
                    showIcon
                    onSelect={this.onSelect}
                    loadData={this.onLoadData}>
                    {this.isSearch ? this.renderSearch(this.myTeamData) : this.renderTreeNodes(this.myTeamData)}
                  </Tree>
                </ScrollContainer>
              </div>
            </Col>
            <Col md={24} lg={12}>
              {this.selectedData && this.selectedData.personGroupId ?
                <MyTeamPersonCard personGroupId={this.selectedData.personGroupId!}
                                  key={this.selectedData.personGroupId!}/> : <></>}
            </Col>
          </Row>
        </div>
      </Page>
    );
  }

  getKey = (data: MyTeamData): string => data.id + "/" + data.positionGroupId;

  onSelect = (keys: string[]): void => {
    if (keys && keys.length > 0)
      this.selectedData = this.getRecordByKey(keys[0]);
  }

  getRecordByKey = (key: string): MyTeamData | undefined => {
    return this.getRecordByIdFromData(key.substring(0, key.indexOf("/")), this.myTeamData);
  }

  getRecordByIdFromData = (id: string, dataArray: MyTeamData[]): MyTeamData | undefined => {
    if (dataArray) {
      for (let data of dataArray) {
        if (data.id === id) return data;
        if (data.children) {
          const result = this.getRecordByIdFromData(id, data.children);
          if (result !== undefined) return result;
        }
      }
    }
    return undefined;
  }

  parseToMyTeamData = (teamData: MyTeamNew): MyTeamData => {
    return {
      id: teamData.id,
      parentId: teamData.parent ? teamData.parent.id : undefined,
      personGroupId: teamData.personGroupId,
      positionGroupId: teamData.positionGroupId,
      fullName: teamData.fullName,
      hasChild: teamData.hasChild,
    } as MyTeamData
  }

  loadData = (): Promise<MyTeamData[]> => {
    return restServices.myTeamService.getChildren({parentPositionGroupId: rootStore!.userInfo!.positionGroupId!})
      .then(value => value.map(this.parseToMyTeamData));
  }

  componentDidMount() {
    this.loadData()
      .then(value => this.myTeamData = [...value,]);
  }
}

export default injectIntl(MyTeamStructure);
