-- CreateTable
CREATE TABLE "Group" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isRoot" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "GroupTreePath" (
    "ancestorId" INTEGER NOT NULL,
    "descendantId" INTEGER NOT NULL,
    "pathLength" INTEGER NOT NULL,

    FOREIGN KEY ("ancestorId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("descendantId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY ("descendantId","pathLength")
);
