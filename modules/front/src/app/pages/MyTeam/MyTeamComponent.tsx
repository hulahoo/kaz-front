import * as React from "react";
import {inject, observer} from "mobx-react";

import {observable} from "mobx";

import {injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {Icon, Tree} from "antd";
import {AntTreeNode, AntTreeNodeExpandedEvent} from "antd/lib/tree/Tree";
import {restServices} from "../../../cuba/services";
import LoadingPage from "../LoadingPage";
import {rootStore, RootStoreProp} from "../../store";
import Search from "antd/es/input/Search";
import {MyTeamNew} from "../../../cuba/entities/base/tsadv$MyTeamNew";
import MyTeamCard from "./MyTeamCard";
import {SplitPane} from "react-multi-split-pane";
import {withRouter} from "react-router";
import {RouteComponentProps} from "react-router-dom";

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

export type MyTeamStructureProps = {
  searchVisible?: boolean,
  personCard?: (personGroupId: string) => React.ReactElement;
};

@injectMainStore
@inject("rootStore")
@observer
class MyTeamComponent extends React.Component<MyTeamStructureProps & MainStoreInjected & RootStoreProp & WrappedComponentProps & RouteComponentProps<any>> {

  @observable myTeamData: MyTeamData[] = [];
  @observable isSearch = false;
  @observable expandedKeys: string[] = [];
  @observable selectedData?: MyTeamData = this.props.rootStore!.userInfo.myTeamInfo.selectedMyTeamData;
  @observable mainSplitPaneDefaultSizes?: number[];

  selectedTapAndLeftMenu: {
    selectedTab?: string,
    selectedLeftMenu?: string,
    setSelectedTabOrLeftMenu: (selectedTab?: string, selectedLeftMenu?: string) => void
  } = {
    setSelectedTabOrLeftMenu: (selectedTab, selectedLeftMenu) => {
      this.selectedTapAndLeftMenu.selectedTab = selectedTab;
      this.selectedTapAndLeftMenu.selectedLeftMenu = selectedLeftMenu;

      this.props.rootStore!.userInfo.myTeamInfo.selectedTab = selectedTab;
      this.props.rootStore!.userInfo.myTeamInfo.selectedMenu = selectedLeftMenu;
    },
    selectedTab: this.props.rootStore!.userInfo.myTeamInfo.selectedTab,
    selectedLeftMenu: this.props.rootStore!.userInfo.myTeamInfo.selectedMenu,
  };

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

      <div style={{height: "100%", position: 'relative'}}>
        <SplitPane key={'mainSplitPane'}
                   split="vertical"
                   defaultSizes={this.mainSplitPaneDefaultSizes}
                   onDragFinished={sizes => this.saveDefaultSettings(sizes)}>
          <div style={{
            height: '100%',
            overflowX: "auto",
            width: '100%',
          }}>
            {
              this.props.searchVisible === false
                ? null
                : <Search style={{padding: '10px 5px 10px 10px'}}
                          placeholder="Search"
                          onSearch={this.onSearch}/>
            }

            <Tree
              expandedKeys={[...this.expandedKeys]}
              onExpand={this.onExpand}
              showIcon
              style={{overflowX: 'auto', fontSize: 'small'}}
              onSelect={this.onSelect}
              loadData={this.onLoadData}>
              {this.isSearch ? this.renderSearch(this.myTeamData) : this.renderTreeNodes(this.myTeamData)}
            </Tree>

          </div>

          <div style={{height: '100%', width: '100%',}}>
            {this.selectedData && this.selectedData.personGroupId ?
              this.props.personCard
                ? this.props.personCard(this.selectedData.personGroupId!)
                : <MyTeamCard personGroupId={this.selectedData.personGroupId!}
                              selectedTab={this.selectedTapAndLeftMenu.selectedTab}
                              selectedLeftMenu={this.selectedTapAndLeftMenu.selectedLeftMenu}
                              setSelectedTabOrLeftMenu={this.selectedTapAndLeftMenu.setSelectedTabOrLeftMenu}
                              key={this.selectedData.personGroupId!}/>
              : <></>}
          </div>
        </SplitPane>
      </div>
    );
  }

  getKey = (data: MyTeamData): string => data.id + "/" + data.positionGroupId;

  onSelect = (keys: string[]): void => {
    if (keys && keys.length > 0) {
      this.selectedData = this.getRecordByKey(keys[0]);
      this.props.rootStore!.userInfo.myTeamInfo.selectedMyTeamData = this.selectedData;
    }
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

  loadDefaultSettings = () => {
    restServices.userSettingService.loadSetting<number[]>('MyTeamComponent.mainSplitPane')
      .then(value => {
        if (value) this.mainSplitPaneDefaultSizes = value;
      });
  }

  saveDefaultSettings = (sizes: number[]) => {
    restServices.userSettingService.saveSetting('MyTeamComponent.mainSplitPane', '[' + sizes + ']');
  }

  componentDidMount() {
    this.loadData()
      .then(value => this.myTeamData = [...value,]);

    this.loadDefaultSettings();

  }
}

export default injectIntl(withRouter(MyTeamComponent));
