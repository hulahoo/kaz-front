import React from 'react';
import {Tree} from 'antd';
import {observable} from "mobx";
import {observer} from "mobx-react";
import LoadingPage from "../LoadingPage";
import {restServices} from "../../../cuba/services";
import {PositionHierarchy} from "../../../cuba/entities/base/tsadv_PositionHierarchy";

interface DataNode {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: DataNode[];
}


const {TreeNode} = Tree;

export type PositionHierarchyTreeProps = {
  changeSelectedPosition: (positionId?: string) => void;
}


@observer
export class PositionHierarchyTree extends React.Component<PositionHierarchyTreeProps> {

  @observable treeData: DataNode[]


  componentDidMount(): void {
    new Promise(resolve => {
      restServices.positionStructureService.getStartData({})
        .then(value => value.map(value1 => this.parseToDataNode(value1)))
        .then(value2 => {
          this.treeData = [...value2]
          resolve()
        });
    })

  }

  renderTreeNodes = (data: DataNode[]): any => {
    return data.map(item => {
      return <TreeNode title={item.title}
                       key={item.key}
                       dataRef={item}
                       isLeaf={item.isLeaf}>
        {item.children ? this.renderTreeNodes(item.children) : null}
      </TreeNode>
    });
  }


  render() {
    if (!this.treeData || this.treeData.length < 1) {
      return <LoadingPage/>
    }
    return <Tree onSelect={selectedKeys => this.selectPosition(selectedKeys)}
                 onExpand={expandedKeys => this.onExpand(expandedKeys)}>
      {this.renderTreeNodes(this.treeData)}
    </Tree>

  }
  ;

  onExpand(expandedKeys: string[]) {
    return new Promise<void>(resolve => {
      if (expandedKeys.length > 0) {
        const lastKey = expandedKeys[expandedKeys.length - 1];
        if (!this.isLoaded(lastKey, this.treeData)) {
          this.updateDataNode(this.treeData, lastKey)
        }
      }
      resolve()
    })
  }

  isLoaded(lastKey: string, treeData?: DataNode[]): boolean {
    if (treeData && treeData.length > 0) {
      for (let i = 0; i < treeData.length; i++) {
        const children = treeData[i].children;
        if (treeData[i].key === lastKey) {
          if (children) {
            let loaded = false
            for (let j = 0; j < children.length; j++) {
              if (!children[j].isLeaf && children[j].children) {
                loaded = true
              }
            }
            if (loaded) {
              return true
            }
          }
        } else {
          if (this.isLoaded(lastKey, children)) {
            return true
          }
        }
      }
    }
    return false
  }

  updateDataNode(treeData: DataNode[], lastKey: string): void {
    restServices.positionStructureService.getChildren({parentId: lastKey})
      .then(value => value.map(value1 => {
        return this.parseToDataNode(value1)
      }))
      .then(value2 => {
        this.treeData = this.insertData(this.treeData, lastKey, value2)
      })
  }

  insertData(treeData: DataNode[], lastKey: string, children: DataNode[]): DataNode[] {
    return treeData.map(value => {
      if (lastKey === value.key) {
        return {
          ...value, children: children
        }
      } else {
        return {
          ...value, children: this.insertData(value.children ? value.children : [], lastKey, children)
        }
      }
    });
  }

  parseToDataNode(positionHierarchy: PositionHierarchy): DataNode {
    return {
      key: positionHierarchy.id,
      title: positionHierarchy.positionName,
      isLeaf: !positionHierarchy.haveChildren,
      children: positionHierarchy.children ? positionHierarchy.children.map(value => this.parseToDataNode(value)) : []
    } as DataNode
  }

  selectPosition(selectedKeys: string[]) {
    console.log('1',selectedKeys)
    if (selectedKeys && selectedKeys.length > 0) {
      const lastSelected = selectedKeys[selectedKeys.length - 1];
      if (lastSelected) {
        this.props.changeSelectedPosition(lastSelected)
      }else{
        this.props.changeSelectedPosition('')
      }
    }else{
      this.props.changeSelectedPosition('')
    }
  }
}

