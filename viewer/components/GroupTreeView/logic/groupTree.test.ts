import { constructTree } from "./groupTree";

describe("constructTree", () => {
  it("tree", () => {
    const paths = [
      { ancestorId: 1, descendantId: 2 },
      { ancestorId: 1, descendantId: 3 },
      { ancestorId: 2, descendantId: 4 },
      { ancestorId: 2, descendantId: 5 },
      { ancestorId: 3, descendantId: 6 },
    ];
    const groups = {
      1: {
        id: 1,
        isRoot: true,
      },
      2: {
        id: 2,
      },
      3: {
        id: 3,
      },
      4: {
        id: 4,
      },
      5: {
        id: 5,
      },
      6: {
        id: 6,
      },
    };
    const tree = constructTree({ paths, groups });
    expect(tree).toEqual({
      groups,
      rootNode: {
        id: 1,
        children: [
          {
            id: 2,
            children: [
              {
                id: 4,
                children: [],
              },
              {
                id: 5,
                children: [],
              },
            ],
          },
          {
            id: 3,
            children: [
              {
                id: 6,
                children: [],
              },
            ],
          },
        ],
      },
    });
  });
});
