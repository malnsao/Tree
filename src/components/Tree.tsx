import React from "react";
import { TreeData } from "../typings";
import "./index.less";
import TreeNode from "./TreeNode";
interface Prpos {
  data: TreeData;
}
interface State {
  data: TreeData;
}
interface keyNodeMap {
  [key: string]: TreeData;
}
class Tree extends React.Component<Prpos, State> {
  keyNodeMap: keyNodeMap;

  constructor(props: Prpos) {
    super(props);
    this.state = { data: this.props.data };
    this.buildKeyMap();
  }

  buildKeyMap = (): void => {
    let data = this.state.data;
    this.keyNodeMap = {};
    this.keyNodeMap[data.key] = data;
    if (data.children && data.children.length > 0) {
      this.walk(data.children, data);
    }
  };

  walk = (children: TreeData[], parent: TreeData): void => {
    children.forEach((item: TreeData) => {
      item.parent = parent;
      this.keyNodeMap[item.key] = item;
      if (item.children && item.children.length > 0) {
        this.walk(item.children, item);
      }
    });
  };
  onCollapse = (key: string) => {
    let data = this.keyNodeMap[key];
    if (data) {
      let { children } = data;
      if (children) {
        data.collapsed = !data.collapsed;
        data.children = data.children || [];
        this.setState({ data: this.state.data });
      } else {
        data.loading = true;
        this.setState({ data: this.state.data });
        setTimeout(() => {
          data.children = [
            {
              name: data.name + "的儿子1",
              key: `${data.key}-1`,
              type: "folder",
              collapsed: true,
            },
            {
              name: data.name + "的儿子2",
              key: `${data.key}-2`,
              type: "folder",
              collapsed: true,
            },
          ];
          data.loading = false;
          data.collapsed = false;
          this.buildKeyMap();
          this.setState({ data: this.state.data });
        }, 2000);
      }
    }
  };
  onCheck = (key: string) => {
    let data = this.keyNodeMap[key];
    if (data) {
      data.checked = !data.checked;
      if (data.checked) {
        data.children && this.checkChildren(data.children, true);
        this.checkParent(data.parent);
      } else {
        data.children && this.checkChildren(data.children, false);
        this.checkParent(data.parent);
      }
      this.setState({ data: this.state.data });
    }
  };
  checkChildren = (children: TreeData[], checked: boolean) => {
    children.forEach((item: TreeData) => {
      item.checked = checked;
      item.children && this.checkChildren(item.children, checked);
    });
  };
  checkParent = (parent: TreeData) => {
    while (parent) {
      parent.checked = parent.children.every((item: TreeData) => item.checked);
      parent = parent.parent;
    }
  };

  render() {
    return (
      <div className="tree">
        <div className="tree-nodes">
          <TreeNode
            data={this.props.data}
            onCollapse={this.onCollapse}
            onCheck={this.onCheck}
          />
        </div>
      </div>
    );
  }
}

export default Tree;
