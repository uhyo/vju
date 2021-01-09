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
  const rootGroup = await prisma.group.findFirst({
    where: {
      isRoot: true,
    },
  });
  if (rootGroup === null) {
    throw new Error("Root group could not be found");
  }

  // split into paths and groups
  const paths: {
    ancestorId: number;
    descendantId: number;
  }[] = [];
  const groups: Record<number, Group> = {
    [rootGroup.id]: rootGroup,
  };

  for (const { descendant, ...path } of directChildPaths) {
    paths.push(path);
    groups[descendant.id] = descendant;
  }
  return {
    paths,
    groups,
  };
});

export const getOneGroup = depend(
  { prisma },
  async ({ prisma }, groupId: number) => {
    const group = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
    });
    return group;
  }
);
