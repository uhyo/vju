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

  const tree = useMemo(
    () =>
      res.map((data) => {
        return constructTree(data.body);
      }),
    [res]
  );

  if (!tree.response) {
    return null;
  }

  return (
    <div>
      <Tree groups={tree.response.groups} node={tree.response.rootNode} />
    </div>
  );
};
