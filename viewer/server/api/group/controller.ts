import { getWholeTree } from "$/service/groups";
import { defineController } from "./$relay";

export default defineController({ getWholeTree }, ({ getWholeTree }) => ({
  get: async () => {
    const result = await getWholeTree();
    return { status: 200, body: result };
  },
}));
