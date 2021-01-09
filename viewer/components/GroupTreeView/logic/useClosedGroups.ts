import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const closedGroupsAtom = atom({
  key: "GroupTreeView/closedGroups",
  default: new Set<number>(),
});

export const useIsGroupClosed = (id: number) => {
  const closedGroups = useRecoilValue(closedGroupsAtom);

  return closedGroups.has(id);
};

export const useToggleGroupClosed = (id: number) => {
  const update = useSetRecoilState(closedGroupsAtom);

  return useCallback(() => {
    update((state) => {
      const res = new Set(state);
      if (res.has(id)) {
        res.delete(id);
      } else {
        res.add(id);
      }
      return res;
    });
  }, [id, update]);
};
