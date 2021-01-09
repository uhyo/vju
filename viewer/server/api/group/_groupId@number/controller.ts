import { getOneGroup } from "$/service/groups";
import { defineController } from "./$relay";

export default defineController({ getOneGroup }, ({ getOneGroup }) => ({
  get: async ({ params: { groupId } }) => {
    const group = await getOneGroup(groupId);
    if (!group) {
      return { status: 404 };
    }
    return { status: 200, body: { group } };
  },
}));
