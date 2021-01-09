import { castella, css, html, slot } from "@castella/macro";
import { Group } from "@prisma/client";
import Link from "next/link";
import { Icon } from "../Icon";
import { TreeNode } from "./logic/groupTree";
import {
  useIsGroupClosed,
  useToggleGroupClosed,
} from "./logic/useClosedGroups";

type Props = {
  groups: Record<number, Group>;
  node: TreeNode;
};

export const Tree: React.VFC<Props> = ({ groups, node }) => {
  const isClosed = useIsGroupClosed(node.id);
  const toggle = useToggleGroupClosed(node.id);

  const group = groups[node.id];

  return (
    <TreeItem
      icon={
        <button onClick={toggle}>
          {isClosed ? <Icon.ClosedFolder /> : <Icon.OpenFolder />}
        </button>
      }
      name={group ? <Link href={`/group/${group.id}`}>{group.name}</Link> : "-"}
    >
      {!isClosed && node.children.length > 0 ? (
        <ul>
          {node.children.map((node) => {
            return (
              <li key={node.id}>
                <Tree groups={groups} node={node} />
              </li>
            );
          })}
        </ul>
      ) : null}
    </TreeItem>
  );
};

const TreeItem = castella(
  css`
    display: grid;
    grid-template:
      "icon name" auto
      "line children" auto / 20px 1fr;

    .icon {
      padding-left: 2px;
    }
    .icon:hover {
      opacity: 0.7;
    }

    .line {
      width: calc(50% - 1px);
      border-right: 1px solid #cccccc;
    }

    .children {
      padding: 4px 2px 8px;
    }
  `,
  html`
    <div class="icon">${slot("icon")}</div>
    <div class="name">${slot("name")}</div>
    <div class="line"></div>
    <div class="children">${slot()}</div>
  `
);
