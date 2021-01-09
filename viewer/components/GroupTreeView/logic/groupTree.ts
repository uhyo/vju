export type GroupTree<Group> = {
  groups: Record<number, Group>;
  rootNode: TreeNode;
};

export type TreeNode = {
  id: number;
  children: TreeNode[];
};

type Param<Group> = {
  paths: {
    ancestorId: number;
    descendantId: number;
  }[];
  groups: Record<number, Group>;
};

export function constructTree<Group extends { id: number; isRoot?: boolean }>({
  paths,
  groups,
}: Param<Group>): GroupTree<Group> {
  const nodes = new Map<number, TreeNode>();
  let rootNode: TreeNode | undefined;
  for (const group of Object.values(groups)) {
    const node: TreeNode = {
      id: group.id,
      children: [],
    };
    nodes.set(group.id, node);
    if (group.isRoot) {
      rootNode = node;
    }
  }
  if (rootNode === undefined) {
    throw new Error("Root group not found.");
  }

  for (const { ancestorId, descendantId } of paths) {
    const ancestor = nodes.get(ancestorId);
    if (!ancestor) {
      throw new Error(`Node of id '${ancestorId} not found.`);
    }
    const descendant = nodes.get(descendantId);
    if (!descendant) {
      throw new Error(`Node of id '${descendantId} not found.`);
    }
    ancestor.children.push(descendant);
  }

  return {
    groups,
    rootNode,
  };
}
