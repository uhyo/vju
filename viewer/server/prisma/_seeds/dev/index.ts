async function main() {
  const PrismaClient = (await import("@prisma/client")).default.PrismaClient;
  const prisma = new PrismaClient();

  await prisma.groupTreePath.deleteMany();
  await prisma.group.deleteMany();

  // Initialize ROOT group
  const root = await prisma.group.create({
    data: {
      isRoot: true,
      name: "ROOT",
    },
  });
  await prisma.groupTreePath.create({
    data: {
      pathLength: 0,
      ancestor: {
        connect: {
          id: root.id,
        },
      },
      descendant: {
        connect: {
          id: root.id,
        },
      },
    },
  });

  // crate other groups
  const pathA = await prisma.groupTreePath.create({
    data: {
      pathLength: 1,
      ancestor: {
        connect: {
          id: root.id,
        },
      },
      descendant: {
        create: {
          name: "Group A",
        },
      },
    },
  });
  await prisma.groupTreePath.create({
    data: {
      pathLength: 0,
      ancestor: {
        connect: {
          id: pathA.descendantId,
        },
      },
      descendant: {
        connect: {
          id: pathA.descendantId,
        },
      },
    },
  });
  const pathB = await prisma.groupTreePath.create({
    data: {
      pathLength: 1,
      ancestor: {
        connect: {
          id: root.id,
        },
      },
      descendant: {
        create: {
          name: "Group B",
        },
      },
    },
  });
  await prisma.groupTreePath.create({
    data: {
      pathLength: 0,
      ancestor: {
        connect: {
          id: pathB.descendantId,
        },
      },
      descendant: {
        connect: {
          id: pathB.descendantId,
        },
      },
    },
  });

  const pathC = await prisma.groupTreePath.create({
    data: {
      pathLength: 2,
      ancestor: {
        connect: {
          id: root.id,
        },
      },
      descendant: {
        create: {
          name: "Group C",
        },
      },
    },
  });
  await prisma.groupTreePath.create({
    data: {
      pathLength: 1,
      ancestor: {
        connect: { id: pathA.descendantId },
      },
      descendant: {
        connect: { id: pathC.descendantId },
      },
    },
  });
  await prisma.groupTreePath.create({
    data: {
      pathLength: 0,
      ancestor: {
        connect: {
          id: pathC.descendantId,
        },
      },
      descendant: {
        connect: {
          id: pathC.descendantId,
        },
      },
    },
  });

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
