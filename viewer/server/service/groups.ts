import { Group, PrismaClient } from "@prisma/client";
import { depend } from "velona";

const prisma = new PrismaClient();

export const getWholeTree = depend({ prisma }, async ({ prisma }) => {
  const directChildPaths = await prisma.groupTreePath.findMany({
    where: {
      pathLength: 1,
    },
    include: {
      descendant: true,
    },
  });
  // split into paths and groups
  const paths: {
    ancestorId: number;
    descendantId: number;
  }[] = [];
  const groups: Record<number, Group> = {};

  for (const { descendant, ...path } of directChildPaths) {
    paths.push(path);
    groups[descendant.id] = descendant;
  }
  return {
    paths,
    groups,
  };
});
