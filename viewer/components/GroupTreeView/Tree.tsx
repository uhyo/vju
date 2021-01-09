import { Group } from "@prisma/client";
import { TreeNode } from "./logic/groupTree";

type Props = {
  groups: Record<number, Group>;
  node: TreeNode;
};

export const Tree: React.VFC<Props> = ({ groups, node }) => {
  const group = groups[node.id];
  return (
    <div>
      <div>
        <b>{group?.name}</b>
      </div>
      <ul>
        {node.children.map((node) => {
          return (
            <li key={node.id}>
              <Tree groups={groups} node={node} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
