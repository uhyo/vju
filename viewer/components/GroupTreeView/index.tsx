import { useEffect, useMemo } from "react";
import { apiClient } from "~/utils/apiClient";
import { useAsync } from "~/utils/hooks/useAsync";
import { constructTree } from "./logic/groupTree";
import { Tree } from "./Tree";

export const GroupTreeView: React.VFC = () => {
  const [res, call] = useAsync(apiClient.group.get);
  useEffect(() => {
    call();
  }, [call]);

  const treeRes = useMemo(
    () =>
      res.map((data) => {
        return constructTree(data.body);
      }),
    [res]
  );

  if (!treeRes.response) {
    return null;
  }

  const tree = treeRes.response;

  return (
    <div>
      {tree.rootNode.children.map((node) => (
        <Tree key={node.id} groups={tree.groups} node={node} />
      ))}
    </div>
  );
};
