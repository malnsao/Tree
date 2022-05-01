import React from "react";
import { TreeData } from "../typings";
import "./index.less";
import file from "../assets/file.png";
import openedFolder from "../assets/opened-folder.png";
import closedFolder from "../assets/closed-folder.png";

interface Prpos {
  data: TreeData;
  onCollapse: any;
  onCheck: any;
}

class TreeNode extends React.Component<Prpos> {
  constructor(props: Prpos) {
    super(props);
  }

  render() {
    let {
      data: { name, children, key, collapsed, checked },
      onCollapse,
      onCheck,
    } = this.props;
    let caret = null;
    let icon = null;
    if (children) {
      if (children.length > 0) {
        caret = (
          <span
            className={`collapse ${collapsed ? "caret-right" : "caret-down"}`}
            onClick={() => onCollapse(key)}
          ></span>
        );
        icon = collapsed ? closedFolder : openedFolder;
      } else {
        caret = null;
        icon = file;
      }
    } else {
      caret = (
        <span
          className={`collapse caret-right`}
          onClick={() => onCollapse(key)}
        ></span>
      );
      icon = closedFolder;
    }
    return (
      <div className="tree-node">
        <div className="inner">
          {caret}
          <input
            type="checkbox"
            checked={checked}
            onChange={() => onCheck(key)}
          />
          <img style={{ width: 14 }} src={icon} />
          <span className="content">{name}</span>
        </div>
        {children && children.length > 0 && !collapsed && (
          <div className="children">
            {children.map((item: TreeData) => (
              <TreeNode
                data={item}
                key={item.key}
                onCollapse={onCollapse}
                onCheck={onCheck}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default TreeNode;
